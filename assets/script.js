//add current day to jumbotron (id=currentDay)
$("#currentDay").html(moment().format('dddd, MMMM Do, YYYY'));

//get current date in 2020-06-21 format
var formatToday = moment().format('YYYY-MM-DD');

//To be used as index 0 in arrays (start hour)
var startWorkHour = moment(`${formatToday} 09`);
//Array to hold text for time slots on calendar
var workHoursText = [];
//Array to hold full date for time comparison
var workHoursFull = [];

//add to array variables for a work day - 9am to 5pm
for (var i = 0; i < 9; i++) {
    workHoursText.push(startWorkHour.format('h a'));
    workHoursFull.push(startWorkHour.format('YYYY-MM-DD HH'));
    startWorkHour = moment(startWorkHour).add(1, "hour");
}

//get the current time's hour value
var timeNow = moment().format('YYYY-MM-DD HH');

//loop through workhours to set/format rows
$.each(workHoursText, function(i) {

    //set variables to calculate if the calendar time is past, current, future
    var past = timeNow > workHoursFull[i];
    var current = timeNow == workHoursFull[i];
    var future = timeNow < workHoursFull[i];

    //get values from local storage using workHoursText[i] as key
    var savedTask = localStorage.getItem(`${workHoursText[i]}`);

    //create row and hour div tags
    $("<div>").attr("class", "row time-block").attr("id", `row${i}`).appendTo("#hoursBlock");
    $("<div>").attr("class", "hour col-1").attr("id", workHoursText[i]).html(workHoursText[i]).appendTo(`#row${i}`);

    //create text area for input based on past, current, future
    if (past) {
        $("<input>").attr("class", "textarea col-9 past").attr("id", `input${i}`).val(savedTask).appendTo(`#row${i}`);
    } else
    if (current) {
        $("<input>").attr("class", "textarea col-9 present").attr("id", `input${i}`).val(savedTask).appendTo(`#row${i}`);
    } else 
    if (future) {
        $("<input>").attr("class", "textarea col-9 future").attr("id", `input${i}`).val(savedTask).appendTo(`#row${i}`);
    }

    //create save button
    $("<button>").attr("class", "saveBtn col-1").attr("id", `buttonSave${i}`).appendTo(`#row${i}`);
    $("<i>").attr("class", "fa fa-save").appendTo(`#buttonSave${i}`);

    //create clear button
    $("<button>").attr("class", "clearBtn col-1").attr("id", `buttonClr${i}`).appendTo(`#row${i}`);
    $("<i>").attr("class", "fa fa-eraser").appendTo(`#buttonClr${i}`);

    //add event listener on click of save buttons
    $(`#buttonSave${i}`).on("click", function() {
        //add to local storage - use workHoursText[i] as key
        localStorage.setItem(`${workHoursText[i]}`, $(`#input${i}`). val());
    });

    //add event listener on click of clear buttons
    $(`#buttonClr${i}`).on("click", function() {
        //clear text from input and remove from localstorage
        $(`#input${i}`).val("");
        localStorage.removeItem(`${workHoursText[i]}`, $(`#input${i}`). val());
    });

});










