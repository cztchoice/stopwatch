$(document).ready(function(){
  //$("#header").editInPlace({});
  $("#header").editInPlace({
    callback: function(unused, enteredText) { return enteredText; },
		show_buttons: true
	});

  var seconds = 0;
  var a = 0;
  var started_at = new Date();
  var now = new Date();
  var button = $("#button");
  var since = $("#since");
  var running = 0; // 1, its running, 0 it's not
  var interval = null;
  var delay = 1000;
  var firstrun = 1;

  button.click(function(){
    if (!running){
      var before = new Date();
      interval = setInterval(function(){
        now = new Date();
        var elapsedTime = (now.getTime() - before.getTime());
        if (elapsedTime > delay)
          seconds += Math.floor(elapsedTime/delay);
        else
          seconds++;
        $("#timer").html(now.clearTime().addSeconds(seconds).toString("HH:mm:ss"));
        before = new Date();
        firstrun = 0;
      }, delay);

      button.removeClass("btn-success");
      button.removeClass("btn-info");
      button.addClass("btn-danger");
      button.html("Stop");
      //since.html("<i><b>since: </b> " + time.clearTime().toString("ddd MMM d, ") + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "</i>");
      since.html("<small><i><b>since:</b> " + started_at.toString("ddd MMM d, HH:mm:ss") + "</i></small>");
      running = 1;
    } else {
      clearInterval(interval);
      button.removeClass("btn-danger");
      if (firstrun){
        button.addClass("btn-success");
        button.html("Fire!");
      } else {
        button.addClass("btn-info");
        button.html("Continue");
      }
      running = 0;
    }
  });
});
