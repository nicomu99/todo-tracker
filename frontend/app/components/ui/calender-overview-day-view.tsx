import { isSameDay } from "date-fns";
import TaskItemSummary from "@/components/ui/task-item-summary";
import { useTasks } from "@/providers/task-provider";
import CardItemLinkHighlighted from "@/components/ui/card-item-link-highlighted";
import { useParams } from "next/navigation";

type CalenderOverviewDayViewProps = {
    date: Date
}

export const CalenderOverviewDayView = ({ date }: CalenderOverviewDayViewProps) => {
    const { tasks } = useTasks();
    const { lang } = useParams();
    const dailyTasks = tasks.filter((task) => isSameDay(task.dueDate, date));

    return (
        <div className="flex flex-col gap-5 mt-5">
            {dailyTasks.length > 0 ?
                dailyTasks.map(task => (
                    <CardItemLinkHighlighted href={`/${lang}/dashboard/task-lists/${task.taskListId}`} key={task.id}>
                        <TaskItemSummary
                            task={task}
                        />
                    </CardItemLinkHighlighted>
                )) :
                <div className={"text-center"}>
                    No tasks today!
                </div>
            }
        </div>
    );
};