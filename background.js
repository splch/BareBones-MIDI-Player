chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
        url: chrome.runtime.getURL("index.html"),
        height: 185,
        width: 165,
        type: "popup"
    });
});