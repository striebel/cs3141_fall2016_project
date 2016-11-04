// file          : main_menu.js
// author        :
// last modified :


$( document ).ready(function() {

	// Help button listener
	var helpBtn = document.getElementById('help'); 
	helpBtn.addEventListener('click', function() {
		window.open("help.html");
	});
});
