


document.addEventListener("DOMContentLoaded", function() {

	var button = document.getElementById('settings');
	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('openMenu'); 
	button.addEventListener('click', function() {
		window.open("menu.html");
	});
});
