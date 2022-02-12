# NBN Availability Check Chrome Extension

This simple extension can automatically load NBN availability information for properties on realestate.com.au & domain.com.au including technology type, maximum line speed, and co-existance status if available.

## Supported Sites

- Realestate
- Domain
- Realestate View
- On The House
- All Homes
- Rent
- Reiwa
- Homely
- Real Commercial
- Commercial Real Estate

## Supported Networks

- NBN
- OptiComm
- LBNCo
- OPENetworks

# Install Instructions

## Chrome

[![Version](https://img.shields.io/chrome-web-store/v/opoaebfilfhfpadepddodjnjnofjnbdc?style=for-the-badge)](https://chrome.google.com/webstore/detail/nbn-availability-check/opoaebfilfhfpadepddodjnjnofjnbdc)
[![Users](https://img.shields.io/chrome-web-store/users/opoaebfilfhfpadepddodjnjnofjnbdc?style=for-the-badge)](https://chrome.google.com/webstore/detail/nbn-availability-check/opoaebfilfhfpadepddodjnjnofjnbdc)
[![Rating](https://img.shields.io/chrome-web-store/rating/opoaebfilfhfpadepddodjnjnofjnbdc?style=for-the-badge)](https://chrome.google.com/webstore/detail/nbn-availability-check/opoaebfilfhfpadepddodjnjnofjnbdc/reviews)

### Automatic Installation

https://chrome.google.com/webstore/detail/nbn-availability-check/opoaebfilfhfpadepddodjnjnofjnbdc

### Manual Installation

1. Click the green code button and select download zip at the following link: https://github.com/LukePrior/nbn-availability-extension

2. Extract the downloaded file.

3. Visit chrome://extensions (via omnibox or menu -> Tools -> Extensions).

4. Enable Developer mode by ticking the checkbox in the upper-right corner.

5. Click on the "Load unpacked extension..." button.

6. Navigate to the folder you unzipped and select the chrome folder at nbn-availability-extension/chrome

## Firefox

[![Version](https://img.shields.io/amo/v/nbn-availability-check?style=for-the-badge)](https://addons.mozilla.org/en-US/firefox/addon/nbn-availability-check/versions/)
[![Users](https://img.shields.io/amo/users/nbn-availability-check?style=for-the-badge)](https://addons.mozilla.org/en-US/firefox/addon/nbn-availability-check/)
[![Rating](https://img.shields.io/amo/rating/nbn-availability-check?style=for-the-badge)](https://addons.mozilla.org/en-US/firefox/addon/nbn-availability-check/reviews/)

### Automatic Installation

https://addons.mozilla.org/en-US/firefox/addon/nbn-availability-check/

### Manual Installation

1. Click the green code button and select download zip at the following link: https://github.com/LukePrior/nbn-availability-extension

2. Extract the downloaded file.

3. Copy the contents of the chrome folder except `manifest.json` to the firefox file.

4. Create a zip file of all the files in the firefox folder.

5. Visit about:debugging#/runtime/this-firefox (via omnibox or menu -> Add-ons and themes -> Tools -> Debug Add-ons).

6. Click on the "Load Temporary Add-on" button.

7. Select the zipped file you created.

## Microsoft Edge

[![Version](https://img.shields.io/badge/dynamic/json?label=edge%20add-on&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fbcoemipadbcdgdgoijfejceofakdnmgo&style=for-the-badge)](https://microsoftedge.microsoft.com/addons/detail/nbn-availability-check/bcoemipadbcdgdgoijfejceofakdnmgo)
[![Users](https://img.shields.io/badge/dynamic/json?label=users&query=%24.activeInstallCount&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fbcoemipadbcdgdgoijfejceofakdnmgo&style=for-the-badge)](https://microsoftedge.microsoft.com/addons/detail/nbn-availability-check/bcoemipadbcdgdgoijfejceofakdnmgo)
[![Rating](https://img.shields.io/badge/dynamic/json?label=rating&suffix=/5&query=%24.averageRating&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fbcoemipadbcdgdgoijfejceofakdnmgo&style=for-the-badge)](https://microsoftedge.microsoft.com/addons/detail/nbn-availability-check/bcoemipadbcdgdgoijfejceofakdnmgo)

### Automatic Installation

https://microsoftedge.microsoft.com/addons/detail/nbn-availability-check/bcoemipadbcdgdgoijfejceofakdnmgo

### Manual Installation

1. Click the green code button and select download zip at the following link: https://github.com/LukePrior/nbn-availability-extension

2. Extract the downloaded file.

3. Visit edge://extensions (via omnibox or menu -> Extensions -> Manage extensions).

4. Enable Developer mode by ticking the checkbox in the lower-left corner.

5. Click on the "Load Unpacked" button.

6. Navigate to the folder you unzipped and select the chrome folder at nbn-availability-extension/chrome

# NBN Availability API

This extension uses the NBN Service Check [API](https://github.com/LukePrior/nbn-service-check) which is hosted on Vercel.

[![Powered by Vercel](https://raw.githubusercontent.com/LukePrior/nbn-availability-extension/main/powered-by-vercel.svg)](https://vercel.com/)
