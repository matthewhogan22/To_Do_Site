from flask import Flask, request, jsonify, render_template
import sqlite3
from pathlib import Path

app = Flask(__name__)
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
        "SELECT id, title, description, completed, created_at FROM todos ORDER BY id DESC"
        ).fetchall()
    conn.close()

    todos = [dict(row) for row in rows]
    return jsonify(todos)

@app.route("/api/todos", methods=["POST"])
def create_todo():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    description = (data.get("description") or "").strip()

    if not title or not description:
        return jsonify({"error": "Title and description are required."}), 400
    
    conn = get_db_connection()
    cur = conn.execute(
        "INSERT INTO todos (title, description) VALUES (?, ?)",
        (title, description),
    )
    conn.commit()

    new_id = cur.lastrowid
    row = conn.execute(
        "SELECT id, title, description, completed, created_at FROM todos WHERE id = ?",
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
    completed = data.get("completed")

    conn = get_db_connection()
    cur = conn.execute(
        "UPDATE todos SET completed = ? WHERE id = ?",
        (completed, todo_id),
    )
    conn.commit()
    conn.close()

    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True)