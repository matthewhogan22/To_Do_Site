# To-Do Site

A lightweight full-stack to-do list web application built with **Flask**, **SQLite**, and a simple **HTML/CSS/JavaScript frontend**. The application allows users to create, update, and manage tasks with optional due dates. It is deployed on a Linux home server using **Gunicorn** and **nginx** for production hosting.

---

## Features

- Create to-do items with:
  - title
  - description
  - due date
- Mark tasks complete or incomplete
- Edit/Delete tasks
- Responsive UI accessible from any device
- Persistent storage using SQLite
- REST API backend
- Production deployment using nginx + Gunicorn

---

## Tech Stack

### Backend
- Python
- Flask
- SQLite

### Frontend
- HTML
- CSS
- JavaScript
- jQuery

### Deployment
- Gunicorn (WSGI server)
- nginx (reverse proxy)
- Linux home server

---

## Architecture

```text
Client (Browser)
      ↓
nginx (port 80)
      ↓
Gunicorn (127.0.0.1:8000)
      ↓
Flask Application
      ↓
SQLite Database
