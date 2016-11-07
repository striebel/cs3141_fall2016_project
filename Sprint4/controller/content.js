// file          : content.js 
// author        : Jake Mager
//                 Jacob Striebel
// last modified : 2016 Nov 3

// blockWebsite: Change inner HTML of HTML tags to tell the user they can not go to this site
function performBlock()
{
	document.write("<html><body><center><h1>STOP PROCRASTINATING</h1></center></body></html>");
	document.close();

	//document.getElementsByTagName("html")[0].innerHTML = 
}

function testBlock()
{
	getBlockStatus(function(blockStatus)
	{
		// Get current URL, then remove everything besides "second-level-dn.top-level-dn"
		var url = window.location.toString().toLowerCase();
		url = url.replace("http://", "");
		url = url.replace("https://", "");	
		var delIndex = url.indexOf('/');
		if (delIndex != -1)
			url = url.substring(0, delIndex);

		// Remove any third level, and below, domains from the URL	
		var temp;	
		var i = 0;
		while (true)
		{
			i = url.indexOf(".");
			temp = url.substring(i + 1);
			if (temp.indexOf(".") == -1)
				break;
			else
				url = temp;
		}




		switch (blockStatus)
		{
			case "noblock":
				break;

			case "blacklist":
				getBlacklist(function(blacklist)
				{console.log(blacklist);
					for (var i = 0; i < blacklist.length && blacklist[i] != url; i++)
						;
					if (i < blacklist.length)
						performBlock();
				});
				break;

			case "whitelist":
				getWhitelist(function(whitelist)
				{console.log(whitelist);
					for (var i = 0; i < whitelist.length && whitelist[i] != url; i++)
						;
					if (i == whitelist.length)
						performBlock();
				});
				break;

			case "blackout":
				performBlock();
				break;

			default:
		}
	});
}

/* hard-coded blacklist and whitelist */

/*
addToWhitelist("mtu.edu", function()
{	
	console.log("mtu.edu added");
	addToWhitelist("weather.gov", function()
	{
		console.log("weather.gov added");
		getWhitelist(function(whitelist)
		{
			console.log("whitelist: " + whitelist);
		});
	});
});

addToBlacklist("wikipedia.org", function()
{
	console.log("wikipedia.org added");
	addToBlacklist("stackoverflow.com", function()
	{
		console.log("stackoverflow.com added");
		getBlacklist(function(blacklist)
		{
			console.log("blacklist: " + blacklist);
		});
	});
});
*/


testBlock();
