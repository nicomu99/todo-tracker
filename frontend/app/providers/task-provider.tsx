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
}

type TaskCreate = {
    name: string;
    description: string;
}

type TaskUpdate = {
    name?: string;
    description?: string;
    priority?: number;
    effort?: number;
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

type TaskListUpdate = {
    name?: string;
    description?: string;
}

type TaskContextType = {
    tasks: Task[];
    taskLists: TaskList[];

    isLoadingTasks: boolean;
    isLoadingTaskLists: boolean;

    loadTasks: () => Promise<void>;
    createTask: (task: TaskCreate) => Promise<void>;
    updateTask: (task: TaskUpdate) => Promise<void>;
    deleteTask: (taskId: number) => Promise<void>;

    loadTaskLists: () => Promise<void>;
    createTaskList: (taskList: TaskListCreate) => Promise<TaskList>;
    updateTaskList: (taskList: TaskListUpdate) => Promise<void>;
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
    }

    async function updateTask(task: TaskUpdate) {
    }

    async function deleteTask(taskId: number) {
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

    async function updateTaskList(taskList: TaskListUpdate) {
    }

    async function deleteTaskList(taskListId: number) {
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
