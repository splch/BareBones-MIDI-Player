var midi;
var sss = 0;

function timer(ev) {
    document.getElementById("time").innerHTML = Math.round(ev.time);
    document.getElementById("time").innerHTML += " s";
}

document.getElementById("load").onchange = function() {
    var reader = new FileReader();
    reader.readAsDataURL(document.getElementById("load").files[0]);
    reader.onload = function(e) {
        midi = reader.result;
    };
};

document.getElementById("play").onclick = function() {
    if (midi) {
        MIDIjs.play(midi);
        MIDIjs.player_callback = timer;
    }
};

document.getElementById("stop").onclick = function() {
    MIDIjs.stop();
    document.getElementById("time").innerHTML = "0 s";
};

document.getElementById("sss").onclick = function() {
    sss ++;
    if (sss % 9 === 0) {
        MIDIjs.play("scripts/pat/sss.mid");
        MIDIjs.player_callback = timer;
    }
};