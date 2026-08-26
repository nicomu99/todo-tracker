import { ReactNode } from "react";

type CardProps = {
    children: ReactNode
}

export default function CardIcon({ children }: CardProps) {
    return (
        <div className="rounded-full bg-linear-to-br from-accent via-accent/50 to-transparent p-px shadow-md shadow-black/40">
            <div className="rounded-full bg-background p-3">
                {children}
            </div>
        </div>
    );
}