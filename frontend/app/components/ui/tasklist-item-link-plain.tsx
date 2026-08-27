import CardItemLinkPlain from "@/components/ui/card-item-link-plain";
import { TaskList, useTasks } from "@/providers/task-provider";
import { useParams } from "next/navigation";

type TaskListItemButtonPlainProps = {
    taskList: TaskList;
}

export default function TasklistItemLinkPlain({ taskList }: TaskListItemButtonPlainProps) {
    const { lang } = useParams();
    const { tasks } = useTasks();
    const listTasks = tasks.filter(
        task => task.taskListId === taskList.id && !task.completed
    )

    return (
        <CardItemLinkPlain href={`/${lang}/dashboard/task-lists/${taskList.id}`}>
            <div className="flex flex-row items-center gap-3">
                <img
                    src="/flower-image.jpg"
                    alt="Flower Image"
                    className="
                        w-10 rounded-md brightness-80
                        flex items-center justify-center
                        transition-all duration-200

                        group-hover:scale-110
                        group-hover:bg-accent-hover/40
                        group-hover:shadow-sm
                        group-hover:border-solid

                        group-active:scale-95
                        group-active:bg-accent
                        group-active:text-background
                        "
                />
                <p>{taskList.name}</p>
            </div>
            <p className={"text-text-muted font-light"}>{listTasks.length} open tasks</p>
        </CardItemLinkPlain>
    );
}