// file          : main_menu.js
// author        : Jacob Striebel 
//               : Jake Mager
// last modified : 2016 Dec 2 

var no_block;
var blacklist;
var whitelist;
var blackout;

var no_block_msg  = "No-Block: No site is blocked.";
var blacklist_msg = "Blacklist: Exactly sites on your blacklist are blocked.";
var whitelist_msg = "Whitelist: Exactly sites on your whitelist are not blocked.";
var blackout_msg  = "Blackout: All sites are blocked.";

var timer_enabled_msg  = "Timer Enabled: The current block type will persist until either the timer has expired or the timer is cancelled.";
var timer_disabled_msg = "Timer Disabled: The current block type will persist until you change it manually.";
var daily_timer_enabled_msg = "Daily Timer Interval Active: The current block type will persist until the daily interval has elapsed.";

var timer_on_HTML  = "" +
				"<button id = \"view-timer-btn\" class = \"btn\">View Timer</button><br>" +
                "<button id = \"cancel-timer-btn\" class = \"btn\">Cancel Timer</button><br>" +
                "<label id = \"block-type-label\"></label><br>" + 
                "<label id = \"timer-status-label\"></label>";
var timer_off_HTML = "<button id = 'set-timer-btn' class = 'btn'>Set Timer</button> <br> <label id = 'block-type-label'></label><br><label id = 'timer-status-label'></label>";

var set_time = "<div class='time'><div class='stackTime'>HR <br /><input class='timeInput' placeholder='0' type='text' id='setTimeHour' />:</div><div class='stackTime'>MIN<br /> <input class='timeInput' placeholder='15' type='text' id='setTimeMin' /></div></div><input type='submit' id='setTime' value='Set' />"

var set_time_with_seconds =
"<div class='time'>"+
	"<div class='stackTime'>"+
		"HR <br />"+
		"<input class='timeInput' placeholder='00' type='text' id='setTimeHour' />:"+
	"</div>"+
	"<div class='stackTime'>"+
		"MIN<br />"+
		"<input class='timeInput' placeholder='00' type='text' id='setTimeMin' />:"+
	"</div>"+
	"<div class='stackTime'>"+
		"SEC<br />"+
		"<input class='timeInput' placeholder='10' type='text' id='setTimeSec' />"+
	"</div>"+
"</div>"+
"<input type='submit' id='setTime' value='Set' />"


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
				getDailyTimerStatus(function(dailyTimerStatus)
				{
					if (dailyTimerStatus == "enabled")
					{
						timerStatusLabel.textContent = daily_timer_enabled_msg;
					}
					else
					{
						timerStatusLabel.textContent = timer_disabled_msg;
					}
				});
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
		getDailyTimerStatus(function(dailyTimerStatus)
		{
			if (dailyTimerStatus == "enabled")
			{
				alert("The basic timer cannot be set when an interval timer is active.");
				return;
			}


			var rightDiv = document.getElementById("div-1-right");

			rightDiv.innerHTML = set_time_with_seconds;
			
			document.getElementById("setTime").addEventListener("click", function()
			{
				var hour = parseInt(document.getElementById("setTimeHour").value);
				var minute = parseInt(document.getElementById("setTimeMin").value);
				var second = parseInt(document.getElementById("setTimeSec").value);
	
				//TODO: make function so this is not written so poorly
				if (isNaN(hour) && isNaN(minute) && isNaN(second))
				{
					hour = 0;
					minute = 0;
					second = 10;
					var startSeconds = Math.round(new Date().getTime() / 1000);			
					var endSeconds = startSeconds + (hour * 3600) + (minute * 60) + second;

					setTimerEnabled(function()
					{
						saveTimerTime([startSeconds, endSeconds], function()
						{	
							paintMainMenu();
							paintTimerOn();





						});
					});
				}
				else if (isNaN(hour) || isNaN(minute) || isNaN(second) || hour > 99 || hour < 0 || minute > 59 || minute < 0 || second > 59 || second < 0)
				{
					rightDiv.innerHTML = "Invalid Time";
				}
				else
				{
					var startSeconds = Math.round(new Date().getTime() / 1000);
					var endSeconds = Math.round(startSeconds + (hour * 3600) + (minute * 60) + second);

					setTimerEnabled(function()
					{
						saveTimerTime([startSeconds, endSeconds], function()
						{
							paintMainMenu();
							paintTimerOn();

	

						});
					});
				}
			});
		});
	});
}

