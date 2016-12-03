// file          : model.js
// author        : Jacob Striebel
//               : Jake Mager
// last modified : 2016 Nov 15

//  Return the map of key-value pairs to the callback function
function getMap(callback)
{
	chrome.storage.local.get(function(map)
	{
		callback(map);
	});
}

// Return "noblock", "whitelist", "blacklist", or "blackout" depending on which is set,
// and if none are set, set NoBlock and return "noblock"
function getBlockStatus(callback)
{
	getMap(function(map)
	{
		if (map["blockstatus"] == undefined)
		{
			setNoBlock(function()
			{
				callback("noblock");
			});
		}
		else
		{
			callback(map["blockstatus"]);
		}
	});
}

function getTimerStatus(callback)
{
	getMap(function(map)
	{
		if (map["timerstatus"] == undefined)
		{
			setTimerDisabled(function()
			{
				callback("disabled");
			});
		}
		else
		{
			callback(map["timerstatus"]);
		}
	});
}

function getDailyTimerStatus(callback)
{
	getMap(function(map)
	{
		if (map["dailytimerstatus"] == undefined)
		{
			setDailyTimerDisabled(function()
			{
				callback("disabled");
			});
		}
		else
		{
			callback(map["dailytimerstatus"]);
		}
	});
}

// Return the array of blacklist urls or a new empty array if blacklist has not
// been instantiated
function getBlacklist(callback)
{
	getMap(function(map)
	{
		var bl = map["blacklist"]
		if (bl == undefined)
		{
			bl = [];
			setMap({"blacklist": bl}, function()
			{
				callback(bl);
			});
		}
		else
		{
			callback(bl);
		}
	});
}

// Return the array of whitelist urls or a new empty array if whitlist has not
// yet been instantiated
function getWhitelist(callback)
{
	getMap(function(map)
	{
		var wl = map["whitelist"]
		if (wl == undefined)
		{
			wl = [];
			setMap({"whitelist": wl}, function()
			{
				callback(wl);
			});
		}
		else
		{
			callback(wl);
		}
	});
}

function getDailyTimer(callback)
{
	getMap(function(map)
	{
		var dailyTimer = map["dailyTimer"];
		if (dailyTimer == undefined || dailyTimer.length == undefined) {
			dailyTimer = [];
			setMap({"dailyTimer": dailyTimer}, function ()
			{
				callback(dailyTimer)
			});	
		}
		else {
			callback(dailyTimer);
		}
	});
	
}

function getTimerTime(callback)
{
	getMap(function(map)
	{
		callback(map["timertime"]);
	});
}

//  Add the key value pair object of the form {"key": value} to the map
function setMap(pair, callback)
{
	chrome.storage.local.set(pair, function()
	{
		if(typeof callback == "function")
			callback();
	});
}

// NoBlock means that neither whitelist nor blacklist is turned on
// if blackout is enabled, all sites will still be blocked
function setNoBlock(callback)
{
	setMap({"blockstatus": "noblock"}, function()
	{
		if(typeof callback == "function")
			callback();
	});
}

function setWhitelist(callback)
{
	setMap({"blockstatus": "whitelist"}, function()
	{
		if(typeof callback == "function")
			callback();
	});
}

function setBlacklist(callback)
{
	setMap({"blockstatus": "blacklist"}, function()
	{
		if(typeof callback == "function")
			callback();
	});
}


function setBlackout(callback)
{
	setMap({"blockstatus": "blackout"}, function()
	{
		if(typeof callback == "function")
			callback();
	});
}


function setTimerDisabled(callback)
{
	setMap({"timerstatus": "disabled"}, function()
	{
		if (typeof callback == "function")
			callback();
	});
}

function setDailyTimerDisabled(callback)
{
	setMap({"dailytimerstatus": "disabled"}, function()
	{
		if (typeof callback == "function")
			callback();
	});
}

function setTimerEnabled(callback)
{
	setMap({"timerstatus": "enabled"}, function()
	{
		if (typeof callback == "function")
			callback();
	});
}

function setDailyTimerEnabled(callback)
{
	setMap({"dailytimerstatus": "enabled"}, function()
	{
		if (typeof callback == "function")
			callback();
	});
}

/* time = [startSecondsSinceTheEpoch, endSecondsSinceTheEpoch ] */
function saveTimerTime(time, callback)
{
	setMap({"timertime": time}, function()
	{
		if (typeof callback == "function")
			callback();
	});
}

