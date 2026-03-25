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

function format_calendar(startDay) {
    clear_calendar()
    for (let i = 0; i < getNumDaysInMonth(month); i++) {
            const item = document.getElementById(`day${startDay + i}`);
            item.innerHTML +=   `<div class="cal-day">
                                    <p class="day-header">
                                        ${i+1}
                                    </p>
                                </div>`
                    
        }
}

function clear_calendar() {
    for (let i = 1; i <=42; i++) {
        const thing = document.getElementById(`day${i}`);
        thing.innerHTML = '';
    }
}


jQuery(async function($) {
    console.log("Calendar Ready");
    
    console.log(currDate)
    console.log(dayOfWeekOfMonth)
    console.log(getNumDaysInMonth(month))

    var startDay = dayOfWeekOfMonth + 1
    format_calendar(startDay)

    var next_button = $("#next-month");
    next_button.on("click", async function e() {
        if (month != 11) {
            month = month + 1;
        } else {
            month = 0;
            year = year + 1;
        }

        var newFirstDayOfMonth = new Date(year, month, 1);
        var newDayOfWeekOfMonth = newFirstDayOfMonth.getDay();
        format_calendar(newDayOfWeekOfMonth + 1)
    });


    var back_button = $("#back-month");
});