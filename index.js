"use strict";

const to_do_list = [];

function validate_to_do(added_todo_text, added_todo_title) {
    return added_todo_title.length > 0 && added_todo_text.length > 0;

}

function add_todo_visual(item) {
    $(".to-do-items").append(`
    <div class="to-do-item">
        <input class="to-do-checkbox" type="checkbox">
        <label class="to-do-checkbox-label">${item.title}</label>
        <p class="to-do-description">${item.text}</p>
    </div>
`);
}

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

    var save_add = $("#save-todo");
    save_add.on("click", async function(e) {
        var title = $("#todo-title").val();
        var text = $("#todo-description").val();
        if (validate_to_do(title, text)) {
            var item = {title: title, text: text, done: false};
            to_do_list.push(item);
            $("#add-modal").hide();
            $("#todo-title").val("");
            $("#todo-description").val("");
            add_todo_visual(item);
        }
    });

    var update_list = $("#update-button");
    update_list.on("click", async function(e) {
        console.log(to_do_list);
    });


});