import CardIcon from "@/components/ui/card-icon";
import CardTitle from "@/components/ui/card-title";
import DashboardCard from "@/components/ui/dashboard-card";
import ClockIcon from "@/icons/clock-icon";
import TaskItemButtonHighlighted from "@/components/ui/task-item-button-highlighted";
import { useTasks } from "@/providers/task-provider";

export default function UpcomingTasksOverview() {
    const { tasks } = useTasks();
    const upcomingTasks = tasks
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
                    <TaskItemButtonHighlighted
                        key={task.id}
                        task={task}
                    />
                ))}
            </div>
        </DashboardCard>
    );
}