chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("index.html"),
    height: 195,
    width: 175,
    type: "popup"
  });
});