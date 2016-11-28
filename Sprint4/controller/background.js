// file          : background.js
// author        : Jacob Striebel
// last modified : 2016 Nov 15

var intervalID = setInterval(timerEvent, 1000);

console.log("0");

function timerEvent() 
{

	console.log("1");	

    getTimerStatus(function(timerStatus)
    {

		console.log("2");

        if (timerStatus == "enabled")
        {

			console.log("3");

            getTimerTime(function(timerTime)
            {

				console.log("4");

				var currentSeconds = Math.round(new Date().getTime() / 1000);
				var stopSeconds = timerTime[1];                                /* timerTime == [ startSecondsSinceTheEpoch, endSecondsSinceTheEpoch ] */
                var remainingSeconds = stopSeconds - currentSeconds

				console.log("currentSeconds: " + currentSeconds);
				console.log("stopSeconds: " + stopSeconds);
				console.log("remainingSeconds: " + remainingSeconds);

                if (remainingSeconds <= 1) /* actually should be <= 0, but 1 is used as insurance to account for inherent inaccuracy of this method */
                {

					console.log("5");

                    setTimerDisabled(function()
                    {

						console.log("6");

                        setNoBlock(function()
						{

							console.log("7");

							clearInterval(intervalID);

						});
                    });
                }
            });
        }
    });
}
