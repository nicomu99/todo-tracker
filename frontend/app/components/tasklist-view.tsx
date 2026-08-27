"use client";

import { useTasks } from "@/providers/task-provider";
import CardIcon from "@/components/ui/card-icon";
import TaskListIcon from "@/icons/tasklist-icon";
import PageTitle from "@/components/ui/page-title";
import { notFound } from "next/navigation";
import TasklistItemDetail from "@/components/ui/task-list-item-detail";

export default function TaskListView({
    slug,
}: {
    slug: string;
}) {
    const { taskLists, tasks, isLoadingTasks, isLoadingTaskLists } = useTasks();

    const taskList = taskLists.find(
        (list) => list.id === Number(slug)
    );
    const taskListTasks = tasks.filter(
        (task) => task.taskListId === taskList?.id
    )
    taskListTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

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
            </div>
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