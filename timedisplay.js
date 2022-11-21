//function that given the time return a string of hour:minutes
function stringHoursMinutes(time) {
    //get the hours
    var hours = time.getHours();
    //get the minutes
    if (parseInt(time.getMinutes()) < 10) {minutes = "0" + time.getMinutes();} else minutes = time.getMinutes();
    //return the string
    return hours + ":" + minutes;
}
//function that given the time return a string of hour:minutes:seconds
function stringHoursMinutesSeconds(time) {
    //get the hours and minutes
    var hoursminutes = stringHoursMinutes(time);
    //get the seconds
    if (parseInt(time.getSeconds()) < 10) { seconds = "0" + time.getSeconds(); } else seconds = time.getSeconds();
    //return the string
    return hoursminutes + ":" + seconds;
}
//function that given the time return a string of minutes:seconds
function stringMinutesSeconds(time) {
    //get the minutes
    if (parseInt(time.getMinutes()) < 10) {minutes = "0" + time.getMinutes();} else minutes = time.getMinutes();
    //get the seconds
    if (parseInt(time.getSeconds()) < 10) { seconds = "0" + time.getSeconds(); } else seconds = time.getSeconds();
    //return the string
    return minutes + ":" + seconds;
}
//define the function to update the time
function updateTime() {
    //get the current date and extract the time
    var dt = new Date();
    //get the time in hours, minutes and seconds
    var time = stringHoursMinutesSeconds(dt);
    //update the time in the html
    $('#time').text(time);
}
//execute a first time
updateTime();
//execute this every minute to update the time
setInterval(function(){
    updateTime();
}, 1000);

