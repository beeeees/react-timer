
$(function() {

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}



var minutes = 0;
var seconds = 58;
var milliseconds = 0;
var hours = 0;
var times = [];
var on = false;
var startSeconds;
var startMilliseconds;


function timerReset(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    hours= 0;
    $(this).parent().parent().find(".minutes").html(minutes);
    $(this).parent().parent().find(".seconds").html(seconds);
    $(this).parent().parent().find(".hours").html(hours);
    var projectName = $(this).parent().parent().find('input[name=project]').val();
    var time = hours + "hr " + minutes + "min";
    $(this).parent().parent().find(".logged_time p").replaceWith('<p>' + projectName + ' = '+ time + '</p>');

}

// var i = 1;
// $( ".add" ).on("click", function () {
//   minutes = 0;
//   seconds = 0;
//   milliseconds = 0;
//   hours= 0;
//   var newRow = $('#row').clone(true);
//   newRow.insertBefore('.minus').attr('id', "row" + i);
//   newRow.attr( "data-timer-id", i);
//   $('.minus').css({"opacity":"1"});
//   newRow.find(".seconds").html(seconds);
//   newRow.find(".minutes").html(minutes);
//   newRow.find(".hours").html(hours);
//   i++;
// });


// $( ".minus" ).on("click", function () {
//   $('.row').last().remove();
//   var rowCount = $('.row').length;
//   if ( rowCount == 1 ) {
//     $('.minus').css({"opacity":"0"});
//   }
// });


$( ".start" ).each(function(index, current) {
  $(current).on("click", function(){
    if(on === false){
      on = true;
      $(this).html("Stop");
      var idName= $(current).parent().parent().attr('id');
      idName = setInterval( function(){
        increaseCounter(index, current);
      }, 1000);

      $(current).parent().parent().attr( "data-timer-id",idName );

    } else {

      on = false;
      $(this).html("Start");

      // Save the time
      var projectName = $('input[name=project]').val();
      var time = hours + "hr " + minutes + "min";
      $(".logged_time p").replaceWith('<p>' + projectName + ' = '+ time + '</p>');

      // Stop
      var stopMilliseconds = clearInterval( $(current).parent().parent().attr( "data-timer-id"));

    }
  });

});


function increaseCounter(index, current){
  if(seconds == 59){
    seconds = 0;
    if(minutes == 59){
      minutes = 0;
      hours += 1;
      } else {
        minutes += 1;
      }
    } else {
      seconds += 1;
    }
  if (hours >= 1) {
    $('.start').parent().parent().find(".hours").addClass('active');
  }
  if (minutes >= 1) {
    $('.start').parent().parent().find(".minutes").addClass('active');
  }
  $(current).parent().parent().find(".minutes").html(minutes);
  $(current).parent().parent().find(".seconds").html(seconds);
  $(current).parent().parent().find(".hours").html(hours);

}


//Reset
$(".reset").click(timerReset);


});



