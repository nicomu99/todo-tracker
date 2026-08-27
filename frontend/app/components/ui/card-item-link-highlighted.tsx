import { ReactNode } from "react";
import Link from "next/link";

export default function CardItemLinkHighlighted({
    children,
    href,
}: {
    children: ReactNode,
    href: string,
}) {
    return (
        <Link
            className={`
                px-5 py-3 group w-full
                flex items-center justify-between
                bg-white/20
                rounded-xl
    
                transition-all duration-150
                hover:cursor-pointer 
                hover:-translate-y-0.5
                hover:bg-white
                hover:text-black
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                
                active:translate-y-0
                active:shadow-[0_2px_6px_rgba(0,0,0,0.25)]
            `}
            href={href}
        >
            {children}
        </Link>
    );
}