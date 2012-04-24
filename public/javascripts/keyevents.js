// Mouseover/ Click sound effect- by JavaScript Kit (www.javascriptkit.com)
// Visit JavaScript Kit at http://www.javascriptkit.com/ for full source code

//** Usage: Instantiate script by calling: var uniquevar=createsoundbite("soundfile1", "fallbackfile2", "fallebacksound3", etc)
//** Call: uniquevar.playclip() to play sound

$(function() {
// Local variables
var notes = {}; // map of note names to notes, e.g. {c4: {...}, d4: {...},...}
var keyBindings = {}; // map of keys to notes, e.g. {'a': {...},...}
var noteDivs = {}; // map of note names to divs representing the keys
var socket = io.connect();
var singlePlayer = false;
$("#playmode").click(function(e) {
	if(singlePlayer){
		singlePlayer = false;
		$("#playmode").val('Single Player');
	} else {
		singlePlayer = true;
		$("#playmode").val('Multi Player');
	}
});

$(".wkey").each(initKey);
$(".bkey").each(initKey);
function initKey(index, key) {
  key.note = $(key).attr('id');
  noteDivs[key.note] = $(key);
  $(key).mousedown(function(e) {
    handleNoteHit(notes[this.note]);
  });
  $(key).mouseup(function(e) {
    handleNoteEnd(notes[this.note]);
  });
}

socket.on('note', function(msg) {
	if(!singlePlayer){
		console.log('received ' + msg.note);
		notes[msg.note].sound.playclip();
		noteDivs[msg.note].addClass("remotepressed");
	}
});

socket.on('noteend', function(msg) {
	if(!singlePlayer){
		console.log('received end ' + msg.note);
		noteDivs[msg.note].removeClass("remotepressed");
	}
});


var html5_audiotypes={ //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
	"mp3": "audio/mpeg",
	"mp4": "audio/mp4",
	"ogg": "audio/ogg",
	"wav": "audio/wav"
};

function createsoundbite(sound){
	var html5audio=document.createElement('audio');
	if (html5audio.canPlayType){ //check support for HTML5 audio
		for (var i=0; i<arguments.length; i++){
			var sourceel=document.createElement('source');
			sourceel.setAttribute('src', arguments[i]);
			if (arguments[i].match(/\.(\w+)$/i))
				sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);
			html5audio.appendChild(sourceel);
		}
		html5audio.load();
		html5audio.playclip=function(){
			html5audio.pause();
			html5audio.currentTime = 0;
			html5audio.play();
		};
		return html5audio;
	} else {
		return {
      playclip: function() {
        throw new Error("Your browser doesn't support HTML5 audio unfortunately");
                }
    };
	}
}

function Note(note) {
  this.note = note;
}

var notes4 = "c d e f g a b cs ds fs gs as".split(" ");
var notes5 = "c d e cs ds".split(" ");
notes4 = notes4.map(function(elt) {
    return elt + "4";
});
notes5 = notes5.map(function(elt) {
    return elt + "5";
});
var noteNames = notes4.concat(notes5);
	noteNames.forEach(function(note) {
    noteObj = new Note(note);
    noteObj.sound = createsoundbite("/piano notes/" + note + ".mp3");
    notes[note] = noteObj;
});

var keys4 = ['a','s','d','f','g','h','j',   'w','e','t','y','u']
  , keys5 = ['k','l',';',                   'o','p'];
var keys = keys4.concat(keys5);
keys.forEach(function(key, index) {
    keyBindings[key] = notes[noteNames[index]];
});

$("body").keyup(function(e) {
  var note = getNoteFromEvent(e);
  if(note){
    noteDivs[note.note].removeClass("keydown");
	handleNoteEnd(note);
	}
});

$("body").keydown(function(e) {
  var note = getNoteFromEvent(e);
  if (note) {
	noteDivs[note.note].addClass("keydown");
    handleNoteHit(note);
  }
});

function getNoteFromEvent(e) {
  var key = String.fromCharCode(e.which).toLowerCase();
  if (e.which == 186) {
    key = ';'
  }
  return keyBindings[key];
}

function handleNoteHit(note) {
	if(!singlePlayer){
		console.log('emitting ' + note.note);
		socket.emit('note', {note: note.note});
	}
	note.sound.playclip();
}

function handleNoteEnd(note){
	if(!singlePlayer){
		socket.emit('noteend', {note: note.note});
	}
}

});
