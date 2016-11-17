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
		
	document.getElementById("removeButton").addEventListener("click", function() {
			getBlacklist(function(blacklist) {
				var blform = document.getElementById("blform");
				var amtDeleted = 0;
				for (var i = 0; i < blform.length; i++) {
					var option = blform.children[i];
					if (option.value == blacklist[i - amtDeleted] && option.selected) {
						blacklist.splice(i - amtDeleted, 1); 
						saveBlacklist(blacklist);
						amtDeleted++;
					}
				}
				buildPage();
		});
	});
});

//function buildLine(id, website) {
//	return "<label>"+website+"</label> <img name='deleteBtn' src='http://www.drodd.com/images15/red-x22.png' id='" + id + "' width=15px /></li><br />"
//}



// Load blacklist
function buildPage()
{
	getBlacklist(function(blacklist)	// Enter session to load storage
	{
		var blform = document.getElementById("blform");
		blform.innerHTML = "";
		if (blacklist == undefined || blacklist.length == 0) {
			//currently do nothing
		}
		else {			
			for (var i = 0; i < blacklist.length; i++) {
				var option = document.createElement("option");
				option.text = blacklist[i];
				option.value = blacklist[i]; 
				
				blform.appendChild(option);	
			}
			
		}	
	});
}
