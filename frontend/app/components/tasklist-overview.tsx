import CardTitle from "@/components/ui/card-title";
import TaskListIcon from "@/icons/tasklist-icon";
import DashboardCard from "@/components/ui/dashboard-card";
import CardIcon from "@/components/ui/card-icon";
import TasklistItemButtonPlain from "@/components/ui/tasklist-item-button-plain";
import CardItemButtonPlain from "@/components/ui/card-item-button-plain";

export default function TaskListOverview() {
    return (
        <DashboardCard>
            <div className="flex flex-row items-center gap-8 mb-4">
                <CardIcon>
                    <TaskListIcon/>
                </CardIcon>
                <CardTitle>
                    Task Lists
                </CardTitle>
            </div>
            <div className="divide-y divide-text-muted/40">
                <CardItemButtonPlain>
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
                        <p className="transition-colors duration-200 group-hover:text-accent-hover">Add new task list</p>
                    </div>
                </CardItemButtonPlain>
                <TasklistItemButtonPlain taskTitle="Grocery Shopping"
                                         openTasksCount={4}/> {/* TODO: Should be able to pass in task list (or maybe only id)?*/}
                <TasklistItemButtonPlain taskTitle="Master Thesis" openTasksCount={9}/>
            </div>
        </DashboardCard>
    );
}