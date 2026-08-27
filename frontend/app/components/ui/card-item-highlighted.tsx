import { ReactNode } from "react";


export default function CardItemHighlighted({
    children,
    onSelect
}: {
    children: ReactNode;
    onSelect: () => void;
}) {
    return (
        <div
            className={`
                px-5 py-3 group w-full
                flex flex-col items-center justify-between
                rounded-xl bg-white/20
    
                transition-all duration-150
                hover:cursor-pointer 
                hover:-translate-y-0.5
                hover:bg-white
                hover:text-black
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                
                active:translate-y-0
                active:shadow-[0_2px_6px_rgba(0,0,0,0.25)]
            `}
            onClick={onSelect}
        >
            {children}
        </div>
    )
}