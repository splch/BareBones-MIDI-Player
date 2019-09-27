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
    bar = document.getElementsByTagName("progress")[0];
    if (bar.value < bar.max) {
        bar.value++;
        bar.title = String(Math.floor(bar.value/60))+':'+String(Math.ceil(bar.value%60)).padStart(2, '0') + " / " + String(Math.floor(bar.max/60))+':'+String(Math.ceil(bar.max%60)).padStart(2, '0');
        return;
    }
    if (document.getElementById("loop").looped === true) {
        MIDIjs.play(midi);
        bar.value = 0;
        return;
    }
    MIDIjs.play(midi);
    document.getElementById("control").click();
    bar.value = 0;
    bar.removeAttribute("title");
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
    if (!midi) {
        return;
    }
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
        this.title = "loop: off";
        return;
    }
    this.style.color = "lightgray";
    this.looped = true;
    this.title = "loop: on";
};

onload = function () {
    loadInitialFile(launchData);
    document.getElementById("loop").looped = false;
};