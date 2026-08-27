"use client";

import { useTasks } from "@/providers/task-provider";
import CardIcon from "@/components/ui/card-icon";
import TaskListIcon from "@/icons/tasklist-icon";
import PageTitle from "@/components/ui/page-title";
import { notFound, useParams } from "next/navigation";
import TasklistItemDetail from "@/components/ui/task-list-item-detail";
import { useState } from "react";
import CreateTaskView from "@/components/ui/create-task-view";
import Link from "next/link";

export default function TaskListView({
    slug,
}: {
    slug: string;
}) {
    const { lang } = useParams();
    const { taskLists, tasks, isLoadingTasks, isLoadingTaskLists } = useTasks();
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);

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

    return (
        <div>
            <div className="flex flex-row items-center gap-8 mb-8">
                <CardIcon>
                    <TaskListIcon width="2.5em" height="2.5em"/>
                </CardIcon>
                <PageTitle>
                    {taskList.name}
                </PageTitle>
                <Link href={`/${lang}/dashboard/task-lists/${taskList.id}/edit`}>
                    Edit
                </Link>
                <div
                    className="
                        w-10 h-10 ml-auto mr-8
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
            {showAddTaskModal && (
                <CreateTaskView taskListId={taskList.id}/>
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