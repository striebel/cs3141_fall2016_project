// file          : main_menu.js
// author        : Jacob Striebel 
//               : Jake Mager
// last modified : 2016 Nov 15

var no_block;
var blacklist;
var whitelist;
var blackout;

var no_block_msg  = "no-block: no sites are currently being blocked";
var blacklist_msg = "blacklist: you can visit any site that is not on your blacklist";
var whitelist_msg = "whitelist: you can only visit sites on your whitelist";
var blackout_msg  = "black-out: all sites are blocked";

var timer_enabled_msg  = "timer enabled: the current block type will persist until either the timer has expired or the timer is cancelled";
var timer_disabled_msg = "timer disabled: the current block type will persist indefinitely";

//var timer_on_HTML  = 
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

function paintMainMenu(prev_blocktype) 
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
				/* Allow the button to be clicked only if the timer is disabled
				 * or if the button is already the blocktype. */
				if (!timerEnabled || prev_blocktype == blocktype)
				{
					clear();
					mark(no_block);
					blocktype.innerHTML = no_block_msg;
				}
			}
			else if (blockStatus == "blacklist")
			{
				if (!timerEnabled || prev_blocktype == blocktype)
				{
					clear();
					mark(blacklist);
					blocktype.textContent = blacklist_msg;
				}
			}
			else if (blockStatus == "whitelist")
			{
				if (!timerEnabled || prev_blocktype == blocktype)
				{
					clear();
					mark(whitelist);
					blocktype.textContent = whitelist_msg;
				}
			}	
			else if (blockStatus == "blackout")
			{
				if (!timerEnabled || prev_blocktype == blocktype)
				{
					clear();
					mark(blackout);
					blocktype.textContent = blackout_msg;
				}
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
		
	});
}

function paintTimerOn()
{
	document.getElementById("div-1-left").innerHTML = timer_on_HTML;
}

document.addEventListener("DOMContentLoaded", function()
{
	no_block  = document.getElementById("no-block-btn");
	blacklist = document.getElementById("blacklist-btn");
	whitelist = document.getElementById("whitelist-btn");
	blackout  = document.getElementById("blackout-btn");
	
	no_block.addEventListener("click", function()
	{
		setNoBlock(function() { paintMainMenu(no_block); });
	});

	blacklist.addEventListener("click", function()
	{
		setBlacklist(function() { paintMainMenu(blacklist); });
	});

	whitelist.addEventListener("click", function()
	{
		setWhitelist(function() { paintMainMenu(whitelist); });
	});

	blackout.addEventListener("click", function()
	{
		setBlackout(function() { paintMainMenu(blackout); });
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
