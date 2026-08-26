import { ReactNode } from "react";

type CardTitleProps = {
    children: ReactNode;
}

export default function CardTitle({children}: CardTitleProps) {
    return (
        <h3 className="font-semibold text-lg">
            {children}
        </h3>
    )
}