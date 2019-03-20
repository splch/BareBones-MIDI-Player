var midi = null;
var dancing;

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
    document.getElementsByTagName("progress")[0].value++;
}
document.getElementById("load").onclick = function() {
    document.getElementById("filein").value = null;
    document.getElementById("filein").click();
};
document.getElementById("filein").onchange = function() {
    var reader = new FileReader();
    if (document.getElementById("filein").files[0]) {
        clearInterval(dancing);
        dancing = null;
        reader.readAsDataURL(document.getElementById("filein").files[0]);
        reader.onload = function(e) {
            midi = reader.result;
            document.getElementById("control").click();
            document.getElementById("title").innerHTML = document.getElementById("filein").files[0].name.split('.mid')[0].substring(0,30);
        };
        document.getElementById("control").disabled = false;
    }
};
document.getElementById("control").onclick = function() {
    document.getElementsByTagName("progress")[0].value = 0;
    if (!dancing) {
        MIDIjs.play(midi);
        document.getElementById("control").innerHTML = "&#9724;";
        dancing = setInterval(flip, 700);
        document.getElementsByTagName("progress")[0].max = Math.round(document.getElementById("filein").files[0].size / 100);
        prog = setInterval(progress, 1000);
        return;
    }
    MIDIjs.stop();
    clearInterval(dancing);
    clearInterval(prog);
    dancing = null;
    document.getElementById("control").innerHTML = "&#9654;";
};