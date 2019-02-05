chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        'outerBounds': {
            'width': 200,
            'height': 270
        },
        "resizable": false,
    });
});