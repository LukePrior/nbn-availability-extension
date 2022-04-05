var oldHref = document.location.href;
var loadingTimeout;

function mainRun() {
    if (window.location.href.includes("https://www.realestate.com.au/property-") || window.location.href.includes("https://www.realestate.com.au/sold/property-")) { // Realestate.com.au Listed + Recently Sold
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(realestate, 1000);
        function realestate() {
            chrome.storage.sync.get("realestate", function (enabled) {
                if (enabled["realestate"]) {
                    var address = $("h1.property-info-address").text();

                    updateInfoBox(address, ".property-info__property-attributes");
                }
            });
        }
    } else if (window.location.href.includes("https://www.realestate.com.au/property/")) { // Realestate.com.au Property Value
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(realestateProperty, 1000);
        function realestateProperty() {
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
        }
    } else if (window.location.href.includes("https://www.realestate.com.au/collections/saved-properties/")) { // Realestate.com.au Saved Properties
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(realestateSaved, 1000);
        function realestateSaved() {
            chrome.storage.sync.get("realestate", function (enabled) {
                if (enabled["realestate"]) {
                    $(".front").each(function(i) {
                        var street = $(this).find(".address").text();
                        var suburb = $(this).find(".suburb").text();
                        var address = street + " " + suburb;
                        address = address.replace(/(\r\n|\n|\r)/gm, "");
                        address = address.replace(/\s\s+/g, ' ');
                        address = address.trim();

                        var id = $(this).find("a:first").attr("id");
                        var selector = "#" + id + " .features";

                        $(".listing-card ul.features").css({"top": "20px", "text-align": "right"});

                        updateInfoLine(address, selector);
                    })
                }
            });
        }
    } else if (window.location.href.includes("https://www.domain.com.au/user/shortlist")) { // Domain.com.au Saved Properties
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(domainSaved, 1000);
        function domainSaved() {
            chrome.storage.sync.get("domain", function (enabled) {
                if (enabled["domain"]) {
                    $(".css-eztut6").each(function(i) {
                        var address = $(this).find(".css-bqbbuf").text();
                        address = address.replace(/(\r\n|\n|\r)/gm, "");
                        address = address.replace(/\s\s+/g, ' ');
                        address = address.trim();

                        var id = $(this).data("listing-id");
                        var selector = "div[data-listing-id=" + id + "] .css-1t41ar7";

                        $(".nbn-line").css({"padding-left": "15px"});
                        $(".css-1rj8fhl").css({"margin-top": "-4px"});

                        updateInfoLine(address, selector);

                        $(".nbn-line").css({"padding-left": "15px"});
                        $(".css-1rj8fhl").css({"margin-top": "-4px"});
                    })
                }
            });
        }
    } else if (window.location.href.includes("https://www.domain.com.au/")) { // Domain.com.au
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(domain, 1000);
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
    }else if (window.location.href.includes("https://www.realestateview.com.au/real-estate/") || window.location.href.includes("https://www.realestateview.com.au/rental-properties/")) { // Realestateview.com.au
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(realestateview, 1000);
        function realestateview() {
            chrome.storage.sync.get("realestateview", function (enabled) {
                if (enabled["realestateview"]) {
                    if ($("h1.page-title").length) {
                        var address = $("h1.page-title").text();

                        updateInfoBox(address, ".property-attributes");
                    }
                }
            });
        }
    } else if (window.location.href.includes("https://www.onthehouse.com.au/property")) { // Onthehouse.com.au
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(onTheHouse, 2000);
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
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(allhomes, 1000);
        function allhomes() {
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
        }
    } else if (window.location.href.includes("https://www.rent.com.au/property/")) { // Rent.com.au
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(rent, 1000);
        function rent() {
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
        }
    } else if (window.location.href.includes("https://reiwa.com.au/")) { // Reiwa.com.au
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(reiwa, 1000);
        function reiwa() {
            chrome.storage.sync.get("reiwa", function (enabled) {
                if (enabled["reiwa"]) {
                    if ($("h1.remove-margin").length) {
                        var address = $("h1.remove-margin").text();
                        address = address.replace(/(\r\n|\n|\r)/gm, "");
                        address = address.replace(/\s\s+/g, ' ');
                        address = address.trim();

                        if (!$(".nbn-stats").length) {
                            updateInfoBox(address, "#ctl00_uxContentHolder_ctl00_ucPropertyDetails_divPropertyDetails");
                        }
                    }
                }
            });
        }
    } else if (window.location.href.includes("https://www.homely.com.au/homes/")) { // Homely.com.au
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(homely, 1000);
        function homely() {
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
    } else if (window.location.href.includes("https://www.realcommercial.com.au/")) { // RealCommercial.com.au
        clearTimeout(loadingTimeout);
        loadingTimeout = realcommercial(homely, 1000);
        function realcommercial() {
            chrome.storage.sync.get("realcommercial", function (enabled) {
                if (enabled["realcommercial"]) {
                    if ($("h1.Address_container_3HZgj").length) {
                        var address = $("h1.Address_container_3HZgj").text();
                        address = address.replace(/(\r\n|\n|\r)/gm, "");
                        address = address.replace(/\s\s+/g, ' ');
                        address = address.trim();

                        updateInfoBox(address, ".AttributesPanel_heading_cQ2GV");
                    }
                }
            });
        }
    } else if (window.location.href.includes("https://www.commercialrealestate.com.au/property/")) { // CommercialRealEstate.com.au
        clearTimeout(loadingTimeout);
        loadingTimeout = commercialrealestate(homely, 1000);
        function commercialrealestate() {
            chrome.storage.sync.get("commercialrealestate", function (enabled) {
                if (enabled["commercialrealestate"]) {
                    if ($("h1.css-wfocq").length) {
                        var address = $("h1.css-wfocq").text();
                        address = address.replace(/(\r\n|\n|\r)/gm, "");
                        address = address.replace(/\s\s+/g, ' ');
                        address = address.trim();

                        updateInfoBox(address, ".css-1pkuoet");
                    }
                }
            });
        }
    }
}

function updateInfoBox(address, location) {
    var id = Math.random().toString(36).substr(2, 10);
    var loadingImage = chrome.runtime.getURL("images/loading.svg");
    $(location).append(`<div class="nbn-stats" id="nbn-stats-` + id + `"><div style="display:flex;align-items:center"><p>NBN information loading</p><img style="width:70px;margin-left:auto;" src="${loadingImage}"/></div></div>`);

    getData(address, function(data) {
        if ($("#nbn-stats-" + id).length) {
            $("#nbn-stats-" + id).empty();
        } else {
            $(location).append(`<div class="nbn-stats" id="nbn-stats-` + id + `></div>`);
        }
        
        $("#nbn-stats-" + id).addClass(data.technologyClass);
        if (data.hasOwnProperty("failure")) {
            $("#nbn-stats-" + id).append(data.failure);
        } else {
            for (var property of Object.keys(data)) {
                if (!hiddenProperties.includes(property)) {
                    $("#nbn-stats-" + id).append(data[property]);
                }
            }
        }
    });
}

function updateInfoLine(address, location) {
    var id = Math.random().toString(36).substr(2, 10);
    $(location).append(`<div class="nbn-line" id="nbn-stats-` + id + `"><div><p>NBN information loading</p></div></div>`);

    getData(address, function(data) {
        if ($("#nbn-stats-" + id).length) {
            $("#nbn-stats-" + id).empty();
        } else {
            $(location).append(`<div class="nbn-line" id="nbn-stats-` + id + `></div>`);
        }

        if (!data.hasOwnProperty("failure")) {
            $("#nbn-stats-" + id).append(`${data.rawProvider} ${data.rawTechnology} (${data.rawSpeed })`);
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