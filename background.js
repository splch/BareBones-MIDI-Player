chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        'outerBounds': {
            'width': 197,
            'height': 270
        },
        "resizable": false,
    });
});