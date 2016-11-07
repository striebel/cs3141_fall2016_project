// file          : model.js
// author        : Jacob Striebel
//               :
// last modified : 2016 Nov 6

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

// Return the array of blacklist urls
function getBlacklist(callback)
{
	getMap(function(map)
	{
		callback(map["blacklist"]);
	});
}

// Return the array of whitelist urls
function getWhitelist(callback)
{
	getMap(function(map)
	{
		callback(map["whitelist"]);
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

function setTimerEnabled(callback)
{
	setMap({"timerstatus": "enabled"}, function()
	{
		if (typeof callback == "function")
			callback();
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
