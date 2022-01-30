let realestate = true;
let domain = true;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ realestate });
    chrome.storage.sync.set({ domain });
});