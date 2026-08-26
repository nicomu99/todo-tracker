type CalenderDayProps = {
    date: Date;
    active: boolean;
    onSelect: (date: Date) => void;
}

export default function CalenderDay({ date, active, onSelect }: CalenderDayProps) {
    const dayString = date.toLocaleDateString("en-US", {
        weekday: "short",
    });
    const day = date.getDate();
    const divStyling = active ?
        "bg-white text-accent" :
        "";

    return (
        <button
            onClick={() => onSelect(date)}
            className={`
                ${divStyling}
                w-16 py-1
                rounded-md
                
                transition-all duration-150
                hover:cursor-pointer 
                hover:-translate-y-0.5
                hover:bg-white
                hover:text-accent-hover
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                
                active:translate-y-0
                active:text-black
                active:shadow-[0_2px_6px_rgba(0,0,0,0.25)]
            `}
        >
            <p className="text-center text-xs text-text-muted">
                {dayString}
            </p>
            <p className="text-center text-xl">
                {day}
            </p>
        </button>
    );
}