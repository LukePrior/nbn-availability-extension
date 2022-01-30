var oldHref = document.location.href;

function mainRun() {
    chrome.storage.sync.get("realestate", function (enabled) {
        if (enabled["realestate"]) {
            if (window.location.href.includes("https://www.realestate.com.au/property-") || window.location.href.includes("https://www.realestate.com.au/sold/property-")) { // Listed + Recently Sold

                var address = $("h1.property-info-address").text();

                var loadingImage = chrome.runtime.getURL("images/loading.svg");
                $(".property-info__property-attributes").append(`<div class="nbn-stats"><div style="display:flex;align-items:center"><p>NBN information loading</p><img style="width:70px;margin-left:auto;" src="${loadingImage}"/></div></div>`);

                getData(address, function(data) {
                    $(".nbn-stats").empty();
                    $(".nbn-stats").addClass(data.technologyClass);
                    if (data.hasOwnProperty("failure")) {
                        $(".nbn-stats").append(data.failure);
                    } else {
                        if (data.hasOwnProperty("technologyHTML")) {
                            $(".nbn-stats").append(data.technologyHTML);
                        }
                        if (data.hasOwnProperty("speed")) {
                            $(".nbn-stats").append(data.speed);
                        }
                        if (data.hasOwnProperty("coexistance")) {
                            $(".nbn-stats").append(data.coexistance);
                        }
                    }
                });
            }
            else if (window.location.href.includes("https://www.realestate.com.au/property/")) { // Property Value

                var street = $("div.property-info__short-address").text();
                var suburb = $("div.property-info__full-suburb").text();
                var address = street + " " + suburb;
                address = address.replace(/(\r\n|\n|\r)/gm, "");
                address = address.replace(/\s\s+/g, ' ');
                address = address.trim();

                $(".property-info__attributes").append(`<div class="nbn-stats"><div style="display:flex;align-items:center"><p>NBN information loading</p><img style="width:70px;margin-left:auto;" src="${loadingImage}"/></div></div>`);

                getData(address, function(data) {
                    $(".nbn-stats").empty();
                    $(".nbn-stats").addClass(data.technologyClass);
                    if (data.hasOwnProperty("failure")) {
                        $(".nbn-stats").append(data.failure);
                    } else {
                        if (data.hasOwnProperty("technologyHTML")) {
                            $(".nbn-stats").append(data.technologyHTML);
                        }
                        if (data.hasOwnProperty("speed")) {
                            $(".nbn-stats").append(data.speed);
                        }
                        if (data.hasOwnProperty("coexistance")) {
                            $(".nbn-stats").append(data.coexistance);
                        }
                    }
                });
            }
        }
    });
}

window.onload = function () {
    var bodyList = document.querySelector("body")

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (oldHref != document.location.href) {
                oldHref = document.location.href;
                mainRun();
            }
        });
    });

    var config = {
        childList: true,
        subtree: true
    };

    observer.observe(bodyList, config);
};

mainRun();