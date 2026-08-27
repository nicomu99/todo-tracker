import { Task } from "@/providers/task-provider";
import TaskItemSummary from "@/components/ui/task-item-summary";
import { useState } from "react";
import CardItemButtonHighlighted from "@/components/ui/card-item-button-highlighted";

export default function TaskListItemDetail({
    task,
}: {
    task: Task;
}) {
    const [selected, setSelected] = useState(false);

    return (
        <CardItemButtonHighlighted
            onSelect={() => setSelected(prev => !prev)}
        >
            <TaskItemSummary task={task}/>

            <div
                className={`
                grid w-full transition-all duration-300 ease-in-out
                ${selected
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }
            `}
            >
                <div className="overflow-hidden">
                    <div className="pt-3 text-left">
                        {task.description}
                    </div>
                </div>
            </div>
        </CardItemButtonHighlighted>
    );
}