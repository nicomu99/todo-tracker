import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import { SubmitEvent, useState } from "react";
import { TaskCreate, useTasks } from "@/providers/task-provider";
import CheckIcon from "@/icons/check-icon";

export default function CreateTaskView({
    taskListId,
}: {
    taskListId: number;
}) {
    const { createTask } = useTasks();
    const [errors, setErrors] = useState<{
        taskName?: string;
        taskDescription?: string;
        taskDueDate?: string;
    }>({});
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const taskListId = formData.get("task-list-id");
        const taskName = String(formData.get("task-name"));
        const taskDescription = String(formData.get("task-description"));
        const taskPriority = formData.get("task-priority");
        const taskEffort = formData.get("task-effort");
        const taskDueDate = String(formData.get("task-dueDate"));

        const newErrors: {
            taskName?: string;
            taskDescription?: string;
            taskDueDate?: string;
        } = {};

        if (!taskName.trim()) {
            newErrors.taskName = "Please enter a valid task name.";
        }

        if (!taskDescription.trim()) {
            newErrors.taskDescription = "Please enter a valid task description.";
        }

        if (!taskDueDate) {
            newErrors.taskDueDate = "Please enter a valid task due date.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        if (!taskListId) {
            setErrorMessage("Could not update task.");
            return;
        }

        const newTask: TaskCreate = {
            task_list_id: Number(taskListId),
            name: taskName,
            description: taskDescription,
            priority: Number(taskPriority),
            effort: Number(taskEffort),
            due_date: new Date(taskDueDate).toISOString(),
        };


        try {
            await createTask(newTask);
            setSuccessMessage("The task has been created successfully.");
        } catch {
            setErrorMessage("Could not create task.");
        }
    }

    return (
        <div className="mb-3">
            {successMessage ?
                <div className="flex flex-col items-center justify-center gap-5">
                    <CheckIcon className="text-positive" width="5em" height="5em"/>
                    <p className="leading-none text-lg">
                        {successMessage}
                    </p>
                </div>
                :
                <form
                    className="flex flex-col gap-6 max-w-md"
                    onSubmit={handleSubmit}
                >
                    <Input
                        name="task-name" title="Task Title" placeholder="Task Title" type="text"
                        error={errors.taskName}
                        onChange={() => {
                            if (errors.taskName) {
                                setErrors(prev => ({
                                    ...prev,
                                    taskName: undefined,
                                }));
                            }
                        }}
                    />
                    <Input
                        name="task-description" title="Description" placeholder="Description" type="text"
                        error={errors.taskDescription}
                        onChange={() => {
                            if (errors.taskDescription) {
                                setErrors(prev => ({
                                    ...prev,
                                    taskDescription: undefined,
                                }));
                            }
                        }}
                    />
                    <Select title="Priority" name="task-priority">
                        <option value={1} className={"bg-accent-hover"}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                    </Select>
                    <Input name="task-effort" title="Effort" type="range" min="0" max="3"/>
                    <Input
                        name="task-dueDate"
                        title="Task Due"
                        type="datetime-local"
                        error={errors.taskDueDate}
                        onChange={() => {
                            if (errors.taskDueDate) {
                                setErrors(prev => ({
                                    ...prev,
                                    taskDueDate: undefined,
                                }));
                            }
                        }}
                    />
                    <input type="hidden" name={"task-list-id"} value={taskListId}/>
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
    );
}