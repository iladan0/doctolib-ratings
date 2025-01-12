async function fetchGoogleReviews(doctorName, doctorAddress, apiKey) {
    const query = `${doctorName} ${doctorAddress}`;
    const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
    try {
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (searchData.candidates?.[0]) {
            const placeId = searchData.candidates[0].place_id;
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`;
             const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();

            if (detailsData.result) {
                return {
                    rating: detailsData.result.rating,
                    reviewCount: detailsData.result.user_ratings_total
                };
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching Google data:', error);
        return null
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if (request.action === 'fetchGoogleData') {
        chrome.storage.sync.get(['apiKey'], (storedSettings) => {
           const apiKey = storedSettings.apiKey;
           fetchGoogleReviews(request.doctorName, request.doctorAddress, apiKey)
                .then(reviews => {
                    sendResponse({ reviews });
                })
                .catch(error => {
                    sendResponse({ error: error.message });
                });
         });
       return true;
    }
});