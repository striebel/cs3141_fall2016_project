//TODO: 
//		verify that the URL is valid
//		check for duplicate URL before adding
//		include instructions in HTML
//		make pretty

var debug = true;

document.addEventListener("DOMContentLoaded", function()
{
	// Intially load the blacklist
	buildPage();

	document.getElementById("delete").addEventListener("click", function()
	{
		getBlacklist(function(blacklist)
		{
			for (var i = blacklist.length - 1; i >= 0; i--)
				if (document.getElementById("" + i).checked == true)
				{
					blacklist.splice(i, 1);
				}

			saveBlacklist(blacklist, function()
			{
				buildPage();
			});	
		});
	});

	document.getElementById("addButton").addEventListener("click", function()
	{
		addToBlacklist(document.getElementById("addText").value, function()
		{
			buildPage();
		});
	});
});

function buildLine(id, website) {
	return "<input type=\"checkbox\" id=\""+id+"\"><label>"+website+"</label><br>"
}

// Load blacklist
function buildPage()
{
	getBlacklist(function(blacklist)	// Enter session to load storage
	{
		if (blacklist == undefined)
		{
			document.getElementById("blform").innerHTML = "Your blacklist is empty<br>";
		}
		else
		{
			var blarray = [];
			
			for (var i = 0; i < blacklist.length; i++)
			{
				blarray.push(buildLine(i, blacklist[i]));
			}

			if (debug) console.log(blarray);

			var blhtml = "";
			for (var j = 0; j < blarray.length; j++)
			{
				blhtml += blarray[j];
			}

			document.getElementById("blform").innerHTML = blhtml;
		}
	});
}
