//TODO: check if any fields are empty first



document.getElementById("enterTimer").addEventListener("click", function() {
	
	//Get start and end time and convert to 24 hour
	var startTime = (document.getElementById("startTimeSelection").value == "am") ? document.getElementById("startTimeHour").value :  parseInt(document.getElementById("startTimeHour").value) + 12;
	startTime = startTime + ":" + document.getElementById("startTimeMinute").value
	var endTime = (document.getElementById("endTimeSelection").value == "am") ? document.getElementById("endTimeHour").value :  parseInt(document.getElementById("endTimeHour").value) + 12;
	endTime = endTime + ":" + document.getElementById("endTimeMinute").value
		
	//Get days that this timer will be added to
	var days = [];
	var getDays1 = document.getElementById("days").children[0].children;	//days in div1
	var getDays2 = document.getElementById("days").children[1].children;	//days in div2
	for (var i = 0; i < getDays1.length; i++) {
		var object = getDays1[i];
		if (object.name = "day" && object.checked) {
			days.push(object.value);
		}
	}
	for (var i = 0; i < getDays2.length; i++) {
		var object = getDays2[i];
		if (object.name = "day" && object.checked) {
			days.push(object.value);
		}
	}
	
	//Get block type
	var blockType = document.getElementById("blockType").value;
	for (var i = 0; i < days.length; i++) {
		addToDailyTimer(days[i], startTime, endTime, blockType);
	}
	buildpage();
});



function buildpage() {
	getDailyTimer(function(dailyTimer)	// Enter session to load storage
	{
		var dtList = document.getElementById("dailyTimerForm");
		dtList.innerHTML = "";
		if (dailyTimer == undefined || dailyTimer.length == 0) {
			//currently do nothing
		}
		else {			
			for (var i = 0; i < dailyTimer.length; i++) {
				var option = document.createElement("option");
				option.text =  dailyTimer[i].blockType + " " + dailyTimer[i].day + " " + dailyTimer[i].startTime + "-" + dailyTimer[i].endTime;
				option.value = i; 
				
				dtList.appendChild(option);	
			}
			
		}	
	});
}

document.addEventListener("DOMContentLoaded", function() {

	buildpage();
	
	document.getElementById("removeButton").addEventListener("click", function() {
			getDailyTimer(function(dailyTimer) {
				var dailytimer = document.getElementById("dailyTimerForm");
				var amtDeleted = 0;
				for (var i = 0; i < dailytimer.length; i++) {
					var option = dailytimer.children[i];
					if (option.selected) {
						dailyTimer.splice(option.value - amtDeleted, 1);
						saveDailyTimer(dailyTimer);
						amtDeleted++;
						buildpage()
					}
				}
		});
	});


});

