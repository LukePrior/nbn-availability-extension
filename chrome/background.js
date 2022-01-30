let realestate = true;
let domain = true;
let realestateview = true;
let onthehouse = true;
let allhomes = true;
let rent = true;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ realestate });
    chrome.storage.sync.set({ domain });
    chrome.storage.sync.set({ realestateview });
    chrome.storage.sync.set({ onthehouse });
    chrome.storage.sync.set({ allhomes });
    chrome.storage.sync.set({ rent });
});