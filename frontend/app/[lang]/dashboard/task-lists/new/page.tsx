"use client"

import { SubmitEvent, useState } from "react";
import DashboardCard from "@/components/ui/dashboard-card";
import CardIcon from "@/components/ui/card-icon";
import TaskListIcon from "@/icons/tasklist-icon";
import PageTitle from "@/components/ui/page-title";
import Input from "@/components/ui/input";
import { useTasks } from "@/providers/task-provider";
import CheckIcon from "@/icons/check-icon";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Button from "@/components/ui/button";

export default function CreateListPage() {
    const [listNameError, setListNameError] = useState("");
    const [highlightListName, setHighlightListName] = useState(false);

    const [descriptionError, setDescriptionError] = useState("");
    const [highlightDescription, setHighlightDescription] = useState(false);

    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { createTaskList } = useTasks();

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const listName = formData.get("list-name");
        const description = formData.get("description");

        if (!listName) {
            setListNameError("Please enter a list name");
            setHighlightListName(true);
            setDescriptionError("");
            setHighlightDescription(false);
            return;
        } else {
            setListNameError("");
            setHighlightListName(false);
        }
        if (!description) {
            setDescriptionError("Please enter a description");
            setHighlightDescription(true);
            return;
        } else {
            setDescriptionError("");
            setHighlightDescription(false);
        }

        try {
            await createTaskList({ name: String(listName), description: String(description) });
            setSuccessMessage("The task has been created successfully.");
        } catch {
            setErrorMessage("Could not create task list");
        }
    }

    return (
        <DashboardCard>
            <Breadcrumbs/>
            <div className="flex flex-row items-center gap-8 mb-4">
                <CardIcon>
                    <TaskListIcon width="2.5em" height="2.5em"/>
                </CardIcon>
                <PageTitle>
                    Create Task List
                </PageTitle>
            </div>
            <div className="w-full max-w-120">
                {successMessage ?
                    <div className="flex flex-col items-center justify-center gap-5">
                        <CheckIcon className="text-positive" width="5em" height="5em"/>
                        <p className="leading-none text-lg">
                            The task has been created successfully.
                        </p>
                    </div>
                    :
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <Input name="list-name" title="List Name" placeholder="List Name"
                               highlight={highlightListName}/>
                        <Input name="description" title="Description" placeholder="Description"
                               highlight={highlightDescription}/>
                        {(listNameError || descriptionError || errorMessage) && (
                            <div
                                className="flex items-center gap-2 px-3 border-accent-hover box-border border-2 py-2">
                                <svg className="shrink-0" fill="none" viewBox="0 0 24 24" width={20} height={20}>
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
                                    {listNameError} {descriptionError} {errorMessage}
                                </p>
                            </div>
                        )}
                        <Button>
                            Create List
                        </Button>
                    </form>
                }
            </div>

        </DashboardCard>
    );
}