// file          : model.js
// author        : Jacob Striebel
//               :
// last modified : Wed, 19 Oct 2016

// returns the blacklist urls in the form "url1~url2~...~urln"
function getBlacklist()
{
	var backlist;
	chrome.storage.local.get("blacklist", function(val)
	{
		blacklist = val;
	});
	return blacklist["blacklist"];
}

// returns the whitelist urls in the form "url1~url2~...~urln"
function getWhitelist()
{
	var whitelist;
	chrome.storage.local.get("whitelist", function(val)
	{
		whitelist = val;
	}
	return whitelist["whitelist"];
}

// add the string parameter url to the blacklist
function addToBlacklist(var url)
{
	var str = getBlacklist();
	if (str == undefined)
		str = url;
	else
		str += "~" + url;
	chrome.storage.local.set({"blacklist": str});
}

// add the string parameter url to the whitelist
function addToWhitelist(var url)
{
	var str = getWhitelist();
	if (str == undefined)
		str = url;
	else
		str += "~" + url;
	chrome.storage.local.set({"whitelist": str});
}
