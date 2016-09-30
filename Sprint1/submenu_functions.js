document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('item1'); 
	button.addEventListener('click', function() {
		window.open("blacklist.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('item2'); 
	button.addEventListener('click', function() {
		window.open("whitelist.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('item3'); 
	button.addEventListener('click', function() {
		window.open("timer.html");
	});
});

document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('item4'); 
	button.addEventListener('click', function() {
		window.open("daily_timer.html");
	});
});
