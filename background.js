chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.app.window.create('index.html', {
        'outerBounds': {
            'width': 168,
            'height': 219
        },
        "resizable": false,
    }, function(win) {
        win.contentWindow.launchData = launchData;
    });
});