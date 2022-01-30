var oldHref = document.location.href;

function mainRun() {
    chrome.storage.sync.get("domain", function (enabled) {
        if (enabled["domain"]) {
            if ($("h1.css-164r41r").length) {
                var address = $("h1.css-164r41r").text();

                $(".css-fpm9y").append(`<div class="nbn-stats"><div style="display:flex;align-items:center"><p>NBN information loading</p><img style="width:70px;margin-left:auto;" src="${loadingImage}"/></div></div>`);

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