"use client";

import DashboardCard from "@/components/ui/dashboard-card";
import CardIcon from "@/components/ui/card-icon";
import TaskListIcon from "@/icons/tasklist-icon";
import PageTitle from "@/components/ui/page-title";
import CardItemLinkPlain from "@/components/ui/card-item-link-plain";
import TasklistItemLinkPlain from "@/components/ui/tasklist-item-link-plain";
import { useTasks } from "@/providers/task-provider";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function TaskListPage() {
    const { taskLists } = useTasks();
    const { lang } = useParams();

    return (
        <DashboardCard>
            <Breadcrumbs/>
            <div className="flex flex-row items-center gap-8 mb-4">
                <CardIcon>
                    <TaskListIcon width="2.5em" height="2.5em"/>
                </CardIcon>
                <PageTitle>
                    Task List Overview
                </PageTitle>
            </div>
            <div className="divide-y divide-text-muted/40">
                <CardItemLinkPlain href={`/${lang}/dashboard/task-lists/new`}>
                    <div className="flex flex-row items-center gap-3">
                        <div className="
                                w-10 h-10
                                flex items-center justify-center
                                border border-accent border-dashed rounded-md
                                transition-all duration-200

                                group-hover:scale-110
                                group-hover:bg-accent-hover/40
                                group-hover:shadow-sm
                                group-hover:border-solid

                                group-active:scale-95
                                group-active:bg-accent
                                group-active:text-background
                            "
                        >
                            +
                        </div>
                        <p className="transition-colors duration-200 group-hover:text-accent-hover">
                            Add new task list
                        </p>
                    </div>
                </CardItemLinkPlain>
                {taskLists.map(item => (
                    <TasklistItemLinkPlain key={item.id} taskList={item}/>
                ))}
            </div>
        </DashboardCard>
    );
}