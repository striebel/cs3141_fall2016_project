// file          : content.js 
// author        : Jake Mager
//                 Jacob Striebel
// last modified : 2016 Nov 3

// blockWebsite: Change inner HTML of HTML tags to tell the user they can not go to this site
function performBlock()
{
	document.write("<html><body><center><h1>STOP PROCRASTINATING</h1></center></body></html>");
	document.close();

	/*
	var d = new Date();
	var n = d.getFullYear();
	document.getElementsByTagName("html")[0].innerHTML = 
"<body><center><h1>STOP PROCRASTINATION " + n + "</h1><img src='http://www.mememaker.net/static/images/memes/4467057.jpg' /></center></body>";*/
}

function testBlock()
{
	isBlackout(function(isBlack)
	{
		if (isBlack)
			performBlock();
	});

	getToggle(function(toggle)
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

		console.log(url);

		if (toggle == "noblock")
		{
			return;
		}
		else if (toggle == "whitelist")
		{
			getWhitelist(function(whitelist)
			{
				whitelist = "dummy~" + whitelist;
				var wl = whitelist.split("~"); // Turn whitelist into an array
				var i;
				var onWhitelist
				for (i = 0; i < wl.length; i++)
				{
					console.log("wl.length: " + wl);
					console.log("wl string: " + whitelist);
					console.log("Whitelist: " + wl[i]);			

					if (url == wl[i])
					{
						console.log(wl[i]);
						onWhitelist = true;
						break;
					}
				}
				if (!onWhitelist)
					performBlock();
			});
		}
		else if (toggle == "blacklist")
		{
			getBlacklist(function(blacklist)
			{
				blacklist = "dummy~" + blacklist;
				var bl = blacklist.split("~"); // Turn blacklist into an array
				var i;
				for (i = 0; i < bl.length; i++)
				{
					console.log("Blacklist: " + bl[i]);

					if (url == bl[i])
					{
						performBlock();
						break;
					}
				}
			});
		}
	});
}

addToWhitelist("mtu.edu", function()
{	
	console.log("mtu.edu added");
	addToWhitelist("weather.gov", function()
	{
		console.log("weather.gov added");
		getWhitelist(function(whitelist)
		{
			console.log("main wl: " + whitelist);
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
			console.log("main bl: " + blacklist);
		});
	});
});



testBlock();
