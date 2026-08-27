import { Task, TaskUpdate, useTasks } from "@/providers/task-provider";
import TaskItemSummary from "@/components/ui/task-item-summary";
import { SubmitEvent, useState } from "react";
import CardItemHighlighted from "@/components/ui/card-item-highlighted";
import Input from "@/components/ui/input";
import Select from "./select";
import Button from "@/components/ui/button";
import CheckIcon from "@/icons/check-icon";

type TaskItemMode = "collapsed" | "expanded" | "editing";

export default function TaskListItemDetail({
    task,
}: {
    task: Task;
}) {
    const [mode, setMode] = useState<TaskItemMode>("collapsed");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { updateTask, deleteTask } = useTasks();

    function handleEditToggle() {
        setMode("editing");
    }

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const taskListId = formData.get("task-list-id");
        const taskId = formData.get("taskId");
        const taskName = String(formData.get("task-name"));
        const taskDescription = String(formData.get("task-description"));
        const taskPriority = formData.get("task-priority");
        const taskEffort = formData.get("task-effort");
        const taskDueDate = String(formData.get("task-dueDate"));

        if (!taskListId) {
            setErrorMessage("Could not update task.");
            return;
        }

        const taskUpdate: TaskUpdate = {
            task_list_id: Number(taskListId),
            name: taskName || undefined,
            description: taskDescription || undefined,
            priority: taskPriority ? Number(taskPriority) : undefined,
            effort: taskEffort ? Number(taskEffort) : undefined,
            due_date: taskDueDate
                ? new Date(taskDueDate).toISOString()
                : undefined,
        };


        try {
            await updateTask(Number(taskId), taskUpdate);
            setSuccessMessage("The task has been created successfully.");
        } catch {
            setErrorMessage("Could not update task.");
        }
    }

    async function handleDelete(taskId: number) {
        try {
            await deleteTask(taskId);
        } catch {
            setErrorMessage("Could not delete task.");
        }
    }

    return (
        <div className="flex flex-col rounded-xl bg-black">
            <CardItemHighlighted
                onSelect={() => {
                    setMode(prev =>
                        (prev === "expanded" || prev === "editing") ? "collapsed" : "expanded",
                    );
                }}
            >
                <TaskItemSummary
                    task={task}
                    onClickEdit={handleEditToggle}
                    showEditButton
                    onClickDelete={handleDelete}
                    showDeleteButton
                />
            </CardItemHighlighted>

            <div
                className={`
                    grid w-full
                    
                    transition-all duration-300
                    ${mode === "expanded"
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }
                `}
            >
                <div className="overflow-hidden">
                    <div className="text-left py-3 px-5">
                        {task.description}
                    </div>
                </div>
            </div>

            <div
                className={`
                    grid w-full
                    
                    transition-all duration-300
                    ${mode === "editing"
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }
                `}
            >
                <div className="overflow-hidden">
                    <div className="text-left py-3 px-5">
                        {successMessage ?
                            <div className="flex flex-col items-center justify-center gap-5">
                                <CheckIcon className="text-positive" width="5em" height="5em"/>
                                <p className="leading-none text-lg">
                                    The task has been updated successfully.
                                </p>
                            </div>
                            :
                            <form
                                className="flex flex-col gap-6 max-w-md"
                                onSubmit={handleSubmit}
                            >
                                <Input
                                    name="task-name" title="Task Title" placeholder="Task Title" type="text"
                                    highlight={false}
                                />
                                <Input
                                    name="task-description" title="Description" placeholder="Description" type="text"
                                    highlight={false}
                                />
                                <Select title="Priority" highlight={false} name="task-priority">
                                    <option value={1} className={"bg-accent-hover"}>Low</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>High</option>
                                </Select>
                                <Input
                                    name="task-effort"
                                    title="Effort"
                                    type="range"
                                    min="0"
                                    max="3"
                                    highlight={false}
                                />
                                <Input
                                    name="task-dueDate"
                                    title="Task Due"
                                    type="datetime-local"
                                    highlight={false}
                                />
                                <input type="hidden" name={"task-id"} value={task.id}/>
                                <input type="hidden" name={"task-list-id"} value={task.taskListId}/>
                                <Button>
                                    Save Task
                                </Button>
                                {errorMessage && (
                                    <div
                                        className="flex items-center gap-2 px-3 border-accent-hover box-border border-2 py-2"
                                    >
                                        <svg
                                            className="shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            width={20}
                                            height={20}
                                        >
                                            <path
                                                fill="#f2555a"
                                                stroke="none"
                                                strokeWidth={0}
                                                strokeLinecap="butt"
                                                strokeLinejoin="miter"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm6.293-3.707a1 1 0 0 1 1.414 0L12 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12 8.293 9.707a1 1 0 0 1 0-1.414Z"
                                            ></path>
                                        </svg>
                                        <p className="leading-none -translate-y-px">
                                            {errorMessage}
                                        </p>
                                    </div>
                                )}
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}