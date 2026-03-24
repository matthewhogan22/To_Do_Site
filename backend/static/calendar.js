"use strict";

const currDate = new Date();
var year = currDate.getFullYear();
var month = currDate.getMonth();
var firstDayOfMonth = new Date(year, month, 1);
var dayOfWeekOfMonth = firstDayOfMonth.getDay();
var numDaysInMonth = 0;

function getNumDaysInMonth(month) {
    const thirtyOne = [0,2,4,6,7,9,11]
    const thirty = [3,5,8,10]
    if (thirtyOne.includes(month)) {
        return 31
    } else if (thirty.includes(month)){
        return 30
    }
    return 28
}


jQuery(async function($) {
    console.log("Calendar Ready");
    
    console.log(currDate)
    console.log(dayOfWeekOfMonth)
    console.log(getNumDaysInMonth(month))

    var startDay = dayOfWeekOfMonth + 1
    console.log(startDay)

    for (let i = 0; i < getNumDaysInMonth(month); i++) {
        const item = document.getElementById(`day${startDay + i}`);
        const newDiv = document.createElement("div")
        newDiv.textContent = i + 1;
        newDiv.class = "cal-day"

        item.append(newDiv)
    }
});