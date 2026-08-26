import { ReactNode } from "react";

export default function PageTitle({children}: { children: ReactNode }) {
    return (
        <h1 className="font-semibold text-2xl">
            {children}
        </h1>
    )
}