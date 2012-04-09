// Mouseover/ Click sound effect- by JavaScript Kit (www.javascriptkit.com)
// Visit JavaScript Kit at http://www.javascriptkit.com/ for full source code

//** Usage: Instantiate script by calling: var uniquevar=createsoundbite("soundfile1", "fallbackfile2", "fallebacksound3", etc)
//** Call: uniquevar.playclip() to play sound
$(function() {
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

var notes4 = "c d e f g a b cs ds fs as bs".split(" ");
var notes5 = "c d e cs ds".split(" ");
notes4 = notes4.map(function(elt) {
    return elt + "4";
});
notes5 = notes5.map(function(elt) {
    return elt + "5";
});
var noteNames = notes4.concat(notes5);
var notes = {};
var keyBindings = {};
noteNames.forEach(function(note) {
    noteObj = new Note(note);
    noteObj.sound = createsoundbite("/piano notes/" + note + ".mp3");
    notes[note] = noteObj;
});

var keys = [97,115,100,102,103,104,106,107,108,59,119,101,116,121,117,111,112];
keys.forEach(function(key, index) {
    keyBindings[key] = notes[noteNames[index]];
});

var whiteEl = document.getElementsByClassName("wkey");
var blackEl = document.getElementsByClassName("bkey");
var position = 0;
document.onkeydown=function(e){
	var e=window.event || e
	var color = 0;
  if(keyBindings(e.charCode)){
    color = 1;
    position = k;
    break;
  }
	if(color == 1) {
		soundsWhite[position].playclip();
		whiteEl[position].style.backgroundColor ="#c1c0c0";
		var t=setTimeout("resetWhiteBackground()",200);
	} else {
		for(var k = 0; k<blackKeyValues.length; k++){
			if(e.charCode === blackKeyValues[k]){
				color = 2;
				position = k;
				break;
			}
		} 
	}
	
	if(color ==2) {
		soundsBlack[position].playclip();
		blackEl[position].style.backgroundColor ="#3d3b3b";
		var t=setTimeout("resetBlackBackground()",200);
	}
}

function resetWhiteBackground(){
	whiteEl[position].style.backgroundColor = "white";
	whiteEl[position].onmouseover = function(){
		this.style.backgroundColor = "#c1c0c0";
	} 
	whiteEl[position].onmouseout = function(){
		this.style.backgroundColor = "white";
	} 
}

function resetBlackBackground(){
	blackEl[position].style.backgroundColor = "black";
	blackEl[position].onmouseover = function(){
		this.style.backgroundColor = "#3d3b3b";
	} 
	blackEl[position].onmouseout = function(){
		this.style.backgroundColor = "black";
	} 
}

});
