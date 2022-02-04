var sites = {"Realestate":{}, "Domain":{}, "Realestate View":{}, "On The House":{}, "All Homes":{}, "Rent":{}, "Reiwa":{}, "Homely":{}, "Real Commercial":{}, "Commercial Real Estate": {}};

var content = $(".siteList")

for (const [key, value] of Object.entries(sites)) {
    var formatted = key.toLocaleLowerCase();
    formatted = formatted.replace(/\s/g,'');
    var label = $("<label>");
    var input = $('<input type="checkbox">').attr("id",formatted);
    input.appendTo(label);
    label.append(key);
    content.append(label);
    var breakTag = $("<br>");
    content.append(breakTag);
}

const inputHandler = function(e) {
    var id = e.target.id;
    var status = e.currentTarget.checked;
    chrome.storage.sync.set({ [id]: status });
}

for (const [key, value] of Object.entries(sites)) {
    var formatted = key.toLocaleLowerCase();
    formatted = formatted.replace(/\s/g,'');
    value.button = document.getElementById(formatted);
    value.button.addEventListener('input', inputHandler);
}

chrome.storage.sync.get((data) => {
    for (const [key, value] of Object.entries(sites)) {
        var formatted = key.toLocaleLowerCase();
        formatted = formatted.replace(/\s/g,'');
        if (data.hasOwnProperty(formatted)) {
            value.button.checked=data[formatted];
        }
    }
});