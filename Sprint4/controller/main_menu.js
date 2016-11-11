// file          : main_menu.js
// author        : Jake Mager
//                 Jacob Striebel
// last modified : 2016 Nov 3

function paintMainMenu() 
{
	getBlockStatus(function(blockStatus)
	{
		var noblock   = document.getElementById("no-block");
		var blacklist = document.getElementById("black-list");
		var whitelist = document.getElementById("white-list");
		var blackout  = document.getElementById("black-out");
		var addWeb = document.getElementById("addWebsite");

		var blocktype = document.getElementById("describe-block-type");

		var toggleblock = document.getElementById("toggle-block-type");

		noblock.textContent = "no-block";
		blacklist.textContent = "blacklist";
		whitelist.textContent = "whitelist";
		blackout.textContent = "black-out";

		if (blockStatus == "noblock")
		{
			blocktype.textContent = "no-block: no sites are currently being blocked";
			noblock.textContent = noblock.textContent.toUpperCase();
			blackout.textContent = blackout.textContent.toLowerCase();
		}
		else if (blockStatus == "blacklist")
		{
			blocktype.textContent = "blacklist: you can visit any site that is not on your blacklist";
			blacklist.textContent = blacklist.textContent.toUpperCase();
			noblock.textContent = noblock.textContent.toLowerCase();
			
		}
		else if (blockStatus == "whitelist")
		{
			blocktype.textContent = "whitelist: you can only visit sites on your whitelist";
			whitelist.textContent = whitelist.textContent.toUpperCase();
			blacklist.textContent = blacklist.textContent.toLowerCase();
		}	
		else if (blockStatus == "blackout")
		{
			blocktype.textContent = "black-out: all sites are blocked";
			blackout.textContent = blackout.textContent.toUpperCase();
			whitelist.textContent = whitelist.textContent.toLowerCase();		
		}
		else { console.log("getBlockStatus(): returned the unexpected result: " + blockStatus); }
	});

	getTimerStatus(function(timerStatus)
	{
		var timerenabled  = document.getElementById("timer-on");
		var timerdisabled = document.getElementById("timer-off");

		var timerstatus = document.getElementById("describe-timer-status");

		var toggletimer = document.getElementById("toggle-timer-status");

		timerenabled.textContent = "timer-enabled";
		timerdisabled.textContent = "timer-disabled";

		if (timerStatus == "enabled")
		{
			timerstatus.textContent = "timer-enabled: once the timer has elapsed, block type will switch to no-block";
			timerenabled.textContent = timerenabled.textContent.toUpperCase();
			timerdisabled.textContent = timerdisabled.textContent.toLowerCase();
		}
		else if (timerStatus == "disabled")
		{
			timerstatus.textContent = "timer-disabled: the current block type will remain set indefinitely";
			timerdisabled.textContent = timerdisabled.textContent.toUpperCase();
			timerenabled.textContent = timerenabled.textContent.toLowerCase();
		}
		else { console.log("getTimerStatus(): returned the unexpected result: " + timerStatus); }
	});
}

document.addEventListener("DOMContentLoaded", function()
{
	paintMainMenu();
	
	document.getElementById("toggle-block-type").addEventListener("click", function()
	{
		getBlockStatus(function(blockStatus)
		{
			switch (blockStatus)
			{
				case "noblock":
					setBlacklist(function() { paintMainMenu(); });
					break;
				case "blacklist":
					setWhitelist(function() { paintMainMenu(); });
					break;
				case "whitelist":
					setBlackout(function() { paintMainMenu(); });
					break;
				case "blackout":
					setNoBlock(function() { paintMainMenu(); });
					break;
			}
		});
	});

	document.getElementById("toggle-timer-status").addEventListener("click", function()
	{
		console.log("HERE1");
		getTimerStatus(function(timerStatus)
		{
			console.log("HERE2");
			switch (timerStatus)
			{
				case "enabled":
					setTimerDisabled(function() { paintMainMenu(); });
					break;
				case "disabled":
					setTimerEnabled(function() { paintMainMenu(); });
					break;
				default:
					console.log("getTimerStatus(): returned the unexpected result: " + timerStatus);
			}
		});
	});
});
