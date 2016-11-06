// file          : blackout.js
// author        : Collin Bernard
//               : Jacob Striebel
// last modified : 2016 Nov 3
// note          : I've modified the blackout controller to manipulate
//                 chrome.storage.local through the model
//                 -Jacob

function displayStatus(isBlack)
{
	var stat = document.getElementById("status");
	if (isBlack)
		stat.textContent = "Blackout Enabled";
	else
		stat.textContent = "Blackout Disabled";
}

document.addEventListener("DOMContentLoaded", function()
{
	isBlackout(function(isBlack)
	{
		document.getElementById("blackout").checked = isBlack;
		displayStatus(isBlack);
	});
	
	document.getElementById("save").addEventListener("click", function()
	{	
		var isBlack = document.getElementById("blackout").checked;
		setBlackout(isBlack);
		displayStatus(isBlack);
	});
});

/*
// Saves options to chrome.storage
function save_options()
{
	var blackout = document.getElementById('blackout').checked;
	
	chrome.storage.local.set({blackoutEnabled: blackout}, function()
	{
		// Update status to let user know options were saved.
		var status = document.getElementById('status');

		status.textContent = 'Options saved.';

		setTimeout(function() { status.textContent = ''; }, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options()
{
	chrome.storage.local.get({blackoutEnabled: true}, function(items)
	{
		document.getElementById('blackout').checked = items.blackoutEnabled;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
*/
