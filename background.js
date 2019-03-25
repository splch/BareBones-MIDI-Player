chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        'outerBounds': {
            'width': 170,
            'height': 210
        },
        "resizable": false,
    });
});