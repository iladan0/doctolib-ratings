function displayReviews(element, reviews) {
    if(element.querySelector('span.review-container')) return;

    const reviewContainer = document.createElement('span');
    reviewContainer.classList.add('review-container');
    reviewContainer.style.fontWeight = 'normal';
    if (reviews && reviews.rating !== undefined && reviews.reviewCount !== undefined) {
        if (reviews.placeId) {
            const link = document.createElement('a');
            link.href = `https://www.google.com/maps/place/?q=place_id:${reviews.placeId}`;
            link.target = '_blank';
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';
            link.textContent = ` ⭐${reviews.rating} (${reviews.reviewCount} reviews)`;
            reviewContainer.appendChild(link);
        } else {
            reviewContainer.textContent = ` ⭐${reviews.rating} (${reviews.reviewCount} reviews)`;
        }
    } else {
        reviewContainer.textContent = 'No rating found';
    }

    element.appendChild(reviewContainer);
}

async function addReviewsToDoctorNames() {
    const doctorCards = document.querySelectorAll('.dl-p-doctor-result-link');
    for (const doctorCard of doctorCards) {
        const nameElement = doctorCard.querySelector('h2.dl-text.dl-text-body.dl-text-bold.dl-text-s.dl-text-primary-110');
        if (!nameElement) {
            continue;
        }
        const titleElement = doctorCard.closest('div.dl-flex-column').querySelector('div.dl-text.dl-text-body.dl-text-regular.dl-text-s.dl-text-neutral-130.dl-doctor-card-speciality-title');
        if(!titleElement){
            continue;
        }

        const doctorName = nameElement.textContent.trim();
        const doctorTitle = titleElement.textContent.trim();

        try {
             const request = {
                action: 'fetchGoogleData',
                doctorName: doctorName,
                doctorAddress: doctorTitle
            };
            const response = await chrome.runtime.sendMessage(request);
            if (response && !response.error) {
                displayReviews(nameElement, response.reviews);
            } else {
                displayReviews(nameElement, null);
            }
        } catch(e) {
            displayReviews(nameElement, null);
        }
    }
}

async function checkExtensionEnabled() {
     const storedSettings = await chrome.storage.sync.get(['extensionEnabled']);
      return storedSettings.extensionEnabled !== false;
}

async function main(){
   const isEnabled =  await checkExtensionEnabled();
    if(isEnabled){
      addReviewsToDoctorNames();
      const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length) {
              addReviewsToDoctorNames();
          }
        }
    });
      observer.observe(document.body, { childList: true, subtree: true });
    }
}

main();