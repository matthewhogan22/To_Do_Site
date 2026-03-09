"use strict";

var added_todo_text = "";
var added_todo_

jQuery(async function($) {
    console.log("Webpage Ready!");
    $("#add-modal").hide();

    var add_button = $("#add-button");
    add_button.on("click", async function(e) {
        $("#add-modal").show();
    });

    var cancel_add = $("#close-modal");
    cancel_add.on("click", async function(e) {
        $("#add-modal").hide();
    });


});