/* add all intervals in intervalsArray to the dailyTimer array 
 * 
 * interval = {
 *             "day": "monday" or ... or "sunday", 
 *			   "startHour": int,
 *             "startMinute": int,
 *             "endHour": int,
 *             "endMinute": int,
 *             "blockType": "whitelist" or "blacklist"
 *			  }
 */
function addToDailyTimer(intervalsArray, callback)
{
	getMap(function(map)
	{
		var dailyTimer = map["dailyTimer"];

		if (dailyTimer == undefined)
		{
			dailyTimer = [];
		}

		/* remove any intervals from intervalsArray that overlap an interval in dailyTimer */
		for (var i = intervalsArray.length - 1; i >= 0; i--)
			for (var j = 0; j < dailyTimer.length; j++)
			{
				console.log("intervalsArray["+i+"] = "+intervalsArray[i]);
				console.log("dailyTimer["+j+"] = "+dailyTimer[j]);

				var a = intervalsArray[i];
				var b = dailyTimer[j];
				var as = intervalsArray[i].startHour * 60 + intervalsArray[i].startMinute;
				var ae = intervalsArray[i].endHour * 60 + intervalsArray[i].endMinute;
				var bs = dailyTimer[j].startHour * 60 + dailyTimer[j].startMinute;
				var be = dailyTimer[j].endHour * 60 + dailyTimer[j].endMinute;

				if (a.day === b.day && ((as >= bs && as < be) || (ae > bs && ae <= be)))
				{
					alert("An interval that you specified overlaps a pre-existing Daily Timer interval.");
					console.log("DUPLICATE FOUND");
					intervalsArray.splice(i, 1);
					break;
				} else { console.log("NOT DUP"); }
			}

		for (var k = 0; k < intervalsArray.length; k++)
			dailyTimer.push(intervalsArray[k]);	
			
		saveDailyTimer(dailyTimer, function()
		{
			if (typeof callback == "function")
				callback();
		});
	});
}

function deleteFromDailyTimer(interval, callback)
{
	getDailyTimer(function(dailyTimer)
	{	
		dailyTimer.pop(interval);

		saveDailyTimer(dailyTimer, function()
		{
			if (typeof callback == "function")
				callback();
		});
	});
}

// add the string url to the blacklist array
function addToBlacklist(url, callback)
{
	getMap(function(map)
	{
		var urlList = map["blacklist"];
		if (urlList == undefined)
		{
			urlList = [url];
			setMap({"blacklist": urlList}, function()
			{
				if (typeof callback == "function")
					callback();
			});
		}
		else
		{
			for (var i = 0; i < urlList.length && urlList[i] != url; i++)
				;
			if (i == urlList.length)
				urlList.push(url);
			setMap({"blacklist": urlList}, function()
			{
				if (typeof callback == "function")
					callback();
			});
		}
	});
}

// add the string url to the whitelist array
function addToWhitelist(url, callback)
{
	getMap(function(map)
	{
		var urlList = map["whitelist"];
		if (urlList == undefined)
		{
			urlList = [url];
			setMap({"whitelist": urlList}, function()
			{
				if (typeof callback == "function")
					callback();
			});
		}
		else
		{
			for (var i = 0; i < urlList.length && urlList[i] != url; i++)
				;
			if (i == urlList.length)
				urlList.push(url);
			setMap({"whitelist": urlList}, function()
			{
				if (typeof callback == "function")
					callback();
			});
		}
	});
}

// delete the provided url from blacklist
function deleteFromBlacklist(url, callback)
{
	getBlacklist(function(urlList)
	{	
		urlList.pop(url);
		saveBlacklist(urlList, function()
		{
			if (typeof callback == "function")
				callback();
		});
	});
}

// delete the provided url from whitelist
function deleteFromWhitelist(url, callback)
{
	getWhitelist(function(urlList)
	{	
		urlList.pop(url);
		saveWhitelist(urlList, function()
		{
			if (typeof callback == "function")
				callback();
		});
	});
}

function saveBlacklist(blacklist, callback)
{
	setMap({"blacklist": blacklist}, function()
	{
		if (typeof callback == "function")
			callback();
	});
}

function saveWhitelist(whitelist, callback)
{
	setMap({"whitelist": whitelist}, function()
	{
		if (typeof callback == "function")
			callback();
	});
}

function saveDailyTimer(dailyTimer, callback)
{
	setMap({"dailyTimer": dailyTimer}, function()
	{
		if (typeof callback == "function")
			callback();
	});
}

