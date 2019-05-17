chrome.app.runtime.onLaunched.addListener(function(launchData) {
    chrome.app.window.create('index.html', {
        'outerBounds': {
            'width': 180,
            'height': 200
        },
        "resizable": true,
    }, function(win) {
        win.contentWindow.launchData = launchData;
    });
});