"use strict";

const currDate = new Date();
var year = currDate.getFullYear();
var month = currDate.getMonth();
var firstDayOfMonth = new Date(year, month, 1);
var dayOfWeekOfMonth = firstDayOfMonth.getDay();
var numDaysInMonth = 0;

function getNumDaysInMonth(month) {
    const thirtyOne = [1,3,5,7,8,10,12]
    const thirty = [4,6,9,11]
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
});