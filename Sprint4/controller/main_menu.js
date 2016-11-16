// file          : main_menu.js
// author        : Jacob Striebel 
//               : Jake Mager
// last modified : 2016 Nov 15

var no_block;
var blacklist;
var whitelist;
var blackout;

var no_block_msg  = "No-Block: No site is blocked.";
var blacklist_msg = "Blacklist: Exactly sites on your blacklist are blocked.";
var whitelist_msg = "Whitelist: Exactly sites on your whitelist are not blocked.";
var blackout_msg  = "Blackout: All sites are blocked.";

var timer_enabled_msg  = "Timer Enabled: The current block type will persist until either the timer has expired or the timer is cancelled.";
var timer_disabled_msg = "Timer Disabled: The current block type will persist indefinitely.";

var timer_on_HTML  = "" +
				"<button id = \"view-timer-btn\" class = \"btn\">View Timer</button><br>" +
                "<button id = \"cancel-timer-btn\" class = \"btn\">Cancel Timer</button><br>" +
                "<label id = \"block-type-label\"></label><br>" + 
                "<label id = \"timer-status-label\"></label>";
var timer_off_HTML = "<button id = \"set-timer-btn\" class = \"btn\">Set Timer</button> <br> <label id = \"block-type-label\"></label><br><label id = \"timer-status-label\"></label>";

/*
 * Change ">>> btn-txt <<<" to "btn-txt" for the currently marked button.
 * The the currently marked button is the button that maps to the blocking
 * type that was enabled immediately preceeding the blocking type that was
 * just selected.
 * Blocking types are:
 * --> No-Block
 * --> Blacklist
 * --> Whitelist
 * --> Blackout
 */
function clear()
{
	var btns = [];
	btns.push(no_block);
	btns.push(blacklist);
	btns.push(whitelist);
	btns.push(blackout);
	
	for (var i = 0; i < 4; i++)
	{
		var cur = btns[i].innerHTML;

		if (cur.substring(0, 4) == "&gt;") /* "&gt;" is the html escape for '>' */
		{
			btns[i].innerHTML = cur.substring(13, cur.length - 13);
		}
	}
}

/* 
 * Refer to the clear() function's description
 */
function mark(btn)
{
	btn.innerHTML = ">>> " + btn.innerHTML + " <<<"
}

function paintMainMenu() 
{
	getBlockStatus(function(blockStatus)
	{
		var blocktype = document.getElementById("block-type-label");

		getTimerStatus(function(timerStatus)
		{
			var timerEnabled = false;
			if (timerStatus == "enabled")
				timerEnabled = true;

			if (blockStatus == "noblock")
			{
				clear();
				mark(no_block);
				blocktype.innerHTML = no_block_msg;
			}
			else if (blockStatus == "blacklist")
			{
				clear();
				mark(blacklist);
				blocktype.textContent = blacklist_msg;
			}
			else if (blockStatus == "whitelist")
			{
				clear();
				mark(whitelist);
				blocktype.textContent = whitelist_msg;
			}	
			else if (blockStatus == "blackout")
			{
				clear();
				mark(blackout);
				blocktype.textContent = blackout_msg;
			}
			else
			{
				console.log("getBlockStatus(): returned the unexpected result: " + blockStatus);
			}



			var timerStatusLabel = document.getElementById("timer-status-label");

			if (timerStatus == "enabled")
			{
				timerStatusLabel.textContent = timer_enabled_msg;
			}
			else if (timerStatus == "disabled")
			{
				timerStatusLabel.textContent = timer_disabled_msg;
			}
			else
			{
				console.log("getTimerStatus(): returned the unexpected result: " + timerStatus);
			}

		});
	});
}

function paintTimerOff()
{
	document.getElementById("div-1-right").innerHTML = timer_off_HTML;
	document.getElementById("set-timer-btn").addEventListener("click", function()
	{
		var time = prompt("Set the timer duration (HH:MM:SS)", "HH:MM:SS");
		if (time != null)
		{
			var hours   = parseInt(time.substr(0,2));
			var minutes = parseInt(time.substr(3,2));
			var seconds = parseInt(time.substr(6,2));
	
			if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
                hours > 99 || minutes > 59 || seconds > 59)
			{
				alert("<" + time + "> is not a valid time specification");
			}
			else
			{
				alert("You've specified a timer duration of\nhours: <" + hours + ">\nminutes: <" + minutes + ">\nseconds: <" + seconds + ">");

				var startSeconds = Math.round(new Date().getTime() / 1000);			
				var endSeconds = startSeconds + (hours * 3600) + (minutes * 60) + seconds;

				setTimerEnabled(function()
				{
					saveTimerTime([startSeconds, endSeconds], function()
					{	
						paintMainMenu();
						runBackgroundTimer();
						window.open("../timer/timer.html");
					});
				});
			}
		}
	});
}

function paintTimerOn()
{
	document.getElementById("div-1-right").innerHTML = timer_on_HTML;

	document.getElementById("cancel-timer-btn").addEventListener("click", function()
	{
		if (confirm("Confirm: cancel timer and switch to No-Block"))
			setTimerDisabled(function()
			{
				setNoBlock(function()
				{
					paintTimerOff();
					paintMainMenu();
				});
			});
	});

	document.getElementById("view-timer-btn").addEventListener("click", function()
	{
		window.open("../timer/timer.html");
	});
}

/*
 *   Entry point of execution
 *
 */
document.addEventListener("DOMContentLoaded", function()
{
	no_block  = document.getElementById("no-block-btn");
	blacklist = document.getElementById("blacklist-btn");
	whitelist = document.getElementById("whitelist-btn");
	blackout  = document.getElementById("blackout-btn");

	no_block.addEventListener("click", function()
	{
		getTimerStatus(function(timerStatus)
		{
			if (timerStatus == "disabled")
			{
				setNoBlock(function() { paintMainMenu(); });
			}
			else
			{
				getBlockStatus(function(blockStatus)
				{
					alert("\"" + blockStatus + "\" will persist until either the timer has elapsed " +
                          "or the timer is cancelled.");
				});
			}
		});
	});

	blacklist.addEventListener("click", function()
	{
		getTimerStatus(function(timerStatus)
		{
			if (timerStatus == "disabled")
			{
				setBlacklist(function() { paintMainMenu(); });
			}
			else
			{
				getBlockStatus(function(blockStatus)
				{
					alert("\"" + blockStatus + "\" will persist until either the timer has elapsed " +
                          "or the timer is cancelled.");
				});
			}
		});
	});

	whitelist.addEventListener("click", function()
	{
		getTimerStatus(function(timerStatus)
		{
			if (timerStatus == "disabled")
			{
				setWhitelist(function() { paintMainMenu(); });
			}
			else
			{
				getBlockStatus(function(blockStatus)
				{
					alert("\"" + blockStatus + "\" will persist until either the timer has elapsed " +
                          "or the timer is cancelled.");
				});
			}
		});
	});

	blackout.addEventListener("click", function()
	{
		getTimerStatus(function(timerStatus)
		{
			if (timerStatus == "disabled")
			{
				setBlackout(function() { paintMainMenu(); });
			}
			else
			{
				getBlockStatus(function(blockStatus)
				{
					alert("\"" + blockStatus + "\" will persist until either the timer has elapsed " +
                          "or the timer is cancelled.");
				});
			}
		});
	});

	getTimerStatus(function(timerStatus)
	{
		if (timerStatus == "disabled")
		{
			paintTimerOff();
		}
		else
		{
			paintTimerOn();
		}
	});

	paintMainMenu();
});
