import { ReactNode } from "react";


type CardProps = {
    children: ReactNode;
}

export default function DashboardCard({children}: CardProps) {
    return (
        <div className="bg-surface-hover rounded-2xl p-5">
            {children}
        </div>
    )
}