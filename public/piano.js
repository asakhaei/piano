$(function() {
    $(".wkey").addClass("key");
    $(".bkey").addClass("key");
    $(".key").each(function(index, key) {
        key.note = key.attr('id');
    });
    $(".key").click(handleKeyHit);

    function handleKeyHit(e) {
        var key = e.target;
        alert("Played key " + key.note);
    }
});
