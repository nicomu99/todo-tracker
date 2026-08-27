import { ReactNode } from "react";

export default function Button({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <button type="submit"
                className="
                    block w-full py-1.5 rounded-xl
                    text-center text-white uppercase font-semibold
                    bg-accent

                    transition-all duration-150
                    hover:cursor-pointer
                    hover:-translate-y-0.5
                    hover:bg-white
                    hover:text-black
                    hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]

                    active:translate-y-0
                    active:bg-accent
                    active:text-white
                    active:shadow-[0_2px_6px_rgba(0,0,0,0.25)]
                "
        >
            {children}
        </button>
    );
}