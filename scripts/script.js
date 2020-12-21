function play(b64, name) {
  clear();
  bb.midi = b64;
  MIDIjs.play(bb.midi);
  MIDIjs.get_duration(bb.midi, function(duration) {
    bb.dur = duration;
  });
  document.getElementById('title').innerText = name.split('.mid')[0];
  document.getElementById('control').click();
  bb.val = 0;
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

function progress() {
  bar = document.getElementById('bar');
  if (bb.val > bb.dur) {
    bb.val = 0;
    bar.innerText = '';
    bar.style.width = '0%';
    MIDIjs.play(bb.midi);
    if (!bb.looped) document.getElementById('control').click();
  } else {
    bar.style.width = String(100 * bb.val / bb.dur) + '%';
    bar.innerText = String(Math.floor(bb.val / 60)) + ':' + String(Math.ceil(bb.val % 60)).padStart(2, '0') + ' / ' + String(Math.floor(bb.dur / 60)) + ':' + String(Math.ceil(bb.dur % 60)).padStart(2, '0');
    bb.val += 1;
  }
}

function flip() {
  this.isFlipped = !this.isFlipped;
  document.getElementsByTagName('img')[0].style.transform = this.isFlipped ? 'scaleX(-1)' : 'scaleX(1)';
}

function clear() {
  clearInterval(bb.prog);
  clearInterval(bb.dancing);
  bb.dancing = bb.prog = null;
}

document.getElementById('load').onclick = function() {
  document.getElementById('filein').value = null;
  document.getElementById('filein').click();
};

document.getElementById('filein').onchange = function() {
  let reader = new FileReader();
  reader.readAsDataURL(document.getElementById('filein').files[0]);
  reader.onload = function(e) {
    play(reader.result, document.getElementById('filein').files[0].name);
  };
};

document.getElementById('control').onclick = function() {
  if (bb.midi) {
    if (!bb.dancing) {
      MIDIjs.resume();
      this.innerHTML = '&#10073;&#10073;';
      bb.prog = setInterval(progress, 1000);
      bb.dancing = setInterval(flip, 700);
    } else {
      MIDIjs.pause();
      this.innerHTML = '&#9654;';
      clear();
    }
  }
};

document.getElementById('loop').onclick = function() {
  if (bb.looped) {
    this.style.color = 'rgba(0, 0, 0, 1)';
    this.title = 'loop: off';
  } else {
    this.style.color = 'rgba(0, 0, 0, 0.2)';
    this.title = 'loop: on';
  }
  bb.looped = !bb.looped;
};

let bb = {
  prog: null,
  dancing: null,
  looped: false,
  midi: null,
  dur: 0,
  val: null
};