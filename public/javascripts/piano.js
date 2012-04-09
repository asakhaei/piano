$(function() {
  var server = "http://localhost";

  $(".wkey").addClass("key");
  $(".bkey").addClass("key");
  $(".key").each(function(index, key) {
      key.note = $(key).attr('id');
  });
  $(".key").click(handleKeyHit);

  function handleKeyHit(e) {
      var key = e.target;
      console.log('emitting ' + key.note);
      socket.emit('note', {note: key.note});
  }

  var socket = io.connect(server);
  socket.on('note', function(msg) {
    console.log('received ' + msg.note);
    soundsWhite[0].playclip();
  });
});
