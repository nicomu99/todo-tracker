import CardItemButtonHighlighted from "@/components/ui/card-item-button-highlighted";
import PriorityIndicator from "@/components/ui/priority-indicator";

type TaskItemButtonHighlightedProps = {
    taskTitle: string;
    dueDate: string;
    dueTime: string;
    priority: 1 | 2 | 3;
}

export default function TaskItemButtonHighlighted({ taskTitle, dueDate, dueTime, priority }: TaskItemButtonHighlightedProps) {
    return (
        <CardItemButtonHighlighted>
            <div className="w-full flex flex-row items-center justify-between gap-3">
                <div className="flex flex-col items-start">
                    <p className="text-">{taskTitle}</p>
                    <div className="flex flex-row items-center gap-1 text-xs text-text-muted">
                        <p>{dueDate}</p>
                        <span className="w-0.5 h-0.5 rounded-full bg-text-muted" />
                        <p>{dueTime}</p>
                    </div>
                </div>
                <PriorityIndicator priority={priority} />
            </div>
        </CardItemButtonHighlighted>
    );
}