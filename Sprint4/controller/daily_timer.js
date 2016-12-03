
document.getElementById("enterTimer").addEventListener("click", function()
{
	//Get start and end time and convert to 24 hour
	var startHour = parseInt(document.getElementById("startTimeHour").value);
	if (document.getElementById("startTimeSelection").value == "pm")
		startHour += 12;

	var startMinute = parseInt(document.getElementById("startTimeMinute").value);

	var endHour = parseInt(document.getElementById("endTimeHour").value);
	if (document.getElementById("endTimeSelection").value == "pm")
		endHour += 12;

	var endMinute = parseInt(document.getElementById("endTimeMinute").value);

	if (startHour == undefined || startMinute == undefined ||
	endHour == undefined || endMinute == undefined ||
	isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute))
	{
		alert("Please ensure that one or more days are selected and that all time interval fields are legally filled out.");
	 	return;
	}

	var s = startHour * 60 + startMinute;
	var e = endHour * 60 + endMinute;

	if (s >= e || s < 0 || s > (23 * 60 + 59) || e < 1 || e > (23 * 60 + 59) || 
	Math.round(s) != s || Math.round(e) != e)
	{
		alert("Please ensure that your time interval fields are filled with valid ranges. Non-integer minute fields are not allowed, and your end time must be at least one minute later than your start time.");
		return;
	}
	
	/*	
	var startTime = (document.getElementById("startTimeSelection").value == "am") ? document.getElementById("startTimeHour").value : parseInt(document.getElementById("startTimeHour").value) + 12;
	startTime = startTime + ":" + document.getElementById("startTimeMinute").value
	var endTime = (document.getElementById("endTimeSelection").value == "am") ? document.getElementById("endTimeHour").value : parseInt(document.getElementById("endTimeHour").value) + 12;
	endTime = endTime + ":" + document.getElementById("endTimeMinute").value
	*/
	
	// Get days that this timer will be added to
	var days = [];
	var getDays1 = document.getElementById("days").children[0].children;	//days in div1
	var getDays2 = document.getElementById("days").children[1].children;	//days in div2
	for (var i = 0; i < getDays1.length; i++)
	{
		var object = getDays1[i];
		if (object.name = "day" && object.checked)
		{
			days.push(object.value);
		}
	}
	for (var i = 0; i < getDays2.length; i++)
	{
		var object = getDays2[i];
		if (object.name = "day" && object.checked)
		{
			days.push(object.value);
		}
	}
	
	var blockType = document.getElementById("blockType").value;

	var intervalsArray = [];
	
	for (var i = 0; i < days.length; i++)
		intervalsArray.push({
			"day": days[i],
			"startHour": startHour,
			"startMinute": startMinute,
			"endHour": endHour,
			"endMinute": endMinute,
			"blockType": blockType });

	addToDailyTimer(intervalsArray, function()
	{	
		buildpage();
	});
});

function buildpage()
{
	getDailyTimer(function(dailyTimer)	// Enter session to load storage
	{
		var dtList = document.getElementById("dailyTimerForm");
		dtList.innerHTML = "";
		if (dailyTimer == undefined || dailyTimer.length == 0)
		{
			//currently do nothing
		}
		else
		{			
			for (var i = 0; i < dailyTimer.length; i++)
			{
				var option = document.createElement("option");
				var dti = dailyTimer[i];
				option.text =  dti.blockType + " " + dti.day + " " + dti.startHour + ":" + ("0" + dti.startMinute).slice(-2) + "-" + dti.endHour + ":" + ("0" + dti.endMinute).slice(-2);
				option.value = i; 
				
				dtList.appendChild(option);	
			}
		}	
	});
}

document.addEventListener("DOMContentLoaded", function()
{
	buildpage();
	
	document.getElementById("removeButton").addEventListener("click", function()
	{
		getDailyTimer(function(dailyTimer)
		{
			var dailytimer = document.getElementById("dailyTimerForm");

			for (var i = dailyTimer.length - 1; i >= 0; i--)
			{
				var option = dailytimer.children[i];
				if (option.selected)
				{
					dailyTimer.splice(i, 1);
				}
			}

			saveDailyTimer(dailyTimer, function()
			{
				buildpage();
			});
		});
	});
});
