//TODO: 
//		verify that the URL is valid
//		check for duplicate URL before adding
//		include instructions in HTML
//		make pretty

// Intially load the blacklist
loadBlacklist();


// Load blacklist
function loadBlacklist() {
	chrome.storage.local.get(function(val)	// Enter session to load storage
	{
		var blacklistTextarea = document.getElementById("blacklist");
		var blacklistArray = val.blacklist;	// get blacklist from storge
		
		// if empty
		if (!blacklistArray) {
			blacklistTextarea.innerHTML = "Nothing in blacklist";
			return;
		}
		
		// Make array of blacklist sites
		blacklistArray = blacklistArray.split("~");
			
		// Add each item to the HTML list and 
		for (var i = 0; i < blacklistArray.length; i++) {
			blacklistTextarea.innerHTML = blacklistTextarea.innerHTML + "</br><li>"+blacklistArray[i]+" <img src='http://www.drodd.com/images15/red-											x22.png' id='" + blacklistArray[i] + "' width=15px /></li>";
		}
		
		// End the unordered list
		blacklistTextarea.innerHTML = blacklistTextarea.innerHTML + "</ul>";
		
		// Make delete buttons useful
		loadDeleteBtn(blacklistArray)
		
	});
}

// Finds all IDs of delete buttons and adds eventListerners so they will work
function loadDeleteBtn(item) {
	for (var i = 0; i < item.length; i++) {
		document.getElementById(item[i]).addEventListener('click', function() {
			deleteUrl(this.id);
		});
	}
}

// When a delete button is clicked this function is triggered to actually delete the URL
function deleteUrl(url) {
	chrome.storage.local.get(function(val)	// Enter session to load storage
	{
		var blacklist = val.blacklist
		
		// If the blacklist is now empty, clear it
		if (!blacklist.includes("~")) {
			chrome.storage.local.set({"blacklist": null});
			loadBlacklist();
			return;
		}
		
		// check each position of the URL to be deleted 
		blacklist = blacklist.split("~"+url+"~").join('~');		// middle
		blacklist = blacklist.split(url+"~").join('');			// end
		blacklist = blacklist.split("~"+url).join('');			// front
		
		chrome.storage.local.set({"blacklist": blacklist});
		loadBlacklist();
	});
}

// function to add an item to the blacklist
function addToBlacklist(url)
{
	chrome.storage.local.get(function(val)
	{
		// TODO: add validation HERE
		
 		var str = val.blacklist;
		// if empty, make URL, else append
		if (!str)
			str = url;
		else
			str += "~" + url;	// append using ~ for diameter 
		chrome.storage.local.set({"blacklist": str});
	});
}

// If a website is added (button triggered)
document.getElementById('newBlacklistItemSubmit').addEventListener('click', function(){
		var newSite = document.getElementById('newBlacklistItem').value;	// get value in textbox
		addToBlacklist(newSite);	// call function
		
		// message to say to user that website has been added
		var status = document.getElementById('status');
		status.textContent = 'Website Added!';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
		
		// add the new site to the current blacklist HTML (can't just call loadBlacklist() for some reason)
		var blackList = document.getElementById('blacklist').innerHTML;
		document.getElementById('blacklist').innerHTML = blackList + "</br><li>"+ newSite +" <img src='http://www.drodd.com/images15/red-x22.png' 					id='" + newSite + "' width=15px /></li>";
		document.getElementById(newSite).addEventListener('click', function() {
			deleteUrl(this.id);
		});
		
	});
