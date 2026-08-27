import PriorityIndicator from "@/components/ui/priority-indicator";
import { Task } from "@/providers/task-provider";

export default function TaskItemSummary({
    task,
    showEditButton,
    showDeleteButton,
    onClickEdit,
    onClickDelete,
}: {
    task: Task;
    showEditButton?: boolean;
    showDeleteButton?: boolean;
    onClickEdit?: () => void;
    onClickDelete?: (taskId: number) => void;
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
            <div
                className={`
                flex flex-col items-start
            `}
            >
                <p className="text-">{task.name}</p>
                <div className="flex flex-row items-center gap-1 text-xs text-text-muted">
                    <p>{dateString}</p>
                    <span className="w-0.5 h-0.5 rounded-full bg-text-muted"/>
                    <p>{timeString}</p>
                </div>
            </div>

            <div className={"flex flex-row gap-3"}>
                {showEditButton && (
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            if (onClickEdit) {
                                onClickEdit();
                            }
                        }}
                        className={`w-20`}
                    >
                        Edit
                    </button>
                )}
                {showDeleteButton && (
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            if (onClickDelete) {
                                onClickDelete(task.id);
                            }
                        }}
                        className={`w-20`}
                    >
                        Delete
                    </button>
                )}

                <PriorityIndicator priority={task.priority}/>
            </div>
        </div>
    );
}