import { ReactNode } from "react";
import Link from "next/link";

type CardItemButtonPlainProps = {
    children: ReactNode;
    href: string;
}

export default function CardItemLinkPlain({
    children,
    href,
}: CardItemButtonPlainProps) {
    return (
        <div className={`flex items-center justify-between`}>
            <Link className={`
                px-5 py-3 group w-full
                flex flex-row items-center justify-between gap-3
                rounded-md

                transition-all duration-150
                hover:cursor-pointer 
                hover:-translate-y-0.5
                hover:bg-surface-hover
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                
                active:translate-y-0
                active:shadow-[0_2px_6px_rgba(0,0,0,0.25)]
            `} href={`${href}`}>
                {children}
            </Link>
        </div>
    );
}