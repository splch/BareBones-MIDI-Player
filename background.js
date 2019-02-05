chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('window.html', {
        'outerBounds': {
            'width': 200,
            'height': 270
        }
    });
});