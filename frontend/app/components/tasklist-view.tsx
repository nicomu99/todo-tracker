"use client";

import { useTasks } from "@/providers/task-provider";
import CardIcon from "@/components/ui/card-icon";
import TaskListIcon from "@/icons/tasklist-icon";
import PageTitle from "@/components/ui/page-title";
import { notFound, useParams, useRouter } from "next/navigation";
import TasklistItemDetail from "@/components/ui/task-list-item-detail";
import { useState } from "react";
import CreateTaskView from "@/components/ui/create-task-view";
import ErrorMessageView from "@/components/ui/error-message-view";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { EditLink } from "@/components/ui/edit-control";
import { DeleteButton } from "@/components/ui/delete-button";

export default function TaskListView({
    slug,
}: {
    slug: string;
}) {
    const { lang } = useParams();
    const router = useRouter();
    const { taskLists, tasks, isLoadingTasks, isLoadingTaskLists, deleteTaskList } = useTasks();
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const taskList = taskLists.find(
        (list) => list.id === Number(slug),
    );
    const taskListTasks = tasks.filter(
        (task) => task.taskListId === taskList?.id,
    );
    taskListTasks.sort((a,
        b) => a.dueDate.getTime() - b.dueDate.getTime());

    if (isLoadingTaskLists || isLoadingTasks) {
        return <p>Loading...</p>;
    }

    if (!taskList) {
        notFound();
    }

    async function handleDelete() {
        try {
            if (!taskList) {
                setErrorMessage("Could not delete task list.");
                return;
            }

            await deleteTaskList(taskList.id);
            router.replace(`/${lang}/dashboard/task-lists/`);
        } catch {
            setErrorMessage("Could not delete task list.");
        }
    }


    return (
        <div>
            <Breadcrumbs labels={{ [slug]: taskList.name }}/>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-8 mb-8">
                <div className="flex-1 flex flex-row items-center">
                    <CardIcon className="flex-none">
                        <TaskListIcon className="w-8 h-8 md:w-10 md:h-10"/>
                    </CardIcon>
                    <div className="flex-1">
                        <PageTitle>
                            {taskList.name}
                        </PageTitle>
                    </div>
                </div>

                    <div className="flex-none flex flex-row gap-4 lg:gap-8 justify-center items-center lg:flex-row">
                    <EditLink href={`/${lang}/dashboard/task-lists/${taskList.id}/edit`}/>
                    <DeleteButton onClick={handleDelete}/>
                    <div
                        className="
                        w-10 h-10 lg:ml-auto md:mr-8
                        flex items-center justify-center
                        border border-positive border-dashed rounded-full
                        transition-all duration-200

                        hover:scale-110
                        hover:bg-positive/40
                        hover:shadow-sm
                        hover:border-solid

                        active:scale-95
                        active:bg-positive
                        active:text-background
                    "
                        onClick={() => setShowAddTaskModal(!showAddTaskModal)}
                    >
                        +
                    </div>
                </div>
            </div>
            {showAddTaskModal && (
                <CreateTaskView taskListId={taskList.id}/>
            )}
            {errorMessage && (
                <ErrorMessageView error={errorMessage}/>
            )}
            <div className="flex flex-col gap-3">
                {taskListTasks.map((task) => (
                    <TasklistItemDetail
                        key={task.id}
                        task={task}
                    />
                ))}
            </div>
        </div>
    );
}