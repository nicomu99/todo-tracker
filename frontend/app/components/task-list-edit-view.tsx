"use client";

import CheckIcon from "@/icons/check-icon";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { SubmitEvent, useState } from "react";
import { TaskListUpdate, useTasks } from "@/providers/task-provider";
import { notFound } from "next/navigation";
import ErrorMessageView from "@/components/ui/error-message-view";

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
                        <ErrorMessageView error={errorMessage} />
                    )}
                </form>
            }
        </div>
    );
}