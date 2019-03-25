var prog, dancing;
function flip() {
    this.isFlipped;
    if (this.isFlipped === false) {
        document.getElementsByTagName("img")[0].style.transform = "scaleX(-1)";
        this.isFlipped = true;
        return;
    }
    document.getElementsByTagName("img")[0].style.removeProperty("transform");
    this.isFlipped = false;
}
function progress() {
    if (document.getElementsByTagName("progress")[0].value < document.getElementsByTagName("progress")[0].max) {
        document.getElementsByTagName("progress")[0].value++;
        return;
    }
    document.getElementsByTagName("progress")[0].value = 0;
    document.getElementById("control").click();
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
    clear();
    reader.onload = function(e) {
        MIDIjs.play(reader.result);
        MIDIjs.get_duration(reader.result, function(duration) {
            document.getElementsByTagName("progress")[0].max = duration;
        });
        document.getElementsByTagName("progress")[0].value = 0;
        document.getElementById("control").click();
    };
    document.getElementById("title").innerText = document.getElementById("filein").files[0].name.split(".mid")[0];
    document.getElementById("control").disabled = false;
};
document.getElementById("control").onclick = function() {
    if (!dancing) {
        MIDIjs.resume();
        document.getElementById("control").innerHTML = "&#10073;&#10073;";
        prog = setInterval(progress, 1000);
        dancing = setInterval(flip, 700);
        return;
    }
    MIDIjs.pause();
    document.getElementById("control").innerHTML = "&#9654;";
    clear();
};
window.addEventListener("load", MIDIjs.get_duration());