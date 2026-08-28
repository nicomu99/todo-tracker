"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "@/providers/auth-provider";

export type Task = {
    id: number;
    taskListId: number;
    name: string;
    description?: string;
    priority: 1 | 2 | 3;
    effort: number;
    completed: boolean;
    dueDate: Date;
    createdAt: Date;
}

type TaskResponse = {
    id: number;
    task_list_id: number;
    name: string;
    description?: string;
    priority: 1 | 2 | 3;
    effort: number;
    completed: boolean;
    due_date: Date;
    created_at: Date;
}

export type TaskCreate = {
    task_list_id: number;
    name: string;
    description: string;
    priority: number;
    effort: number;
    due_date: string;
}

export type TaskUpdate = {
    task_list_id: number;
    name?: string;
    description?: string;
    priority?: number;
    effort?: number;
    due_date?: string;
}

export type TaskList = {
    id: number;
    name: string;
    description: string;
    createdDate: Date;
    updatedDate: Date;
}

type TaskListResponse = {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

type TaskListCreate = {
    name: string;
    description: string;
}

export type TaskListUpdate = {
    name?: string;
    description?: string;
}

type TaskContextType = {
    tasks: Task[];
    taskLists: TaskList[];

    isLoadingTasks: boolean;
    isLoadingTaskLists: boolean;

    loadTasks: () => Promise<void>;
    createTask: (task: TaskCreate) => Promise<Task>;
    updateTask: (taskId: number, task: TaskUpdate) => Promise<Task>;
    deleteTask: (taskId: number) => Promise<void>;

    loadTaskLists: () => Promise<void>;
    createTaskList: (taskList: TaskListCreate) => Promise<TaskList>;
    updateTaskList: (taskListId: number, taskList: TaskListUpdate) => Promise<TaskList>;
    deleteTaskList: (taskListId: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
    const { accessToken } = useAuth();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);

    const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);
    const [isLoadingTaskLists, setIsLoadingTaskLists] = useState<boolean>(true);

    async function createTask(task: TaskCreate) {
        const response = await fetch("http://localhost:8000/tasks/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error("Failed to create task list");
        }

        const taskResponse: TaskResponse = await response.json();
        const newTask: Task = {
            id: taskResponse.id,
            taskListId: taskResponse.task_list_id,
            name: taskResponse.name,
            description: taskResponse.description ?? "",
            priority: taskResponse.priority,
            effort: taskResponse.effort,
            completed: taskResponse.completed,
            dueDate: new Date(taskResponse.due_date),
            createdAt: new Date(taskResponse.created_at),
        }
        setTasks(previous => [
            ...previous,
            newTask,
        ]);

        return newTask;
    }

    async function updateTask(taskId: number, task: TaskUpdate) {
        const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        const updatedTask: TaskResponse = await response.json();
        const newTask: Task = {
            id: updatedTask.id,
            taskListId: updatedTask.task_list_id,
            name: updatedTask.name,
            description: updatedTask.description ?? "",
            priority: updatedTask.priority,
            effort: updatedTask.effort,
            completed: updatedTask.completed,
            dueDate: new Date(updatedTask.due_date),
            createdAt: new Date(updatedTask.created_at),
        }
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === newTask.id
                    ? newTask
                    : task
            )
        );

        return newTask;
    }

    async function deleteTask(taskId: number) {
        const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        setTasks(prevTasks =>
            prevTasks.filter(task =>
                task.id !== taskId
            )
        );
    }

    async function loadTaskLists() {
        try {
            const taskListResponse = await fetch("http://localhost:8000/task-lists/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data: TaskListResponse[] = await taskListResponse.json();

            setTaskLists(
                data.map(item => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    createdDate: item.created_at,
                    updatedDate: item.updated_at,
                }))
            )
            setIsLoadingTaskLists(false);
        } catch (error) {
            console.error(error);
            return;
        }
    }

    async function loadTasks() {
        const allTasks = await Promise.all(
            taskLists.map(async (taskList) => {
                const response = await fetch(`http://localhost:8000/task-lists/${taskList.id}/tasks`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to load tasks");
                }

                const data: TaskResponse[] = await response.json();
                return data.map(task => ({
                    id: task.id,
                    taskListId: task.task_list_id,
                    name: task.name,
                    description: task.description,
                    priority: task.priority,
                    effort: task.effort,
                    completed: task.completed,
                    dueDate: new Date(task.due_date),
                    createdAt: new Date(task.created_at),
                }));
            })
        );

        setTasks(allTasks.flat());
        setIsLoadingTasks(false);
    }

    async function createTaskList(taskList: TaskListCreate) {
        const response = await fetch("http://localhost:8000/task-lists/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskList),
        });

        if (!response.ok) {
            throw new Error("Failed to create task list");
        }

        const createdTaskList: TaskList = await response.json();
        setTaskLists(previous => [
            ...previous,
            createdTaskList,
        ]);

        return createdTaskList;
    }

    async function updateTaskList(taskListId: number, taskList: TaskListUpdate) {
        const response = await fetch(`http://localhost:8000/task-lists/${taskListId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskList),
        });

        if (!response.ok) {
            throw new Error("Failed to update task list");
        }

        const updatedTaskList: TaskListResponse = await response.json();
        const newTaskList: TaskList = {
            id: updatedTaskList.id,
            name: updatedTaskList.name,
            description: updatedTaskList.description ?? "",
            createdDate: new Date(updatedTaskList.created_at),
            updatedDate: new Date(updatedTaskList.updated_at),
        }
        setTaskLists(prevTaskLists =>
            prevTaskLists.map(taskList =>
                taskList.id === newTaskList.id
                    ? newTaskList
                    : taskList
            )
        );

        return newTaskList;
    }

    async function deleteTaskList(taskListId: number) {
        const response = await fetch(`http://localhost:8000/task-lists/${taskListId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete task list");
        }

        setTaskLists(previous =>
            previous.filter(taskList =>
                taskList.id !== taskListId
            )
        );
    }

    useEffect(() => {
        void loadTaskLists();
    }, [])

    useEffect(() => {
        if (taskLists.length > 0) {
            void loadTasks();
        }
    }, [taskLists])

    return (
        <TaskContext
            value={{
                tasks,
                taskLists,
                isLoadingTasks,
                isLoadingTaskLists,
                loadTasks,
                createTask,
                updateTask,
                deleteTask,
                loadTaskLists,
                createTaskList,
                updateTaskList,
                deleteTaskList,
            }}
        >
            {children}
        </TaskContext>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);

    if (context === undefined) {
        throw new Error('useTasks() must be used within the provider');
    }
    return context;
}