function paintTimerOn()
{
/*		document.getElementById("div-1-right").innerHTML = "<iframe style='padding-top:0px; margin-top:-5px; height:70px; border: none;' src='../timer/timer.html' id='iframe'></iframe><br />"+
		"<button id = 'cancel-timer-btn' class = 'btn'>Cancel Timer</button><br />" +
		"<label id= 'block-type-label'></label><br />"+
		"<label id= 'timer-status-label'></label>";
*/

	document.getElementById("div-1-right").innerHTML =
	"<div style='padding-top:0px; margin-top:-5px; height:50px; border: none;' id='frame'>"+
	"Time Remaining <div id='clockdiv'> <span id='hrb'>00</span> : <span id='minb'>00</span> : <span id='secb'>00</span> </div>"+
	"</div><br />"+
		"<button id = 'cancel-timer-btn' class = 'btn'>Cancel Timer</button><br />" +
		"<label id= 'block-type-label'></label><br />"+
		"<label id= 'timer-status-label'></label>";



	intervalID = setInterval(secondElapsed, 1000);
	timerInit();

	document.getElementById("cancel-timer-btn").addEventListener("click", function()
	{
		setTimerDisabled(function() {
			setNoBlock(function() {
				paintTimerOff();
				paintMainMenu();
			});
		});
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
			getDailyTimerStatus(function(dailyTimerStatus)
			{
				if (timerStatus == "disabled" && dailyTimerStatus == "disabled")
				{
					setNoBlock(function() { paintMainMenu(); });
				}
				else
				{
					alert("The block-type cannot be altered while a timer is active.");
				}
/*
				else if (timerStatus == "enabled")
				{
					getBlockStatus(function(blockStatus)
					{
						document.getElementById("block-type-label").innerHtml = blockStatus +  "will persist until either the timer has elapsed or the timer is cancelled";
					});
				}
				else if (dailyTimerStatus == "enabled")
				{
					getBlockStatus(function(blockStatus)
					{
						document.getElementById("block-type-label").innerHtml = blockStatus +  "will persist until the currently active daily timer interval has elapsed";
					});
				}
				else
				{
					console.log("Error");
				}
*/
			});
		});
	});

	blacklist.addEventListener("click", function()
	{
		getTimerStatus(function(timerStatus)
		{
			getDailyTimerStatus(function(dailyTimerStatus)
			{
				if (timerStatus == "disabled" && dailyTimerStatus == "disabled")
				{
					setBlacklist(function() { paintMainMenu(); });
				}
				else
				{
					alert("The block-type cannot be altered while a timer is active.");
				}
/*
				else if (timerStatus == "enabled")
				{
					getBlockStatus(function(blockStatus)
					{
						document.getElementById("block-type-label").innerHtml = blockStatus +  "will persist until either the timer has elapsed or the timer is cancelled";
					});
				}
				else if (dailyTimerStatus == "enabled")
				{
					getBlockStatus(function(blockStatus)
					{
						document.getElementById("block-type-label").innerHtml = blockStatus +  "will persist until the currently active daily timer interval has elapsed";
					});
				}
				else
				{
					console.log("Error");
				}
*/
			});
		});
	});

	whitelist.addEventListener("click", function()
	{
		getTimerStatus(function(timerStatus)
		{
			getDailyTimerStatus(function(dailyTimerStatus)
			{
				if (timerStatus == "disabled" && dailyTimerStatus == "disabled")
				{
					setWhitelist(function() { paintMainMenu(); });
				}
				else
				{
					alert("The block-type cannot be altered while a timer is active.");
				}
/*
				else if (timerStatus == "enabled")
				{
					getBlockStatus(function(blockStatus)
					{
						document.getElementById("block-type-label").innerHtml = blockStatus +  "will persist until either the timer has elapsed or the timer is cancelled";
					});
				}
				else if (dailyTimerStatus == "enabled")
				{
					getBlockStatus(function(blockStatus)
					{
						document.getElementById("block-type-label").innerHtml = blockStatus +  "will persist until the currently active daily timer interval has elapsed";
					});
				}
				else
				{
					console.log("Error");
				}
*/
			});
		});
	});

	blackout.addEventListener("click", function()
	{
		getTimerStatus(function(timerStatus)
		{
			getDailyTimerStatus(function(dailyTimerStatus)
			{
				if (timerStatus == "disabled" && dailyTimerStatus == "disabled")
				{
					setBlackout(function() { paintMainMenu(); });
				}
				else
				{
					alert("The block-type cannot be altered while a timer is active.");
				}
/*
				else if (timerStatus == "enabled")
				{
					getBlockStatus(function(blockStatus)
					{
						document.getElementById("block-type-label").innerHtml = blockStatus +  "will persist until either the timer has elapsed or the timer is cancelled";
					});
				}
				else if (dailyTimerStatus == "enabled")
				{
					getBlockStatus(function(blockStatus)
					{
						document.getElementById("block-type-label").innerHtml = blockStatus +  "will persist until the currently active daily timer interval has elapsed";
					});
				}
				else
				{
					console.log("Error");
				}
*/
			});
		});
	});

	getTimerStatus(function(timerStatus)
	{
		if (timerStatus == "disabled")
		{
			paintTimerOff();
		}
		else if (timerStatus == "enabled")
		{
			paintTimerOn();
		}
		else
		{
			console.log("getTimerStatus() in main_menu.js failed");
		}
	});

	paintMainMenu();
});
