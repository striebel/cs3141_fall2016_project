/* whiteList.js */
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
	// Intially load the whiteList
	buildPage();

	document.getElementById("addButton").addEventListener("click", function()
		{
			addToWhitelist(document.getElementById("addText").value, function()
			{
				buildPage();
			});
			document.getElementById("addText").value = "";
			document.getElementById("addText").focus();
		});
	
	
	document.getElementById("removeButton").addEventListener("click", function() {
			getWhitelist(function(whiteList) {
				var wlform = document.getElementById("wlform");
				var amtDeleted = 0;
				for (var i = 0; i < wlform.length; i++) {
					var option = wlform.children[i];
					if (option.value == whiteList[i - amtDeleted] && option.selected) {
						whiteList.splice(i - amtDeleted, 1); 
						saveWhitelist(whiteList);
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

// Load whiteList
function buildPage()
{
	getWhitelist(function(whiteList)	// Enter session to load storage
	{
		var wlform = document.getElementById("wlform");
		wlform.innerHTML = "";
		if (whiteList == undefined || whiteList.length == 0) {
			//currently do nothing
		}
		else {			
			for (var i = 0; i < whiteList.length; i++) {
				var option = document.createElement("option");
				option.text = whiteList[i];
				option.value = whiteList[i]; 
				
				wlform.appendChild(option);	
			}
			
		}	
	});
	document.getElementById("addText").focus();
}
