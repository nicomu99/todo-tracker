type Priority = 1 | 2 | 3;

const priorityConfig = {
    1: {
        label: "Low",
        className: "flex bg-positive",
    },
    2: {
        label: "Medium",
        className: "flex bg-neutral",
    },
    3: {
        label: "High",
        className: "flex bg-negative",
    },
}

export default function PriorityIndicator({priority}: {priority: Priority}) {
    const config = priorityConfig[priority];

    return (
        <div className="w-20 flex justify-center">
            <span className={`px-2 py-1 rounded-full text-sm text-black ${config.className}`}>
                {config.label}
            </span>
        </div>
    );
}