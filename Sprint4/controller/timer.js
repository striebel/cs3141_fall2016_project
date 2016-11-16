// file          : timer.js
// author        : Jacob Striebel
//               : Jacob Woloschek
// last modified : 2016 Nov 15

var intervalID = setInterval(secondElapsed, 1000);

var hoursSpan, minutesSpan, secondsSpan;

function exit()
{
	clearInterval(intervalID);
	alert("Timer elapsed");
	window.close();
}

function setTime(hours, minutes, seconds)
{
	hoursSpan.innerHTML   = ("0" + hours).slice(-2);
	minutesSpan.innerHTML = ("0" + minutes).slice(-2);
	secondsSpan.innerHTML = ("0" + seconds).slice(-2);
}

function getTime()
{
	var hours = hoursSpan.innerHTML;
	var minutes = minutesSpan.innerHTML;
	var seconds = secondsSpan.innerHTML;
	return { "hours": hours, "minutes": minutes, "seconds": seconds };
}

function timerInit()
{
	getTimerStatus(function(timerStatus)
	{
		if (timerStatus == "disabled")
		{
			exit();
		}
		else
		{
			getTimerTime(function(timerTime)
			{
				var secondsRemaining = timerTime[1] - Math.round(new Date().getTime() / 1000);

				if (secondsRemaining <= 0)
				{
					exit();
				}
				else
				{
					var hours = Math.floor(secondsRemaining / 3600);
					secondsRemaining -= hours * 3600;
					var minutes = Math.floor(secondsRemaining / 60);
					var seconds = secondsRemaining - (minutes * 60);

					var clock = document.getElementById("clockdiv");
					hoursSpan = clock.querySelector('.hours');
					minutesSpan = clock.querySelector('.minutes');
					secondsSpan = clock.querySelector('.seconds');

					setTime(hours, minutes, seconds);
				}
			});
		}
	});
}

function secondElapsed()
{
	getTimerStatus(function(timerStatus)
	{	
		if (timerStatus == "disabled") { exit(); }
	});

	var t = getTime();
	if (t.seconds == 0)
	{
		if (t.minutes == 0)
		{
			if (t.hours == 0)
			{
				exit();
			}
			else
			{
				t.hours -= 1;
				t.minutes = 59;
				t.seconds = 59;
			}
		}
		else
		{
			t.minutes -= 1;
			t.seconds = 59;
		}
	}
	else
	{
		t.seconds -= 1;
	}

	setTime(t.hours, t.minutes, t.seconds);
} 

document.addEventListener("DOMContentLoaded", function()
{
	timerInit();
});

/*
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
      startButton.disabled = false;
      timeEntry.disabled = false;
    }
    else if(t.total > 0){
      startButton.disabled = true;
      timeEntry.disabled = true;
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
*/
