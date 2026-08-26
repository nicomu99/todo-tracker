import CardIcon from "@/components/ui/card-icon";
import CardTitle from "@/components/ui/card-title";
import DashboardCard from "@/components/ui/dashboard-card";
import ClockIcon from "@/icons/clock-icon";
import TaskItemButtonHighlighted from "@/components/ui/task-item-button-highlighted";

export default function UpcomingTasksOverview() {
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
                <TaskItemButtonHighlighted
                    taskTitle="Complete Chapter 2"
                    dueDate={"Aug 30"} dueTime={"14:15 PM"}
                    priority={1}
                />
                <TaskItemButtonHighlighted
                    taskTitle="Send Chapter 3"
                    dueDate={"Aug 21"} dueTime={"11:30 AM"}
                    priority={3}
                />
                <TaskItemButtonHighlighted
                    taskTitle="Pack Suitcase"
                    dueDate={"Sep 21"} dueTime={"18:00 PM"}
                    priority={1}
                />
                <TaskItemButtonHighlighted
                    taskTitle="Exercise"
                    dueDate={"Aug 24"} dueTime={"09:00 AM"}
                    priority={2}
                />
            </div>
        </DashboardCard>
    );
}