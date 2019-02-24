var midi = null;
var isPlaying = false;

function flip() {
    this.isFlipped;
    if (this.isFlipped === true) {
        document.getElementsByTagName("img")[0].removeAttribute("style");
        this.isFlipped = false;
    }
    else {
        document.getElementsByTagName("img")[0].setAttribute("style", "transform: scaleX(-1);");
        this.isFlipped = true;
    }
}
function trydance() {
    if (isPlaying === false) {
        return;
    }
    flip();
    setTimeout(trydance, 700);
}
document.getElementById("load").onclick = function() {
    document.getElementById("filein").click();
};
document.getElementById("filein").onchange = function() {
    var reader = new FileReader();
    if (document.getElementById("filein").files[0]) {
        reader.readAsDataURL(document.getElementById("filein").files[0]);
        reader.onload = function(e) {
            midi = reader.result;
            document.getElementsByTagName("small")[0].innerHTML = document.getElementById("filein").files[0].name.substring(0,35);
        };
    }
    document.getElementById("play").removeAttribute("disabled");
};
document.getElementById("play").onclick = function() {
    if (midi) {
        MIDIjs.play(midi);
        isPlaying = true;
        setTimeout(trydance, 700);
        document.getElementById("play").setAttribute("disabled", true);
        document.getElementById("stop").removeAttribute("disabled");
    }
};
document.getElementById("stop").onclick = function() {
    MIDIjs.stop();
    isPlaying = false;
    document.getElementById("stop").setAttribute("disabled", true);
    document.getElementById("play").removeAttribute("disabled");
};