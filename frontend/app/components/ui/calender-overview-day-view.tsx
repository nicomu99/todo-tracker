import {isSameDay } from "date-fns";
import TaskItemButtonHighlighted from "@/components/ui/task-item-button-highlighted";
import { useTasks } from "@/providers/task-provider";

type CalenderOverviewDayViewProps = {
    date: Date
}

export const CalenderOverviewDayView = ({date}: CalenderOverviewDayViewProps) => {
    const { tasks } = useTasks();
    const dailyTasks = tasks.filter((task) => isSameDay(task.dueDate, date));

    return (
        <div className="flex flex-col gap-5 mt-5">
            {dailyTasks.length > 0 ?
                dailyTasks.map(task => (
                        <TaskItemButtonHighlighted task={task} key={task.id}/>
                    )) :
                <div className={"text-center"}>
                    No tasks today!
                </div>
            }
        </div>
    )
}