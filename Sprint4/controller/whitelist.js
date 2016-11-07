/* whitelist.html */
/* Jake Mager */
/* Jacob Striebel */

var debug = true;

document.addEventListener("DOMContentLoaded", function()
{
	buildPage();

	document.getElementById("delete").addEventListener("click", function()
	{
		getWhitelist(function(whitelist)
		{
			for (var i = whitelist.length - 1; i >= 0; i--)
				if (document.getElementById("" + i).checked == true)
				{
					whitelist.splice(i, 1);
				}

			saveWhitelist(whitelist, function()
			{
				buildPage();
			});	
		});
	});

	document.getElementById("addButton").addEventListener("click", function()
	{
		addToWhitelist(document.getElementById("addText").value, function()
		{
			buildPage();
		});
	});
});

function buildLine(id, website) {
	return "<input type=\"checkbox\" id=\""+id+"\"><label>"+website+"</label><br>"
}

function buildPage()
{
	getWhitelist(function(whitelist)
	{
		if (whitelist == undefined || whitelist.length == 0)
		{
			document.getElementById("wlform").innerHTML = "Your whitelist is empty<br>";
		}
		else
		{
			var wlarray = [];
			
			for (var i = 0; i < whitelist.length; i++)
			{
				wlarray.push(buildLine(i, whitelist[i]));
			}

			if (debug)
			{
				console.log(wlarray);
				console.log(whitelist);
			}

			var wlhtml = "";
			for (var j = 0; j < wlarray.length; j++)
			{
				wlhtml += wlarray[j];
			}

			document.getElementById("wlform").innerHTML = wlhtml;
		}
	});
}
