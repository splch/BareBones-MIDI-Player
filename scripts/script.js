var midi;
var sss = 0;
document.getElementById("load").onchange = function() {
    var reader = new FileReader();
    if (document.getElementById("load").files[0]) {
        reader.readAsDataURL(document.getElementById("load").files[0]);
        reader.onload = function(e) {
            midi = reader.result;
        };
    }
};
document.getElementById("play").onclick = function() {
    if (midi) {
        MIDIjs.play(midi);
        document.getElementsByTagName("small")[0].innerHTML = "playing...";
    }
};
document.getElementById("stop").onclick = function() {
    MIDIjs.stop();
    document.getElementsByTagName("small")[0].innerHTML = "";
};