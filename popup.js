const apiKeyInput = document.getElementById('apiKey');
const extensionEnabledInput = document.getElementById('extensionEnabled');
const saveButton = document.getElementById('save');
const statusDiv = document.getElementById('status');

// Load saved options
async function loadOptions() {
  const storedSettings = await chrome.storage.sync.get(['apiKey', 'extensionEnabled']);
  apiKeyInput.value = storedSettings.apiKey || '';
  extensionEnabledInput.checked = storedSettings.extensionEnabled === true;
    if (storedSettings.extensionEnabled === undefined) {
        extensionEnabledInput.checked = false
    }

}


// Save options
async function saveOptions() {
    const apiKey = apiKeyInput.value;
    const extensionEnabled = extensionEnabledInput.checked;
     await chrome.storage.sync.set({ apiKey, extensionEnabled });
    statusDiv.textContent = 'Options saved.';
    setTimeout(() => {
        statusDiv.textContent = '';
    }, 1500);
     // Refresh the current tab or all Doctolib tabs
    const tabs = await chrome.tabs.query({ url: "https://*.doctolib.fr/*" })
     tabs.forEach(tab => {
        chrome.tabs.reload(tab.id)
     });
}

document.addEventListener('DOMContentLoaded', loadOptions);
saveButton.addEventListener('click', saveOptions);