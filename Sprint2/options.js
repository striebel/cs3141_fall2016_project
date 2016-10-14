// Saves options to chrome.storage
function save_options() {
	var blackout = document.getElementById('blackout').checked;
	chrome.storage.local.set({
		blackoutEnabled: blackout
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.local.get({
		blackoutEnabled: true
	}, function(items) {
		document.getElementById('blackout').checked = items.blackoutEnabled;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
