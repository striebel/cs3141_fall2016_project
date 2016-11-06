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
			setNoBlock();
			callback("noblock");
		}
		else
		{
			callback(map["blockstatus"]);
		}
	});
}

// Return the blacklist urls to callback in the form of a string "url1~url2~...~urln"
function getBlacklist(callback)
{
	getMap(function(map)
	{
		callback(map["blacklist"]);
	});
}

// returns the whitelist urls in the form "url1~url2~...~urln"
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

// add the string url to the blacklist
function addToBlacklist(url, callback)
{
	getMap(function(map)
	{
		var urlList = map["blacklist"];
		if (urlList == undefined)
		{
			setMap({"blacklist": url}, function()
			{
				if(typeof callback == "function")
					callback();
			});
		}
		else
		{

			if (urlList.indexOf(url) == -1)
			{
				urlList = urlList + "~" + url;
				setMap({"blacklist": urlList}, function()
				{
					if(typeof callback == "function")
						callback();
				});
			}
			else
			{
				if (typeof callback == "function")
					callback();
			}
		}
	});
}

// add the string url to the whitelist
function addToWhitelist(url, callback)
{
	getMap(function(map)
	{
		var urlList = map["whitelist"];
		if (urlList == undefined)
		{
			setMap({"whitelist": url}, function()
			{
				if (typeof callback == "function")
					callback();
			});
		}
		else
		{
			if (urlList.indexOf(url) == -1)
			{
				urlList = urlList + "~" + url;
				setMap({"whitelist": urlList}, function()
				{
					if (typeof callback == "function")
						callback();
				});
			}
			else
			{
				if (typeof callback == "function")
					callback();
			}
		}		
	});
}
