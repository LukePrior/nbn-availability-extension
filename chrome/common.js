var hiddenProperties = ["technologyClass", "rawTechnology", "rawProvider", "rawSpeed"];

function getData(address, callback) {
    var url = "https://nbn-service-check.vercel.app/check?address=" + encodeURIComponent(address);

    var formatted = {};

    $.getJSON(url, function (data) {
        var provider = "NBN";  

        if (data.body.hasOwnProperty("provider") && data.body.provider != "NBNCo") {
            provider = data.body.provider;
        }

        formatted.rawProvider = provider;

        formatted.technologyHTML = `<p>${provider} Technology: ${data.body.primaryAccessTechnology} <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> You can read more about technology types <a href="https://www.nbnco.com.au/learn/network-technology" target="_blank">here</a></span></span></p>`;
        
        formatted.technologyClass = "wireless";
        formatted.rawTechnology = "FW";
        if (data.body.primaryAccessTechnology == "Fibre To The Premises" || data.body.primaryAccessTechnology == "Fibre") {
            formatted.technologyClass = "fttp";
            formatted.rawTechnology = "FTTP";
        } else if (data.body.primaryAccessTechnology == "Fibre To The Curb") {
            formatted.technologyClass = "fttc";
            formatted.rawTechnology = "FTTC";
        } else if (data.body.primaryAccessTechnology == "Fibre To The Building") {
            formatted.technologyClass = "fttc";
            formatted.rawTechnology = "FTTB";
        } else if (data.body.primaryAccessTechnology == "HFC") {
            formatted.technologyClass = "fttc";
            formatted.rawTechnology = "HFC";
        } else if (data.body.primaryAccessTechnology == "Fibre To The Node") {
            formatted.technologyClass = "fttn";
            formatted.rawTechnology = "FTTN";
        }

        if (data.body.upperSpeed == null) {
            if (data.body.primaryAccessTechnology == "HFC") {
                formatted.speed = `<p>Max Speed: 250-1000Mbps <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> Some HFC premises are limited to 250Mbps maximum download speed </span></span></p>`;
                formatted.rawSpeed = "250-1000Mbps";
            } else if (formatted.technologyClass == "fttp") {
                formatted.speed = `<p>Max Speed: 1000Mbps <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> This is the maximum download speed available </span></span></p>`;
                formatted.rawSpeed = "1000Mbps";
            } else if (data.body.primaryAccessTechnology == "Satellite") {
                formatted.speed = `<p>Max Speed: 25Mbps <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> Download speeds can fluctuate on a satellite connection </span></span></p>`;
                formatted.rawSpeed = "25Mbps";
            }else if (data.body.hasOwnProperty("speed") && data.body.speed != "") {
                formatted.rawSpeed = `${data.body.speed}Mbps`;
                formatted.speed = `<p>Max Speed: ${data.body.speed}Mbps <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> This is the maximum download speed available </span></span></p>`;
            }
        } else { // FTTN
            formatted.speed = `<p>Max Speed: ${data.body.lowerSpeed}-${data.body.upperSpeed}Mbps <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> This is the estimated maximum download speed range </span></span></p>`;
            formatted.rawSpeed = `${data.body.lowerSpeed}-${data.body.upperSpeed}Mbps`;
        }

        if (data.body.hasOwnProperty("networkCoexistence") && data.body.networkCoexistence.length > 0) {
            formatted.coexistance = `<p>Co-existance: ${data.body.networkCoexistence} <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> Co-existance can affect your maximum download speeds, read more <a href="https://help.australiabroadband.com.au/support/solutions/articles/44000688641-what-is-co-existence-and-why-does-it-affect-my-internet-speed-" target="_blank">here</a></span></span></p>`;
        }

        if (data.body.hasOwnProperty("NewDevelopmentsChargeApplies") && data.body.NewDevelopmentsChargeApplies == "Yes") {
            formatted.NewDevelopmentCharge = `<p>New Development Charge: Yes <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> The New Development Charge is a $300 fee to connect a new building to the NBN network </span></span></p>`;
        }

        callback(formatted);
    }).fail(function () {
        formatted.failure = `<p>NBN not available <span class="nbn-tooltip">🛈<span class="nbn-tooltiptext"> The API could not find an NBN serviceable address at this location </span></span></p>`;
        formatted.technologyClass = "wireless";
        callback(formatted);
    });
}