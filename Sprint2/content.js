// Get current URL, then remove everything besides *.*
var currentURL = window.location.toString().toLowerCase();
currentURL = currentURL.replace("http://", "");
currentURL = currentURL.replace("https://", "");
currentURL = currentURL.replace("www.", "");
var deleteIndex = currentURL.indexOf('/');
currentURL = currentURL.substring(0, deleteIndex);

// TODO: Import list from blacklist storage
// Temporary List
var tempBlacklist = "ask.com~yahoo.com~youtube.com";
var tempWhitleList = "google.com~hulu.com";

// Check for blackout
var blackoutEnabled2 = true;
function restore_options() {
	chrome.storage.local.get({
			blackoutEnabled: true
		}, function(items) {
		blackoutEnabled2 = items.blackoutEnabled;
	});
}
	restore_options();
	
	var regex = new RegExp(currentURL);
	debugger
	console.log(blackoutEnabled2)

	debugger
	if (blackoutEnabled2 === true) {
		// blackout all
		var whiteList = tempWhitleList.split('~');
		for (var i = 0; i < whiteList.length; i++) {
			if (currentURL.match(whiteList[i])) {
				break;
			}
			else {
				blockWebsite();
			}
		}
	}
	else {
		// Only blackout blackListed sites
		// Estiablish regex to match URLs
		var blackList = tempBlacklist.split('~');
		for (var i = 0; i < blackList.length; i++) {
			if (currentURL.match(blackList[i])) {
				blockWebsite();
			}
		}
	}

// blockWebsite: Change inner HTML of HTML tags to tell the user they can not go to this site
function blockWebsite() {
		var d = new Date();
		var n = d.getFullYear();
		document.getElementsByTagName("html")[0].innerHTML = "<body><center><h1>STOP PROCRASTINATION " + n + "</h1><img src='http://www.mememaker.net/static/images/memes/4467057.jpg' /></center></body>";
}