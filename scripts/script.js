let prog, dancing, midi;

function play(b64, name) {
    clear();
    midi = b64;
    MIDIjs.play(midi);
    MIDIjs.get_duration(midi, function(duration) {
        document.getElementsByTagName("progress")[0].max = duration;
    });
    document.getElementById("title").innerText = name.split(".mid")[0];
    document.getElementsByTagName("progress")[0].value = 0;
    document.getElementsByTagName("fieldset")[0].disabled = false;
    document.getElementById("control").click();
}

function readAsDataURL(fileEntry, callback) {
    fileEntry.file(function(file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

function loadInitialFile(launchData) {
    if (launchData && launchData.items && launchData.items[0]) {
        readAsDataURL(launchData.items[0].entry, function(result) {
            play(result, launchData.items[0].entry.name);
        });
    }
}

function progress() {
    if (document.getElementsByTagName("progress")[0].value < document.getElementsByTagName("progress")[0].max) {
        document.getElementsByTagName("progress")[0].value++;
        return;
    }
    else if (document.getElementById("loop").looped === true) {
        MIDIjs.play(midi);
        document.getElementsByTagName("progress")[0].value = 0;
        return;
    }
    MIDIjs.play(midi);
    document.getElementById("control").click();
    document.getElementsByTagName("progress")[0].value = 0;
}

function flip() {
    if (this.isFlipped) {
        document.getElementsByTagName("img")[0].style.transform = "scaleX(-1)";
        this.isFlipped = false;
        return;
    }
    document.getElementsByTagName("img")[0].style.transform = "scaleX(1)";
    this.isFlipped = true;
}

function clear() {
    clearInterval(prog);
    clearInterval(dancing);
    dancing = prog = null;
}

document.getElementById("load").onclick = function() {
    document.getElementById("filein").value = null;
    document.getElementById("filein").click();
};

document.getElementById("filein").onchange = function() {
    let reader = new FileReader();
    reader.readAsDataURL(document.getElementById("filein").files[0]);
    reader.onload = function(e) {
        play(reader.result, document.getElementById("filein").files[0].name);
    };
};

document.getElementById("control").onclick = function() {
    if (!dancing) {
        MIDIjs.resume();
        this.innerHTML = "&#10073;&#10073;";
        prog = setInterval(progress, 1000);
        dancing = setInterval(flip, 700);
        return;
    }
    MIDIjs.pause();
    this.innerHTML = "&#9654;";
    clear();
};

document.getElementById("loop").onclick = function() {
    if (this.looped) {
        this.style.color = "black";
        this.looped = false;
        return;
    }
    this.style.color = "lightgray";
    this.looped = true;
}

loadInitialFile(launchData);
document.getElementById("loop").click();