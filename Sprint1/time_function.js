
document.addEventListener("DOMContentLoaded", function(){

  // This function calculates the time remaining on the clock
  function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date()); // Finds the difference between the current time and the endtime
  var seconds = Math.floor((t / 1000) % 60); // Finds seconds
  var minutes = Math.floor((t / 1000 / 60) % 60); // Finds Minutes
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24); // Finds hours
  var days = Math.floor(t / (1000 * 60 * 60 * 24)); // Finds days
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

// This fucntion initializes the counter
function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  // This function updates the counter and prints the output in a format similar to digital clocks
  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    // Clears counter once time has run out
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

//var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
var button = document.getElementById('start');

button.addEventListener('click', function(){
  var limit = document.getElementById('time').value;

  time = limit.split(":"); // Splits user input into an array
  hour = time[0]; // First element of the array contains the hours
  minute = time[1]; // Second element contains the minutes

  var timeLimit = (hour * 1000 * 60 * 60)+(minute * 1000 * 60); // Convert hour and minutes into milliseconds
  var deadline = new Date(); // Create new Date object 

  deadline.setMilliseconds(timeLimit); // Give deadline the value timeLimit

  initializeClock('clockdiv', deadline);
});
});
