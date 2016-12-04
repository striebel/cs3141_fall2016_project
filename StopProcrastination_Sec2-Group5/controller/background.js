// file          : background.js
// author        : Jacob Striebel
// last modified : 2016 Dec 2 

var intervalID = setInterval(timerEvent, 1000);

var debug = false;

if (debug) console.log("0");

function timerEvent() 
{
	if (debug)console.log("1");	

	getDailyTimer(function(dailyTimer)
	{	
		var dailyTimerIsActive = false;

		getDailyTimerStatus(function(dailyTimerStatus)
		{
			if (dailyTimerStatus == "disabled")
			{
				var date = new Date();
				var currentSecond = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

				var day = -1;

				var startSecond = -1;
				var endSecond   = -1;

				for (var i = 0; i < dailyTimer.length; i++)
				{
					switch (dailyTimer[i].day)
					{
						case "sunday"   : day = 0; break;
						case "monday"   : day = 1; break;
						case "tuesday"  : day = 2; break;
						case "wednesday": day = 3; break;
						case "thursday" : day = 4; break;
						case "friday"   : day = 5; break;
						case "saturday" : day = 6; break;
					}

					startSecond = dailyTimer[i].startHour * 3600 + dailyTimer[i].startMinute * 60;
					endSecond   = dailyTimer[i].endHour   * 3600 + dailyTimer[i].endMinute   * 60;

					if (day == date.getDay() && startSecond <= currentSecond &&
					endSecond > currentSecond)
					{
						dailyTimerIsActive = true;
						break;
					}
				}

				if (debug){
				console.log("intervalDay = "+day);
				console.log("startSecond = "+startSecond);
				console.log("endSecond = "+endSecond);
				console.log("currentDay = "+date.getDay());
				console.log("currentSecond = "+currentSecond);
				console.log("dailyTimerIsActive = "+dailyTimerIsActive);
				}
			}

			if (dailyTimerIsActive || dailyTimerStatus == "enabled")
			{

			if (debug)console.log("IN 1");

				setTimerDisabled(function()
				{

			if (debug)console.log("IN 2");

					setDailyTimerEnabled(function()
					{

			if (debug)console.log("IN 3");


						dailyTimerIsActive = false;

						var date = new Date();
						var currentSecond = date.getHours() * 3600 + date.getMinutes() * 60 +
						                    date.getSeconds();

						var day = -1;

						var startSecond = -1;
						var endSecond   = -1;

						var i;
						for (i = 0; i < dailyTimer.length; i++)
						{
							switch (dailyTimer[i].day)
							{
								case "sunday"   : day = 0; break;
								case "monday"   : day = 1; break;
								case "tuesday"  : day = 2; break;
								case "wednesday": day = 3; break;
								case "thursday" : day = 4; break;
								case "friday"   : day = 5; break;
								case "saturday" : day = 6; break;
							}

							startSecond = dailyTimer[i].startHour * 3600 + dailyTimer[i].startMinute * 60;
							endSecond   = dailyTimer[i].endHour   * 3600 + dailyTimer[i].endMinute   * 60;
							if (day == date.getDay() && startSecond <= currentSecond &&
							endSecond > currentSecond)
							{
								dailyTimerIsActive = true;
								break;
							}
						}

			if (debug)console.log("IN 4");


						if (!dailyTimerIsActive)
						{
							setDailyTimerDisabled(function()
							{
								setNoBlock();
							});
						}
						else
						{

							if (debug)console.log("HERE HERE!!!");

							var blockType = dailyTimer[i].blockType;

							if      (blockType == "blacklist") setBlacklist();
							else if (blockType == "whitelist") setWhitelist();
						}
					});
				});
			}
			else
			{
				getTimerStatus(function(timerStatus)
				{

					if (debug)console.log("2");

					if (timerStatus == "enabled")
					{

						if (debug)console.log("3");

						getTimerTime(function(timerTime)
						{

							if (debug)console.log("4");

							var currentSeconds = Math.round(new Date().getTime() / 1000);
							var stopSeconds = timerTime[1];                                /* timerTime == [ startSecondsSinceTheEpoch, endSecondsSinceTheEpoch ] */
							var remainingSeconds = stopSeconds - currentSeconds

							if (debug) {console.log("currentSeconds: " + currentSeconds);
							console.log("stopSeconds: " + stopSeconds);
							console.log("remainingSeconds: " + remainingSeconds);
							}

							if (remainingSeconds <= 0) /* actually should be <= 0, but 1 is used as insurance to account for inherent inaccuracy of this method */
							{

								console.log("5");

								setTimerDisabled(function()
								{
									console.log("6");

									setNoBlock();
								});
							}
						});
					}
				});
			}
		}); /* end of getDailyTimerStatus(function(dailyTimerStatus) */
	});
}
