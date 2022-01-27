var oldHref = document.location.href;

function mainRun() {
    chrome.storage.sync.get("domain", function (enabled) {
        if (enabled["domain"]) {
            if ($("h1.css-164r41r").length) {
                var address = $("h1.css-164r41r").text();
                var url = "https://nbn-service-check.vercel.app/check?address=" + encodeURIComponent(address);

                $(".css-fpm9y").append(`<div class="nbn-stats"><p>NBN information loading</p></div>`);

                $.getJSON(url, function (data) {
                    if ($(".nbn-stats").length) {
                        $(".nbn-stats").empty();
                    } else {
                        $(".css-fpm9y").append(`<div class="nbn-stats"></div>`);
                    }
                    $(".nbn-stats").append(`<p>NBN Technology: ${data.body.primaryAccessTechnology}</p>`);
                    if (data.body.upperSpeed == null) {
                        $(".nbn-stats").append(`<p>Max Speed: ${data.body.speed}Mbps</p>`);
                    } else { // FTTN
                        $(".nbn-stats").append(`<p>Max Speed: ${data.body.lowerSpeed}-${data.body.upperSpeed}Mbps</p>`);
                    }
                    if (data.body.networkCoexistence.length > 0) $(".nbn-stats").append(`<p>Coexistance: ${data.body.networkCoexistence}</p>`);
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