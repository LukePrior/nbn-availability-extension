let realestate = true;
let domain = true;
let realestateview = true;
let onthehouse = true;
let allhomes = true;
let rent = true;
let reiwa = true;
let homely = true;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ realestate });
    chrome.storage.sync.set({ domain });
    chrome.storage.sync.set({ realestateview });
    chrome.storage.sync.set({ onthehouse });
    chrome.storage.sync.set({ allhomes });
    chrome.storage.sync.set({ rent });
    chrome.storage.sync.set({ reiwa });
    chrome.storage.sync.set({ homely });
});