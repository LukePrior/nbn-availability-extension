var oldHref = document.location.href;

function mainRun() {
    chrome.storage.sync.get("realestate", function (enabled) {
        if (enabled["realestate"]) {
            if (window.location.href.includes("https://www.realestate.com.au/property-") || window.location.href.includes("https://www.realestate.com.au/sold/property-")) { // Listed + Recently Sold

                var address = $("h1.property-info-address").text();
                var url = "https://nbn-service-check.vercel.app/check?address=" + encodeURIComponent(address);

                $(".property-info__property-attributes").append(`<div class="nbn-stats"><p>NBN information loading</p></div>`);

                $.getJSON(url, function (data) {
                    $(".nbn-stats").empty();
                    $(".nbn-stats").append(`<p>NBN Technology: ${data.body.primaryAccessTechnology} <span class="tooltip">🛈<span class="tooltiptext"> You can read more about technology types <a href="https://www.nbnco.com.au/learn/network-technology" target="_blank">here</a></span></span></p>`);
                    if (data.body.upperSpeed == null) {
                        $(".nbn-stats").append(`<p>Max Speed: ${data.body.speed}Mbps <span class="tooltip">🛈<span class="tooltiptext"> This is the maximum download speed available </span></span></p>`);
                    } else { // FTTN
                        $(".nbn-stats").append(`<p>Max Speed: ${data.body.lowerSpeed}-${data.body.upperSpeed}Mbps <span class="tooltip">🛈<span class="tooltiptext"> This is the estimated maximum download speed range </span></span></p>`);
                    }
                    if (data.body.networkCoexistence.length > 0) $(".nbn-stats").append(`<p>Co-existance: ${data.body.networkCoexistence} <span class="tooltip">🛈<span class="tooltiptext"> Co-existance can affect your maximum download speeds, read more <a href="https://help.australiabroadband.com.au/support/solutions/articles/44000688641-what-is-co-existence-and-why-does-it-affect-my-internet-speed-" target="_blank">here</a></span></span></p>`);
                }).fail(function () {
                    $(".nbn-stats").empty();
                    $(".nbn-stats").append(`<p>NBN not available</p>`);
                });
            }
            else if (window.location.href.includes("https://www.realestate.com.au/property/")) { // Property Value

                var street = $("div.property-info__short-address").text();
                var suburb = $("div.property-info__full-suburb").text();
                var address = street + " " + suburb;
                address = address.replace(/(\r\n|\n|\r)/gm, "");
                address = address.replace(/\s\s+/g, ' ');
                address = address.trim();
                var url = "https://nbn-service-check.vercel.app/check?address=" + encodeURIComponent(address);

                $(".property-info__attributes").append(`<div class="nbn-stats"><p>NBN information loading</p></div>`);

                $.getJSON(url, function (data) {
                    $(".nbn-stats").empty();
                    $(".nbn-stats").append(`<p style="margin-block-start:0em;margin-block-end:0em;">NBN Technology: ${data.body.primaryAccessTechnology} <span class="tooltip">🛈<span class="tooltiptext"> You can read more about technology types <a href="https://www.nbnco.com.au/learn/network-technology" target="_blank">here</a></span></span></p>`);
                    if (data.body.upperSpeed == null) {
                        $(".nbn-stats").append(`<p style="margin-block-start:0em;margin-block-end:0em;">Max Speed: ${data.body.speed}Mbps <span class="tooltip">🛈<span class="tooltiptext"> This is the maximum download speed available </span></span></p>`);
                    } else { // FTTN
                        $(".nbn-stats").append(`<p style="margin-block-start:0em;margin-block-end:0em;">Max Speed: ${data.body.lowerSpeed}-${data.body.upperSpeed}Mbps <span class="tooltip">🛈<span class="tooltiptext"> This is the estimated maximum download speed range </span></span></p>`);
                    }
                    if (data.body.networkCoexistence.length > 0) $(".nbn-stats").append(`<p style="margin-block-start:0em;margin-block-end:0em;">Co-existance: ${data.body.networkCoexistence} <span class="tooltip">🛈<span class="tooltiptext"> Co-existance can affect your maximum download speeds, read more <a href="https://help.australiabroadband.com.au/support/solutions/articles/44000688641-what-is-co-existence-and-why-does-it-affect-my-internet-speed-" target="_blank">here</a></span></span></p>`);
                }).fail(function () {
                    $(".nbn-stats").empty();
                    $(".nbn-stats").append(`<p style="margin-block-start:0em;margin-block-end:0em;">NBN not available</p>`);
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