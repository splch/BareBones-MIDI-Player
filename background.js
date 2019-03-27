chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.app.window.create('index.html', {
        'outerBounds': {
            'width': 170,
            'height': 210
        },
        "resizable": false,
    }, function(win) {
        win.contentWindow.launchData = launchData;
    });
});