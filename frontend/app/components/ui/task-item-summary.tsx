import PriorityIndicator from "@/components/ui/priority-indicator";
import { Task } from "@/providers/task-provider";

export default function TaskItemSummary({
    task,
    showEditButton,
    onClick,
}: {
    task: Task;
    showEditButton?: boolean;
    onClick?: () => void;
}) {
    const dateString = task.dueDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
    const timeString = task.dueDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="w-full flex flex-row items-center justify-between gap-3">
            <div className={`
                flex flex-col items-start
            `}>
                <p className="text-">{task.name}</p>
                <div className="flex flex-row items-center gap-1 text-xs text-text-muted">
                    <p>{dateString}</p>
                    <span className="w-0.5 h-0.5 rounded-full bg-text-muted"/>
                    <p>{timeString}</p>
                </div>
            </div>
            {showEditButton && (
                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        if (onClick) {
                            onClick();
                        }
                    }}
                    className={`ml-auto mr-4`}
                >
                    Edit
                </button>
            )}

            <PriorityIndicator priority={task.priority}/>
        </div>
    );
}