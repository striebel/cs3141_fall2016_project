// file          : background.js
// author        : Jacob Striebel
// last modified : 2016 Nov 15

var intervalID;

function runBackgroundTimer()
{
	alert("Background Here!");

	intervalID = setInterval(checkForTimerElapsed, 1000);
}

function cancelBackgroundTimer()
{
	cancelInterval(intervalID);
}

function checkForTimerElapsed()
{   
    getTimerStatus(function(timerStatus)
    {
        if (timerStatus == "enabled")
        {
            getTimerTime(function(timerTime)
            {
                var secondsRemaining = timerTime[1] - Math.round(new Date().getTime / 1000);
                if (secondsRemaining <= 0)
                {
                    setTimerDisabled(function()
                    {
                        setNoBlock(function()
                        {
							cancelInterval(intervalID);
                            alert("The timer has expired: block type switched to No-Block");
                        });
                    });
                }
            });
        }
    });
}

