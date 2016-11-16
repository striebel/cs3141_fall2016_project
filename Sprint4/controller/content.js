// file          : content.js 
// author        : Jake Mager
//                 Jacob Striebel
// last modified : 2016 Nov 3

checkBlock();

function performBlock()
{
	document.write("<html>STOP PROCRASTINATING</html>");
	document.close();
}

// Determine if this site ought to be blocked, and if it ought, block it.
function checkBlock()
{
	getBlockStatus(function(blockStatus)
	{
		// Get current URL, then remove everything besides "...second-level-dn.top-level-dn"
		var url = window.location.toString().toLowerCase();
		url = url.replace("http://", "");
		url = url.replace("https://", "");	
		var delIndex = url.indexOf('/');
		if (delIndex != -1)
			url = url.substring(0, delIndex);

		// Remove any third level, and below, domains from the URL so that it is of the form
		// "second-level-dn.top-level-dn
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
				{
					for (var i = 0; i < blacklist.length && blacklist[i] != url; i++)
						;
					if (i < blacklist.length)
						performBlock();
				});
				break;

			case "whitelist":
				getWhitelist(function(whitelist)
				{
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
