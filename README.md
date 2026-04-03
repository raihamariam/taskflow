# TaskFlow

A full-stack task manager built with:

- Next.js (Frontend)
- FastAPI (Backend)
- PostgreSQL (Database)

---

## Features

- Create, update, delete tasks
- Mark tasks as completed
- Filter by status (all, pending, completed)
- Priority levels (low, medium, high)
- Clean modern UI

---

## Architecture


Frontend (Next.js)
↓
Backend (FastAPI API)
↓
Database (PostgreSQL)


---

## Setup

### Backend


cd backend
uvicorn app.main:app --reload


### Frontend


cd frontend
npm run dev


---

## API Endpoints

- GET /tasks
- POST /tasks
- PUT /tasks/{id}
- DELETE /tasks/{id}
- PATCH /tasks/{id}/complete

---
