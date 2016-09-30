document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('blacklistBtn'); 
	button.addEventListener('click', function() {
		window.open("blacklist.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('whitelistBtn'); 
	button.addEventListener('click', function() {
		window.open("whitelist.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('timerBtn'); 
	button.addEventListener('click', function() {
		window.open("timer.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('dailyTimerBtn'); 
	button.addEventListener('click', function() {
		window.open("daily_timer.html");
	});
});
