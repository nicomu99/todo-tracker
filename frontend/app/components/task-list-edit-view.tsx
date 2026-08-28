"use client";

import CheckIcon from "@/icons/check-icon";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { SubmitEvent, useEffect, useState } from "react";
import { TaskListUpdate, useTasks } from "@/providers/task-provider";
import { notFound } from "next/navigation";
import ErrorMessageView from "@/components/ui/error-message-view";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function TaskListEditView({
    slug,
}: {
    slug: string;
}) {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const { taskLists, isLoadingTaskLists, updateTaskList } = useTasks();

    const taskList = taskLists.find(
        (list) => list.id === Number(slug),
    );

    useEffect(() => {
        if (taskList) {
            setName(taskList.name);
            setDescription(taskList.description);
        }
    }, [taskList]);

    if (isLoadingTaskLists) {
        return <p>Loading...</p>;
    }

    if (!taskList) {
        notFound();
    }


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
        <div>
            <Breadcrumbs labels={{[slug]: taskList.name}}/>

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
                        <ErrorMessageView error={errorMessage} />
                    )}
                </form>
            }
        </div>
    );
}