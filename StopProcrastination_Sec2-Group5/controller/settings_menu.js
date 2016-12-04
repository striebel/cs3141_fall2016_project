// file          : settings_menu.js
// author        : Jacob Striebel
//
// last modified : Wed, 19 Oct 2016

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('blacklistBtn'); 
	button.addEventListener('click', function() {
		window.open("../blacklist/blacklist.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('whitelistBtn'); 
	button.addEventListener('click', function() {
		window.open("../whitelist/whitelist.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('timerBtn'); 
	button.addEventListener('click', function() {
		window.open("../timer/timer.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('dailyTimerBtn'); 
	button.addEventListener('click', function() {
		window.open("../daily_timer/daily_timer.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('todoListBtn'); 
	button.addEventListener('click', function() {
		window.open("../todo/todo.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('helpBtn'); 
	button.addEventListener('click', function() {
		window.open("../help/help.html");
	});
});
