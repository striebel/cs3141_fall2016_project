// file          : timer.js
// author        :
// last modified :

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
  var daysSpan = clock.querySelector('.days'); // Returns the value of the first element in the document with class 'days'
  var hoursSpan = clock.querySelector('.hours'); // Returns the value of the first element in the document with class 'hours'
  var minutesSpan = clock.querySelector('.minutes'); // Returns the value of the first element in the document with class 'minutes'
  var secondsSpan = clock.querySelector('.seconds'); // Returns the value of the first element in the document with class 'seconds'

  // This function updates the counter and prints the output in a format similar to digital clocks
  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2); // Sets the html content of daysSpan to the value starting at the second element from the right of '0'+t.hours
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2); // Sets the html content of hoursSpan to the value starting at the second element from the right of '0'+t.minutes
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2); // Sets the html content of secondsSpan to the value starting at the second element from the right of '0'+t.seconds

    // Clears counter once time has run out
    if (t.total <= 0) {
      clearInterval(timeinterval); // Once time is 0 this clears the interval so the counter stops running
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000); // Runs updateCLock function every 1000 milliseconds 
}

var startButton = document.getElementById('start');
var timeEntry = document.getElementById('time');

startButton.addEventListener('click', function(){
  var limit = document.getElementById('time').value;

  time = limit.split(":"); // Splits user input into an array
  hour = time[0]; // First element of the array contains the hours
  minute = time[1]; // Second element contains the minutes

  var timeLimit = (hour * 1000 * 60 * 60)+(minute * 1000 * 60); // Convert hour and minutes into milliseconds
  var deadline = new Date(); // Create new Date object 

  deadline.setMilliseconds(timeLimit); // Give deadline the value timeLimit

  initializeClock('clockdiv', deadline);
});

timeEntry.addEventListener('keyup', function() {
    if(event.keyCode === 13){
    document.getElementById('start').click();
    console.log("test" + event.keyCode)
    var limit = document.getElementById('time').value;

  time = limit.split(":"); // Splits user input into an array
  hour = time[0]; // First element of the array contains the hours
  minute = time[1]; // Second element contains the minutes

  var timeLimit = (hour * 1000 * 60 * 60)+(minute * 1000 * 60); // Convert hour and minutes into milliseconds
  var deadline = new Date(); // Create new Date object 

  deadline.setMilliseconds(timeLimit); // Give deadline the value timeLimit

  initializeClock('clockdiv', deadline);
  }
  //console.log("Key pressed:" + event.keyCode)
});

});
