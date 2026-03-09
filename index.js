"use strict";

var to_do_list = [];

function validate_to_do(added_todo_text, added_todo_title) {
    return added_todo_title.length > 0 && added_todo_text.length > 0;

}

function render_to_do_list() {
    const container = $(".to-do-items");
    container.empty();

    to_do_list.forEach(function(item) {
        container.append(`
            <div class="to-do-item" data-id="${item.id}">
                <div class="to-do-item-header">
                    <input class="to-do-checkbox" type="checkbox">
                    <label class="to-do-checkbox-label">${item.title}</label>
                </div>
                <p class="to-do-description">${item.text}</p>
            </div>
        `);
    });
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
            var item = {id: Date.now(), title: title, text: text, done: false};
            to_do_list.push(item);
            $("#add-modal").hide();
            $("#todo-title").val("");
            $("#todo-description").val("");
            render_to_do_list();
        }
    });

    var update_list = $("#update-button");
    update_list.on("click", async function(e) {
        const checked_ids = [];

        $(".to-do-checkbox:checked").each(function() {
            const id = $(this).closest(".to-do-item").data("id");
            checked_ids.push(id);
        });

        to_do_list = to_do_list.filter(function(item) {
            return !checked_ids.includes(item.id);
        });

        render_to_do_list();
    });


});