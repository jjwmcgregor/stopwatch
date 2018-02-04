$(document).ready(function(){

  var intervalMin;
  var $mins = $('#mins');
  var $secs = $('#secs');
  var $ms = $('#ms');
  var bool = false;
  var milliseconds = 0;
  var seconds = 0;
  var minutes = 0;

  function updateTime(){
    milliseconds += 1;
    $ms.html(milliseconds);
    if (milliseconds >= 100) {
      milliseconds = 0;
      seconds += 1;

      // Seconds
      if (seconds < 10) {
        $secs.html( '0' + seconds );
      } else {
        $secs.html(seconds);
      }

      // Minutes
      if (seconds % 60 === 0) {
        seconds = 0;
        minutes++;
        minutes < 10 ? $mins.html('0' + minutes) : $mins.html(minutes);
      }
    }
  }

  $('#startStop').on('click', function(){
    if (!bool) {
      intervalMin = setInterval(updateTime, 10);
      $(this).html('Pause');
      bool = !bool;
    } else {
      clearInterval(intervalMin);
      $(this).html('Start');
      bool = !bool;
    }
  });

  // Get the current time from the display
  $('#saveTime').on('click', () => {
    var log = $('<li>' + $mins.html() + ' : ' + $secs.html() + ' : ' + $ms.html() + '</li>');
    log.addClass('log-items');
    $('#logs').prepend(log);
  });

  // Reset all the values, clear the interval and reset the Start button
  $('#reset').on('click', () => {
    clearInterval(intervalMin);
    bool = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    $mins.html('00');
    $secs.html('00');
    $ms.html('00');
    $('#logs').children().remove();
    if($('#startStop').html() === 'Pause') {
      $('#startStop').html('Start');
    }
  });


});
