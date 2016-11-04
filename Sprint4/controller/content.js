// file          : content.js 
// author        :
// last modified :

// Get current URL, then remove everything besides *.*
var currentURL = window.location.toString().toLowerCase();
currentURL = currentURL.replace("http://", "");
currentURL = currentURL.replace("https://", "");
currentURL = currentURL.replace("www.", "");
var deleteIndex = currentURL.indexOf('/');
currentURL = currentURL.substring(0, deleteIndex);


// Check for blackout
function restore_options() {
	chrome.storage.local.get(function(items) {
		block(items.blackoutEnabled, items.blacklist, items.whitelist)
	});
}

function block(blackoutEnabled, blacklist, whitelist) {
	var regex = new RegExp(currentURL);
	if (blackoutEnabled === true) {
		// blackout all
	 	whitelist = whitlelist.split('~');		// Turns whitelist into an array
		var isOnWhiteList = false;
		for (var i = 0; i < whitelist.length; i++) {
			if (currentURL.match(whitelist[i])) {
				isOnWhitelist = true;
				break;
			}
		}
		if (!isOnWhitelist) {
			blockWebsite();
		}
	}
	else {
		// Only blackout blackListed sites
		// Estiablish regex to match URLs
		blacklist = blacklist.split('~');		// Turns blacklist into an array
		for (var i = 0; i < blacklist.length; i++) {
			if (currentURL.match(blacklist[i])) {
				blockWebsite();
				i = blacklist.length;
			}
		}
	}
}

// blockWebsite: Change inner HTML of HTML tags to tell the user they can not go to this site
function blockWebsite() {
		var d = new Date();
		var n = d.getFullYear();
		document.getElementsByTagName("html")[0].innerHTML = "<body><center><h1>STOP PROCRASTINATION " + n + "</h1><img src='http://www.mememaker.net/static/images/memes/4467057.jpg' /></center></body>";
}

restore_options();
