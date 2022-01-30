const realestate = document.getElementById('realestate');
const domain = document.getElementById('domain');

const inputHandler = function(e) {
    var id = e.target.id;
    var status = e.currentTarget.checked;
    chrome.storage.sync.set({ [id]: status });
}

realestate.addEventListener('input', inputHandler);
domain.addEventListener('input', inputHandler);

chrome.storage.sync.get((data) => {
    if (data.hasOwnProperty("realestate")) {
        realestate.checked=data["realestate"];
    }
    if (data.hasOwnProperty("domain")) {
        domain.checked=data["domain"];
    }
});