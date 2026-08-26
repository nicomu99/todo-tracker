"use client"

import TaskListOverview from "@/components/tasklist-overview";
import UpcomingTasksOverview from "@/components/upcoming-tasks-overview";
import CalenderOverview from "@/components/calender-overview";

export default function Dashboard() {
    // Should contain: Task list overview, tasks due soon, recently updated, maybe a chart showing how many tasks have been done in the past
    return (
        <div className="bg-background ml-74 mt-10 mr-10">
            <div className="mb-10">
                <p>Thu, Aug 20</p>
                <h1 className="text-6xl">Good Morning, John!</h1>
                <h2 className="text-5xl">Ready for today's challenges?</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                    <UpcomingTasksOverview />
                    <CalenderOverview />
                </div>

                <div>
                    <TaskListOverview/>
                </div>
            </div>
        </div>
    );
}