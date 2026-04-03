from fastapi import APIRouter, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.task import TaskCreate, TaskUpdate
from app.services.task_service import (
    get_all_tasks,
    create_new_task,
    update_existing_task,
    delete_existing_task,
    complete_existing_task,
)

router = APIRouter()

@router.get("/tasks")
def get_tasks(status: str | None = Query(default=None)):
    db: Session = SessionLocal()
    try:
        return get_all_tasks(db, status)
    finally:
        db.close()

@router.post("/tasks")
def create_task(task: TaskCreate):
    db: Session = SessionLocal()
    try:
        return create_new_task(db, task)
    finally:
        db.close()

@router.put("/tasks/{task_id}")
def update_task(task_id: int, task: TaskUpdate):
    db: Session = SessionLocal()
    try:
        result = update_existing_task(db, task_id, task)
        if not result:
            return {"error": "Task not found"}
        return result
    finally:
        db.close()

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    db: Session = SessionLocal()
    try:
        result = delete_existing_task(db, task_id)
        if not result:
            return {"error": "Task not found"}
        return result
    finally:
        db.close()

@router.patch("/tasks/{task_id}/complete")
def complete_task(task_id: int):
    db: Session = SessionLocal()
    try:
        result = complete_existing_task(db, task_id)
        if not result:
            return {"error": "Task not found"}
        return result
    finally:
        db.close()