var oldHref = document.location.href;
var onTheHouseTimeout;
var domainTimeout;

function mainRun() {
    if (window.location.href.includes("https://www.realestate.com.au/property-") || window.location.href.includes("https://www.realestate.com.au/sold/property-")) { // Realestate.com.au Listed + Recently Sold
        chrome.storage.sync.get("realestate", function (enabled) {
            if (enabled["realestate"]) {
                var address = $("h1.property-info-address").text();

                updateInfoBox(address, ".property-info__property-attributes");
            }
        });
    } else if (window.location.href.includes("https://www.realestate.com.au/property/")) { // Realestate.com.au Property Value
        chrome.storage.sync.get("realestate", function (enabled) {
            if (enabled["realestate"]) {
                var street = $("div.property-info__short-address").text();
                var suburb = $("div.property-info__full-suburb").text();
                var address = street + " " + suburb;
                address = address.replace(/(\r\n|\n|\r)/gm, "");
                address = address.replace(/\s\s+/g, ' ');
                address = address.trim();

                updateInfoBox(address, ".property-info__attributes");
            }
        });
    } else if (window.location.href.includes("https://www.domain.com.au/")) { // Domain.com.au
        clearTimeout(domainTimeout);
        domainTimeout = setTimeout(domain, 1000);
        function domain() {
            chrome.storage.sync.get("domain", function (enabled) {
                if (enabled["domain"]) {
                    if ($("h1.css-164r41r").length) {
                        var address = $("h1.css-164r41r").text();
                        
                        updateInfoBox(address, ".css-fpm9y");
                    }
                }
            });
        }
    } else if (window.location.href.includes("https://www.realestateview.com.au/real-estate/") || window.location.href.includes("https://www.realestateview.com.au/rental-properties/")) { // Realestateview.com.au
        chrome.storage.sync.get("realestateview", function (enabled) {
            if (enabled["realestateview"]) {
                if ($("h1.page-title").length) {
                    var address = $("h1.page-title").text();

                    updateInfoBox(address, ".property-attributes");
                }
            }
        });
    } else if (window.location.href.includes("https://www.onthehouse.com.au/property")) { // Onthehouse.com.au
        clearTimeout(onTheHouseTimeout);
        onTheHouseTimeout = setTimeout(onTheHouse, 2000);
        function onTheHouse() {
            chrome.storage.sync.get("onthehouse", function (enabled) {
                if (enabled["onthehouse"]) {
                    if ($("h1.m-0.mb-1.mb-md-3.xlText.bold600").length) {
                        var address = $("h1.m-0.mb-1.mb-md-3.xlText.bold600").html();
                        address = address.replace(/(<([^>]+)>)/ig," ");
                        address = address.trim();
        
                        updateInfoBox(address, ".PropertyInfo__propertyInfo--1ywRK");
                    }
                }
            });
        }
    } else if (window.location.href.includes("https://www.allhomes.com.au/")) { // Allhomes.com.au
        chrome.storage.sync.get("allhomes", function (enabled) {
            if (enabled["allhomes"]) {
                if ($("h1.css-hed0vw.e9vzjw54").length) {
                    var address = $("h1.css-hed0vw.e9vzjw54").text();

                    if ($(".css-q4719i.e18sdcwj0").length) {
                        updateInfoBox(address, ".css-q4719i.e18sdcwj0");
                    } else if ($(".css-1y9rfh").length) {
                        updateInfoBox(address, ".css-1y9rfh");
                    }
                }
            }
        });
    } else if (window.location.href.includes("https://www.rent.com.au/property/")) { // Rent.com.au
        chrome.storage.sync.get("rent", function (enabled) {
            if (enabled["rent"]) {
                if ($("address.detail-address").length) {
                    var address = $("address.detail-address").text();
                    address = address.replace(/(\r\n|\n|\r)/gm, "");
                    address = address.replace(/\s\s+/g, ' ');
                    address = address.trim();

                    updateInfoBox(address, ".block.detail-price");
                }
            }
        });
    } else if (window.location.href.includes("https://reiwa.com.au/")) { // Reiwa.com.au
        chrome.storage.sync.get("reiwa", function (enabled) {
            if (enabled["reiwa"]) {
                if ($("h1.remove-margin").length) {
                    var address = $("h1.remove-margin").text();
                    address = address.replace(/(\r\n|\n|\r)/gm, "");
                    address = address.replace(/\s\s+/g, ' ');
                    address = address.trim();

                    updateInfoBox(address, "#ctl00_uxContentHolder_ctl00_ucPropertyDetails_divPropertyDetails");
                }
            }
        });
    } else if (window.location.href.includes("https://www.homely.com.au/homes/")) { // Homely.com.au
        chrome.storage.sync.get("homely", function (enabled) {
            if (enabled["homely"]) {
                if ($("h1.mmdb4c-1.gGVYOy").length) {
                    var address = $("h1.mmdb4c-1.gGVYOy").text();
                    address = address.replace(/(\r\n|\n|\r)/gm, "");
                    address = address.replace(/\s\s+/g, ' ');
                    address = address.trim();

                    updateInfoBox(address, ".sc-1xfkwrb-4.jpXyFi");
                }
            }
        });
    }
}

function updateInfoBox(address, location) {
    var loadingImage = chrome.runtime.getURL("images/loading.svg");
    $(location).append(`<div class="nbn-stats"><div style="display:flex;align-items:center"><p>NBN information loading</p><img style="width:70px;margin-left:auto;" src="${loadingImage}"/></div></div>`);

    getData(address, function(data) {
        if ($(".nbn-stats").length) {
            $(".nbn-stats").empty();
        } else {
            $(location).append(`<div class="nbn-stats"></div>`);
        }
        
        $(".nbn-stats").addClass(data.technologyClass);
        if (data.hasOwnProperty("failure")) {
            $(".nbn-stats").append(data.failure);
        } else {
            for (var property of Object.keys(data)) {
                if (!hiddenProperties.includes(property)) {
                    $(".nbn-stats").append(data[property]);
                }
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