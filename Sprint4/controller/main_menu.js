// file          : main_menu.js
// author        : Jake Mager
//                 Jacob Striebel
// last modified : 2016 Nov 3

function displayStat()
{
	isBlackout(function(isBlack)
	{
		var stat0 = document.getElementById("stat0");
		var stat1 = document.getElementById("stat1");
		if (isBlack)
		{
			stat0.textContent = "Blackout: toggle locked, all sites blocked";
			stat1.textContent = "Change blackout setting by clicking \"Quick Block\"";
		}
		else
		{
			getToggle(function(toggle)
			{
				if (toggle == "noblock")
					stat0.textContent = "NoBlock: no sites are currently being blocked";

				else if (toggle == "whitelist")
					stat0.textContent = "Whitelist: you can only visit sites on your whitelist";
			
				else if (toggle == "blacklist")
					stat0.textContent = "Blacklist: you can visit any site that is not on your blacklist";
				
				else
					console.log("getToggle function failed");

				stat1.textContent = "Click \"Toggle\" to cycle your blocking options";
			});
		}			
	});
}

document.addEventListener("DOMContentLoaded", function()
{
	displayStat();
	document.getElementById("toggle").addEventListener("click", function()
	{
		isBlackout(function(isBlack)
		{
		    if (!isBlack) getToggle(function(toggle)
			{
				if (toggle == "noblock")
					setWhitelist();
				else if (toggle == "whitelist")
					setBlacklist();
				else if (toggle == "blacklist")
					setNoBlock();
				
				displayStat();
			});
		});
	});
});

/*
$( document ).ready(function() {

	// Help button listener
	var helpBtn = document.getElementById('help'); 
	helpBtn.addEventListener('click', function() {
		window.open("help.html");
	});
});
*/
