"use client";

import CheckIcon from "@/icons/check-icon";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { SubmitEvent, useState } from "react";
import { TaskListUpdate, useTasks } from "@/providers/task-provider";
import { notFound } from "next/navigation";

export default function TaskListEditView({
    slug,
}: {
    slug: string;
}) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const { taskLists, isLoadingTaskLists, updateTaskList } = useTasks();

    const taskList = taskLists.find(
        (list) => list.id === Number(slug),
    );

    if (isLoadingTaskLists) {
        return <p>Loading...</p>;
    }

    if (!taskList) {
        notFound();
    }

    const [name, setName] = useState<string>(taskList.name);
    const [description, setDescription] = useState<string>(taskList.description);


    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const taskListUpdate: TaskListUpdate = {
            name: name || undefined,
            description: description || undefined,
        };

        if (!taskList) {
            setErrorMessage("Could not update task list.");
            return;
        }

        try {
            await updateTaskList(taskList.id, taskListUpdate);
            setSuccessMessage("The task has been created successfully.");
        } catch {
            setErrorMessage("Could not update task list.");
        }
    }

    return (
        <div className="text-left py-3 px-5">
            {successMessage ?
                <div className="flex flex-col items-center justify-center gap-5">
                    <CheckIcon className="text-positive" width="5em" height="5em"/>
                    <p className="leading-none text-lg">
                        The task list has been updated successfully.
                    </p>
                </div>
                :
                <form
                    className="flex flex-col gap-6 max-w-md"
                    onSubmit={handleSubmit}
                >
                    <Input
                        name="task-list-name" title="Task List Name" placeholder="Task List Name" type="text"
                        highlight={false} value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Input
                        name="task-list-description" title="Description" placeholder="Description" type="text"
                        highlight={false} value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <input type="hidden" name={"task-list-id"} value={taskList.id}/>
                    <Button>
                        Update Task List
                    </Button>
                    {errorMessage && (
                        <div
                            className="flex items-center gap-2 px-3 border-accent-hover box-border border-2 py-2"
                        >
                            <svg
                                className="shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                width={20}
                                height={20}
                            >
                                <path
                                    fill="#f2555a"
                                    stroke="none"
                                    strokeWidth={0}
                                    strokeLinecap="butt"
                                    strokeLinejoin="miter"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm6.293-3.707a1 1 0 0 1 1.414 0L12 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12 8.293 9.707a1 1 0 0 1 0-1.414Z"
                                ></path>
                            </svg>
                            <p className="leading-none -translate-y-px">
                                {errorMessage}
                            </p>
                        </div>
                    )}
                </form>
            }
        </div>
    );
}