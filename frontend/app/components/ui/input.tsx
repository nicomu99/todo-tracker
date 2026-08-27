import { InputHTMLAttributes } from "react";

type InputFieldProps = {
    className?: string;
    title: string;
    highlight?: boolean;
    error?: string
} & InputHTMLAttributes<HTMLInputElement>;


export default function Input({
    className,
    title,
    highlight = false,
    error,
    ...props
}: InputFieldProps) {
    const highlightStyling = (highlight || error) ?
        "border-accent-hover bg-accent/10 focus:bg-surface-hover" :
        "border-text-subtle focus:outline-none focus:border-accent-dark focus:bg-white/5";

    return (
        <label className={`block ${className} flex flex-col gap-2`}>
            {title}
            <input
                className={`block w-full px-3 py-1.5 outline-none box-border border-b-2 accent-accent ${highlightStyling}`}
                {...props}/>

                {error && (
                    <div
                        className="flex items-center gap-2 px-3 border-accent-hover box-border border-2 py-2">
                        <svg className="shrink-0" fill="none" viewBox="0 0 24 24" width={20} height={20}>
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
                            {error}
                        </p>
                    </div>
                )}
        </label>
    );
}