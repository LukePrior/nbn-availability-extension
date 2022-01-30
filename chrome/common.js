function getData(address, callback) {
    var url = "https://nbn-service-check.vercel.app/check?address=" + encodeURIComponent(address);

    var formatted = {};

    $.getJSON(url, function (data) {
        formatted.technologyHTML = `<p>NBN Technology: ${data.body.primaryAccessTechnology} <span class="tooltip">🛈<span class="tooltiptext"> You can read more about technology types <a href="https://www.nbnco.com.au/learn/network-technology" target="_blank">here</a></span></span></p>`;
        
        formatted.technologyClass = "wireless";
        if (data.body.primaryAccessTechnology == "Fibre To The Premises") {
            formatted.technologyClass = "fttp";
        } else if (data.body.primaryAccessTechnology == "Fibre To The Curb" || data.body.primaryAccessTechnology == "Fibre To The Building") {
            formatted.technologyClass = "fttc";
        } else if (data.body.primaryAccessTechnology == "Fibre To The Node") {
            formatted.technologyClass = "fttn";
        }

        if (data.body.upperSpeed == null) {
            if (data.body.speed != "") {
                formatted.speed = `<p>Max Speed: ${data.body.speed}Mbps <span class="tooltip">🛈<span class="tooltiptext"> This is the maximum download speed available </span></span></p>`;
            }
        } else { // FTTN
            formatted.speed = `<p>Max Speed: ${data.body.lowerSpeed}-${data.body.upperSpeed}Mbps <span class="tooltip">🛈<span class="tooltiptext"> This is the estimated maximum download speed range </span></span></p>`;
        }

        if (data.body.networkCoexistence.length > 0) {
            formatted.coexistance = `<p>Co-existance: ${data.body.networkCoexistence} <span class="tooltip">🛈<span class="tooltiptext"> Co-existance can affect your maximum download speeds, read more <a href="https://help.australiabroadband.com.au/support/solutions/articles/44000688641-what-is-co-existence-and-why-does-it-affect-my-internet-speed-" target="_blank">here</a></span></span></p>`;
        }
        callback(formatted);
    }).fail(function () {
        formatted.failure = `<p>NBN not available <span class="tooltip">🛈<span class="tooltiptext"> The API could not find an NBN serviceable address at this location </span></span></p>`;
        formatted.technologyClass = "wireless";
        callback(formatted);
    });
}