/* blacklist.js */
/* Jake Mager */
/* Jacob Striebel */


// Do not make IDs = to a number

//TODO: 
//		verify that the URL is valid
//		check for duplicate URL before adding
//		include instructions in HTML
//		make pretty

var debug = false;

document.addEventListener("DOMContentLoaded", function()
{
	// Intially load the blacklist
	buildPage();


	document.getElementById("addButton").addEventListener("click", function()
		{
			addToBlacklist(document.getElementById("addText").value, function()
			{
				buildPage();
			});
		});
});

function buildLine(id, website) {
	return "<label>"+website+"</label> <img name='deleteBtn' src='http://www.drodd.com/images15/red-x22.png' id='" + id + "' width=15px /></li><br />"
}

function createDeleteBtnListener() {
	for (var i = 0; i < document.getElementsByName("deleteBtn").length; i++) {
		document.getElementById(i).addEventListener('click', function() {
			getBlacklist(function(blacklist)
			{
				i = i - 1;
				blacklist.splice(i, 1);
				console.log(i);
				saveBlacklist(blacklist, function()
				{
					buildPage();
				});	
			});
		});
	}
}

// Load blacklist
function buildPage()
{
	getBlacklist(function(blacklist)	// Enter session to load storage
	{
		if (blacklist == undefined || blacklist.length == 0)
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
			
			if (debug)
			{
				console.log(blarray);
				console.log(blacklist);
			}

			var blhtml = "";
			for (var j = 0; j < blarray.length; j++)
			{
				blhtml += blarray[j];
			}

			document.getElementById("blform").innerHTML = blhtml;
			createDeleteBtnListener();
		}
	});
}
