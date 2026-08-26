export default function Input({
    className,
    name,
    title,
    placeholder,
    highlight
}: {
    className?: string,
    name?: string,
    title?: string,
    placeholder?: string,
    highlight: boolean
}) {
    const highlightStyling = highlight ?
        "border-accent-hover bg-accent/10 focus:bg-surface-hover" :
        "border-text-subtle focus:outline-none focus:border-accent-dark focus:bg-white/5";

    return (
        <label className={`block ${className}`}>
            {title}
            <input
                className={`block w-full px-3 py-1.5 outline-none box-border border-b-2 ${highlightStyling}`}
                type="text" placeholder={placeholder} name={name}/>
        </label>
    );
}