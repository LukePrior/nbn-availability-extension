var oldHref = document.location.href;

function mainRun() {
    chrome.storage.sync.get(function (enabled) {
        if (enabled["realestate"]) {
            if (window.location.href.includes("https://www.realestate.com.au/property-")) {

                var address = $("h1.property-info-address").text();
                var url = "https://nbn-service-check.vercel.app/check?address=" + encodeURIComponent(address);

                $(".property-info__property-attributes").append(`<div class="nbn-stats"><p>NBN information loading</p></div>`);

                $.getJSON(url, function (data) {
                    $(".nbn-stats").empty();
                    $(".nbn-stats").append(`<p>NBN Technology: ${data.body.primaryAccessTechnology}</p>`);
                    if (data.body.upperSpeed == null) {
                        $(".nbn-stats").append(`<p>Max Speed: ${data.body.speed}Mbps</p>`);
                    } else { // FTTN
                        $(".nbn-stats").append(`<p>Max Speed: ${data.body.lowerSpeed}-${data.body.upperSpeed}Mbps</p>`);
                    }
                    if (data.networkCoexistence != null) $(".nbn-stats").append(`<p>Coexistance: ${networkCoexistence}</p>`);
                }).fail(function () {
                    $(".nbn-stats").empty();
                    $(".nbn-stats").append(`<p>NBN not available</p>`);
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