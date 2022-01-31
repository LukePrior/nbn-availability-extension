var hiddenProperties = ["technologyClass"];

function getData(address, callback) {
    var url = "https://nbn-service-check.vercel.app/check?address=" + encodeURIComponent(address);

    var formatted = {};

    $.getJSON(url, function (data) {
        formatted.technologyHTML = `<p>NBN Technology: ${data.body.primaryAccessTechnology} <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> You can read more about technology types <a href="https://www.nbnco.com.au/learn/network-technology" target="_blank">here</a></span></span></p>`;
        
        formatted.technologyClass = "wireless";
        if (data.body.primaryAccessTechnology == "Fibre To The Premises" || data.body.primaryAccessTechnology == "Fibre") {
            formatted.technologyClass = "fttp";
        } else if (data.body.primaryAccessTechnology == "Fibre To The Curb" || data.body.primaryAccessTechnology == "Fibre To The Building" || data.body.primaryAccessTechnology == "HFC") {
            formatted.technologyClass = "fttc";
        } else if (data.body.primaryAccessTechnology == "Fibre To The Node") {
            formatted.technologyClass = "fttn";
        }

        if (data.body.upperSpeed == null) {
            if (data.body.primaryAccessTechnology == "HFC") {
                formatted.speed = `<p>Max Speed: 250-1000Mbps <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> Some HFC premises are limited to 250Mbps maximum download speed </span></span></p>`;
            } else if (formatted.technologyClass == "fttp") {
                formatted.speed = `<p>Max Speed: 1000Mbps <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> This is the maximum download speed available </span></span></p>`;
            } else if (data.body.speed != "") {
                formatted.speed = `<p>Max Speed: ${data.body.speed}Mbps <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> This is the maximum download speed available </span></span></p>`;
            }
        } else { // FTTN
            formatted.speed = `<p>Max Speed: ${data.body.lowerSpeed}-${data.body.upperSpeed}Mbps <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> This is the estimated maximum download speed range </span></span></p>`;
        }

        if (data.body.networkCoexistence.length > 0) {
            formatted.coexistance = `<p>Co-existance: ${data.body.networkCoexistence} <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> Co-existance can affect your maximum download speeds, read more <a href="https://help.australiabroadband.com.au/support/solutions/articles/44000688641-what-is-co-existence-and-why-does-it-affect-my-internet-speed-" target="_blank">here</a></span></span></p>`;
        }

        if (data.body.NewDevelopmentsChargeApplies == "Yes") {
            formatted.NewDevelopmentCharge = `<p>New Development Charge: Yes <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> The New Development Charge is a $300 fee to connect a new building to the NBN network </span></span></p>`;
        }

        callback(formatted);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        formatted.failure = `<p>NBN not available <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> The API could not find an NBN serviceable address at this location </span></span></p>`;
        formatted.technologyClass = "wireless";
        callback(formatted);
    });
}