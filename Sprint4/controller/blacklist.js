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
			document.getElementById("addText").value = "";
			document.getElementById("addText").focus();
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
	
	//When entered is pushed and focus on addText is present
	$("#addText").keyup(function(event){
		if(event.keyCode == 13){
			$("#addButton").click();
		}
	});
	
});

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
	document.getElementById("addText").focus();
}
