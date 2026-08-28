import { MouseEventHandler } from "react";

import EditIcon from "@/icons/edit-icon";
import Link from "next/link";

const editControlStyles = `
    group
    flex items-center justify-center gap-2
    bg-positive rounded-xl px-2 py-1 text-black

    transition-all duration-150
    hover:cursor-pointer
    hover:scale-103
    hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]

    active:bg-positive/80
    active:scale-100
`;

export function EditButton({
    onClick,
}: {
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
            className={editControlStyles}
            onClick={onClick}
        >
            <EditIcon className="transition-all duration-150 group-active:scale-90"/>
            Edit
        </button>
    );
}

export function EditLink({
    href,
}: {
    href: string;
}) {

    return (
        <Link
            className={editControlStyles}
            href={href}
        >
            <EditIcon className="transition-all duration-150 group-active:scale-90"/>
            Edit
        </Link>
    );

}