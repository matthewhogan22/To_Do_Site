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

        const completedClass = item.completed ? "completed" : "";
        const checked = item.completed ? "checked" : "";

        container.append(`
            <div class="to-do-item" data-id="${item.id}">
                <div class="to-do-item-header">
                    <input class="to-do-checkbox" type="checkbox" ${checked}>
                    <label class="to-do-checkbox-label ${completedClass}">
                        ${item.title}
                    </label>
                </div>
                <p class="to-do-description ${completedClass}">
                    ${item.description}
                </p>
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

        const updates = [];

        $(".to-do-checkbox").each(function () {
            const id = $(this).closest(".to-do-item").data("id");
            const completed = $(this).is(":checked") ? 1 : 0;

            updates.push({ id, completed });
        });

        for (const item of updates) {

            const response = await fetch(`/api/todos/${item.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: item.completed
                })
            });

            if (!response.ok) {
                console.error(`Failed to update todo ${item.id}`);
            }
        }

        await loadTodos();
    });


});