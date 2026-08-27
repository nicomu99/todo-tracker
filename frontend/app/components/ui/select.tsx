import { SelectHTMLAttributes, ReactNode } from "react";

type SelectFieldProps = {
    className?: string;
    title: string;
    highlight?: boolean;
    children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;


export default function Select({
    className,
    title,
    highlight = false,
    children,
    ...props
}: SelectFieldProps) {
    const highlightStyling = highlight ?
        "border-accent-hover bg-accent/10 focus:bg-surface-hover" :
        "border-text-subtle focus:outline-none focus:border-accent-dark focus:bg-white/5";

    return (
        <label className={`block ${className}`}>
            {title}
            <select className={`
                        block w-full px-3 py-1.5
                        outline-none box-border border-b-2
                        
                        ${highlightStyling}
                    `}
                    {...props}>
                {children}
            </select>
        </label>
    );
}