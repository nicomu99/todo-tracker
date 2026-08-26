import {isSameDay } from "date-fns";
import TaskItemButtonHighlighted from "@/components/ui/task-item-button-highlighted";

type CalenderOverviewDayViewProps = {
    date: Date
}

// TODO: Get tasks dynamically

export const CalenderOverviewDayView = ({date}: CalenderOverviewDayViewProps) => {
    const taskTitle = "Pack Suitcase"
    const dueDate = new Date("September 21, 2026 18:00:00")
    const priority = 1;

    const dateString = dueDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    const timeString = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="flex flex-col gap-5 mt-5">
            {isSameDay(date, dueDate)?
                <TaskItemButtonHighlighted taskTitle={taskTitle} dueDate={dateString} dueTime={timeString} priority={priority} /> :
                <div className={"text-center"}>
                    No tasks today!
                </div>
            }
        </div>
    )
}