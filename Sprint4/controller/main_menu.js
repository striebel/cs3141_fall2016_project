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

		var blocktype = document.getElementById("describe-block-type");

		var toggleblock = document.getElementById("toggle-block-type");

		var timeron  = document.getElementById("timer-on");
		var timeroff = document.getElementById("timer-off");

		var timerstatus = document.getElementById("describe-timer-status");

		var toggletimer = document.getElementById("toggle-timer-status");

		noblock.textContent = "no-block";
		blacklist.textContent = "blacklist";
		whitelist.textContent = "whitelist";
		blackout.textContent = "black-out";

		timeron.textContent = "timer-enabled";
		timeroff.textContent = "timer-disabled";

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
		else { console.log("getBlockStatus(): failed"); }

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
});
