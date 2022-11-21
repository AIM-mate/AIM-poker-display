//variables

//blinds array
blinds = {
    'base': {
        0: [10, 20],
        1: [25, 50],
        2: [50, 100],
        3: [100, 200],
        4: [150, 300],
        5: [250, 500]
    },
    'final': {
        0: [75, 150],
        1: [150, 300],
        2: [300, 600],
        3: [500, 1000],
        4: [1000, 2000],
        5: [2000, 4000]
    }
}

//define the start as undefined
var startTime = undefined;

//define pause time as undefined
var pauseTime = undefined;

//define the end as undefined
var endTime = undefined;

//define the initial blinds as 0
var currentBlinds = 0;

//blinds mode
var blindsMode = "base";

//functions

//function that clears all the text
function clearAll() {

    //clear the start time
    $("#startTime").text("");
    //clear the end time
    $("#endTime").text("");
    //clear the next time
    $("#nextTime").text("");

    //clear the previous blinds
    $("#smallBlindPrev").text("");
    $("#bigBlindPrev").text("");
    //clear the current blinds
    $("#smallBlindCurr").text("");	
    $("#bigBlindCurr").text("");
    //clear the next blinds
    $("#smallBlindNext").text("");
    $("#bigBlindNext").text("");
    //clear the time to next blinds
    $("#timeToNextBlinds").text("");

    //clear the pause button text
    $("#pauseButton").text("Pause");
    
    //set the start time to undefined
    startTime = undefined;
    //set the pause time to undefined
    pauseTime = undefined;
    //set the end time to undefined
    endTime = undefined;
}
//function that given the start time returns the current blind level
function getBlindLevel() {
    //get the current time
    var currentTime = new Date();
    //get the time difference
    var timePassed = currentTime - startTime;
    //get the time in minutes and divide by 15
    var blindLevel = Math.floor(timePassed / 1000 / 60 / 15);
    //return the blind level
    return blindLevel;
}

//buttons and selectors

//set the blinds mode selector onchange function
$("#blindsMode").change(function () {
    //ask the user if he is sure
    if (!confirm("Are you sure you want to change the blinds mode?")) { return; }
    //set the blinds mode
    blindsMode = this.options[this.selectedIndex].value;
    //reset the start time
    startTime = undefined;
    //clear everything
    clearAll();
})

//handle the pause button
$("#pauseButton").click(function () {
    //if the start time is undefined
    if (startTime === undefined) { return; }
    //if the pause time is undefined
    if (pauseTime === undefined) {
        //save the current time
        pauseTime = new Date();
        //update the pause button text
        $("#pauseButton").text("Resume");
    } else {
        //calculate the time passed
        var timePassed = new Date() - pauseTime;
        //add the time passed to the start time
        startTime = new Date(startTime.getTime() + timePassed);
        //add the time passed to the end time
        endTime = new Date(endTime.getTime() + timePassed);
        //update the endtime text
        $("#endTime").text(stringHoursMinutes(endTime));
        //update the pause button text
        $("#pauseButton").text("Pause");
        //set the pause time to undefined
        pauseTime = undefined;
    }
})

//handle the start button
$("#startButton").click(function () {
    //check if the start time is undefined
    if (startTime !== undefined) {
        //ask the user if they want to reset the timer
        if (!confirm("Are you sure you want to reset the timer?")) {
            //if they don't want to reset the timer, return
            return;
        }
    }
    //save the current time
    startTime = new Date();
    //endTime is startTime + 90 min
    endTime = new Date(startTime.getTime() + 90 * 60 * 1000);
    //update the startTime text
    $("#startTime").text(stringHoursMinutes(startTime));
    //update the endTime text
    $("#endTime").text(stringHoursMinutes(endTime));
})

//handle the clear button
$("#clearButton").click(function () {
    //ask the user if they want to clear the timer
    if (!confirm("Are you sure you want to clear the timer?")) { return; }
    //clear everything
    clearAll();
})

//check every second if the blind level has changed
setInterval(function () {

    //check if the start time is undefined short circuit
    if (startTime === undefined) { return; }
    //if the pause time is defined short circuit
    if (pauseTime !== undefined) { return; }

    //get the blind level
    var currentBlinds = getBlindLevel();

    //set the previous blinds
    if (currentBlinds > 0) { //if not zero set them, otherwise leave them be 
        //set the small previous blind text
        $("#smallBlindPrev").text(blinds[blindsMode][currentBlinds - 1][0]);
        //set the big previous blind text
        $("#bigBlindPrev").text(blinds[blindsMode][currentBlinds - 1][1]);
    }

    //set the current blinds level
    //set the current small blind text
    $("#smallBlindCurr").text(blinds[blindsMode][currentBlinds][0]);
    //set the current big blind text
    $("#bigBlindCurr").text(blinds[blindsMode][currentBlinds][1]);

    //set the next blinds level
    if (currentBlinds < 5) { //if not 6 set them, otherwise set them to 'END'

        //set the next time
        //get the time elapsed
        var timeElapsed = new Date() - startTime;
        //get the remainder of 15 mins
        timeElapsed = timeElapsed % (15 * 60 * 1000)
        //delete the milliseconds
        timeElapsed = Math.floor(timeElapsed / 1000);
        //timeRemaining
        var timeRemaining = 15 * 60 - timeElapsed;

        //set the next time as minutes:seconds
        $("#nextTime").text(
            String(Math.floor(timeRemaining / 60)).padStart(2, '0') + ":" + String(timeRemaining % 60).padStart(2, '0')
        );
        //set the next small blind text
        $("#smallBlindNext").text(blinds[blindsMode][currentBlinds + 1][0]);
        //set the big next blind text
        $("#bigBlindNext").text(blinds[blindsMode][currentBlinds + 1][1]);
    } else {
        //set the next time to '-'
        $("#nextTime").text("-----");
        //set the small next blind text
        $("#smallBlindNext").text("END");
        //set the big next blind text
        $("#bigBlindNext").text("END");
    }
}, 1000);
