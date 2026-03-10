"use strict";

var to_do_list = [];

// Validates user input for creating a To-Do item based on the fact that there is a title and description
function validate_to_do(added_todo_title, added_todo_text) {
    return added_todo_title.length > 0 && added_todo_text.length > 0;

}

// Renders list visually based on items from backend
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
                <p class="to-do-description">${item.description}</p>
            </div>
        `);
    });
}

// loads To-Do items from the server
async function loadTodos() {
    const response = await fetch("/api/todos");
    const data = await response.json();
    to_do_list = data;
    render_to_do_list();
}

jQuery(async function($) {
    console.log("Webpage Ready!");
    $("#add-modal").hide();
    await loadTodos();

    // Opens interaction pane for adding To-Do item
    var add_button = $("#add-button");
    add_button.on("click", async function(e) {
        $("#add-modal").show();
    });

    // Cancels adding To-Do item and closes interaction pane
    var cancel_add = $("#close-modal");
    cancel_add.on("click", async function(e) {
        $("#add-modal").hide();
    });

    // Logic for adding an item to the list
    $("#save-todo").on("click", async function () {

    const title = $("#todo-title").val().trim();
    const description = $("#todo-description").val().trim();

    if (!validate_to_do(title, description)) {
        return;
    }

    const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description
        })
    });

    if (!response.ok) {
        console.error("Failed to create todo");
        return;
    }

    $("#add-modal").hide();
    $("#todo-title").val("");
    $("#todo-description").val("");

    await loadTodos();
    });

    // Updates list based on checking boxes to remove from list
    $("#update-button").on("click", async function () {

    const checkedIds = [];

    $(".to-do-checkbox:checked").each(function () {
        const id = $(this).closest(".to-do-item").data("id");
        checkedIds.push(id);
    });

    for (const id of checkedIds) {

        await fetch(`/api/todos/${id}`, {
            method: "DELETE"
        });

    }

    await loadTodos();
    });


});