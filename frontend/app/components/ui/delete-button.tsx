import { MouseEventHandler } from "react";

import DeleteIcon from "@/icons/delete-icon";

const editControlStyles = `
    group
    flex items-center justify-center gap-2
    bg-negative rounded-xl px-2 py-1 text-black

    transition-all duration-150
    hover:cursor-pointer
    hover:scale-103
    hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]

    active:bg-positive/80
    active:scale-100
`;

export function DeleteButton({
    onClick,
}: {
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
            className={editControlStyles}
            onClick={onClick}
        >
            <DeleteIcon className="transition-all duration-150 group-active:scale-90"/>
            Delete
        </button>
    );
}