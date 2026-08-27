import CardIcon from "@/components/ui/card-icon";
import CardTitle from "@/components/ui/card-title";
import DashboardCard from "@/components/ui/dashboard-card";
import ClockIcon from "@/icons/clock-icon";
import TaskItemSummary from "@/components/ui/task-item-summary";
import { useTasks } from "@/providers/task-provider";
import CardItemLinkHighlighted from "@/components/ui/card-item-link-highlighted";
import { useParams } from "next/navigation";

export default function UpcomingTasksOverview() {
    const { lang } = useParams();
    const { tasks } = useTasks();
    const unfinishedTasks = tasks.filter((task) => !task.completed)
    const upcomingTasks = unfinishedTasks
        .slice()
        .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
        .slice(0, 4);

    return (
        <DashboardCard>
            <div className="flex flex-row items-center gap-8 mb-4">
                <CardIcon>
                    <ClockIcon/>
                </CardIcon>
                <CardTitle>
                    Upcoming Tasks
                </CardTitle>
            </div>
            <div className="flex flex-col gap-3">
                {upcomingTasks.map((task) => (
                    <CardItemLinkHighlighted href={`/${lang}/dashboard/task-lists/${task.taskListId}`} key={task.id}>
                        <TaskItemSummary
                            task={task}
                        />
                    </CardItemLinkHighlighted>
                ))}
            </div>
        </DashboardCard>
    );
}