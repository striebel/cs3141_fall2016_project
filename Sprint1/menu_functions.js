


document.addEventListener("DOMContentLoaded", function() {

	// Created button that, when clicked, opens a new tab in chrome
	var button = document.getElementById('openMenu'); 
	button.addEventListener('click', function() {
		window.open("menu.html");
	});
});
