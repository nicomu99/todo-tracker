import CardItemButtonPlain from "@/components/ui/card-item-button-plain";

type TaskListItemButtonPlainProps = {
    taskTitle: string;
    openTasksCount: number;
}

export default function TasklistItemButtonPlain({ taskTitle, openTasksCount }: TaskListItemButtonPlainProps) {
    return (
        <CardItemButtonPlain>
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
                <p>{taskTitle}</p>
            </div>
            <p className={"text-text-muted font-light"}>{openTasksCount} open tasks</p>
        </CardItemButtonPlain>
    );
}