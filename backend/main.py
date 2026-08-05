"""Main entry point."""
from __future__ import annotations

from fastapi import FastAPI, HTTPException, Response, status

from .app import Task, TaskCreate
from .app import InMemoryTaskRepository

# Very simple database: We have task lists, tasks and users
# A user can have multiple lists, each list can have multiple tasks

app = FastAPI()

# TODO: Figure out user authentication DO LATER
# TODO: Create little database
task_repository = InMemoryTaskRepository()

@app.get("/")
def read_root():
    return {"connection": True}

@app.get("/tasks")
def read_tasks() -> list[Task]:
    return task_repository.get_tasks()

@app.get("/tasks/{task_id}")
def read_task(task_id: int):
    task = task_repository.get_task(task_id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

@app.post("/tasks/")
def create_task(task: TaskCreate):
    return task_repository.create_task(task)

@app.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    *,
    name: str | None = None,
    description: str | None = None,
    priority: int | None = None,
    effort: float | None = None,
    completed: bool | None = None,
):
    task = task_repository.update_task(
        task_id,
        name=name,
        description=description,
        priority=priority,
        effort=effort,
        completed=completed
    )

    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    task_deleted = task_repository.delete_task(task_id)
    if not task_deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
