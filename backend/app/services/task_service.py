from sqlalchemy.orm import Session
from app.models.task import Task

def task_to_dict(task: Task):
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "priority": task.priority,
        "due_date": task.due_date,
        "created_at": task.created_at,
        "updated_at": task.updated_at,
    }

def get_all_tasks(db: Session, status: str | None = None):
    query = db.query(Task)

    if status:
        query = query.filter(Task.status == status)

    tasks = query.all()
    return [task_to_dict(task) for task in tasks]

def create_new_task(db: Session, task_data):
    new_task = Task(
        title=task_data.title,
        description=task_data.description,
        priority=task_data.priority,
        due_date=task_data.due_date,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return task_to_dict(new_task)

def update_existing_task(db: Session, task_id: int, task_data):
    existing_task = db.query(Task).filter(Task.id == task_id).first()

    if not existing_task:
        return None

    existing_task.title = task_data.title
    existing_task.description = task_data.description
    existing_task.status = task_data.status
    existing_task.priority = task_data.priority
    existing_task.due_date = task_data.due_date

    db.commit()
    db.refresh(existing_task)
    return task_to_dict(existing_task)

def delete_existing_task(db: Session, task_id: int):
    existing_task = db.query(Task).filter(Task.id == task_id).first()

    if not existing_task:
        return None

    db.delete(existing_task)
    db.commit()
    return {"message": f"Task {task_id} deleted successfully"}

def complete_existing_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return None

    task.status = "completed"
    db.commit()
    db.refresh(task)
    return {"message": "Task marked as completed"}