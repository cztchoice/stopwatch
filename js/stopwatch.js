$(document).ready(function(){
  //$("#header").editInPlace({});
  $("#header").editInPlace({
    callback: function(unused, enteredText) { return enteredText; },
		show_buttons: true
	});

  //var seconds = 0;
  //var milliseconds = 0;
  var a = 0;
  var started_at = new moment();
  var now = new moment();
  var button = $("#button");
  var since = $("#since");
  var reset = $("#reset");
  var running = 0; // 1, its running, 0 it's not
  var interval = null;
  var delay = 100;
  var firstrun = 1;
  var count_time = 0;
  var timer_string = null;
  var default_timer_string = "00:00:00.0";

  button.click(function(){
    if (!running){
      var before = new moment();
      interval = setInterval(function(){
        now = new moment();
        //var elapsedTime = (now.getTime() - before.getTime());
        var elapsedTime = now.diff(before);
        count_time += elapsedTime;

        timer_string = moment(count_time).utc().format("HH:mm:ss.S")

        $("#timer").html(timer_string);
        before = new moment();
        firstrun = 0;
      }, delay);
      if(firstrun){
        started_at = new moment();
      }
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
  reset.click(function(){
    clearInterval(interval);
    running = 0;
    count_time = 0;
    firstrun = 1
    $("#timer").html(default_timer_string);
    button.addClass("btn-success");
    button.addClass("btn-info");
    button.removeClass("btn-danger");
    button.html("Startwatch!");
    //since.html("<i><b>since: </b> " + time.clearTime().toString("ddd MMM d, ") + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + "</i>");
    since.html("<small><i>press startwatch to start count!</i></small>");
  });
});
