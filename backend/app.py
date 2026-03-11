from flask import Flask, request, jsonify, render_template
import sqlite3
from pathlib import Path

app = Flask(__name__, template_folder="templates", static_folder="static")
DB_PATH = Path(__file__).parent / "todo.db"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/todos", methods=["GET"])
def get_todos():
    conn = get_db_connection()
    rows = conn.execute(
        "SELECT id, title, description, completed, due_date, created_at FROM todos ORDER BY id DESC"
        ).fetchall()
    conn.close()

    todos = [dict(row) for row in rows]
    return jsonify(todos)

@app.route("/api/todos", methods=["POST"])
def create_todo():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    description = (data.get("description") or "").strip()
    due_date = (data.get("due_date") or "").strip()

    if not title or not description:
        return jsonify({"error": "Title and description are required."}), 400
    
    conn = get_db_connection()
    cur = conn.execute(
        "INSERT INTO todos (title, description, due_date) VALUES (?, ?, ?)",
        (title, description, due_date),
    )
    conn.commit()

    new_id = cur.lastrowid
    row = conn.execute(
        "SELECT id, title, description, completed, due_date, created_at FROM todos WHERE id = ?",
        (new_id,),
    ).fetchone()
    conn.close()

    return jsonify(dict(row)), 201

@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    conn = get_db_connection()
    cur = conn.execute(
        "DELETE FROM todos WHERE id = ?", (todo_id,)
    )
    conn.commit()
    conn.close()

    if cur.rowcount == 0:
        return jsonify({"error": "Todo not found."}), 404
    
    return jsonify({"success": True, "deleted_id": todo_id})

@app.route("/api/todos/<int:todo_id>", methods=["PATCH"])
def update_todo(todo_id):
    data = request.get_json()

    conn = get_db_connection()

    # get existing values
    todo = conn.execute(
        "SELECT * FROM todos WHERE id = ?",
        (todo_id,)
    ).fetchone()

    if not todo:
        conn.close()
        return {"error": "Todo not found"}, 404

    title = data.get("title", todo["title"])
    description = data.get("description", todo["description"])
    due_date = data.get("due_date", todo["due_date"])
    completed = data.get("completed", todo["completed"])

    conn.execute(
        """
        UPDATE todos
        SET title = ?, description = ?, due_date = ?, completed = ?
        WHERE id = ?
        """,
        (title, description, due_date, completed, todo_id),
    )

    conn.commit()
    conn.close()

    return {"message": "Todo updated"}, 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)