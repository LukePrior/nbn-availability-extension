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

## Supported Networks

- NBN
- OptiComm
- LBNCo
- OPENetworks

# Install Instructions

## Chrome

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

### Automatic Installation

NOTE THIS VERSION IS CURRENTLY OUT OF DATE AWAITING MICROSOFT TO APPROVE LATEST VERSION.
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
