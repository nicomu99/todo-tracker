import { ReactNode } from "react";

type CalenderChevronButtonProps = {
    children: ReactNode;
    onSelect: (weeks: number) => void;
}

export const CalenderChevronButton = ({
  children, onSelect
}: CalenderChevronButtonProps
) => {
    return (
        <button
            type="submit"
            onClick={() => onSelect(1)}
            className={`
                p-3 bg-white/10 rounded-full
                
                transition-all duration-150
                hover:cursor-pointer 
                hover:-translate-y-0.5
                hover:bg-white
                hover:text-black
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                
                active:translate-y-0
                active:text-black
                active:shadow-[0_2px_6px_rgba(0,0,0,0.25)]
            `}
        >
            {children}
        </button>
    );
};