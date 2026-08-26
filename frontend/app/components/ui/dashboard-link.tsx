import Link from "next/link";
import {ReactNode} from "react";
import {usePathname} from "next/navigation";

type LinkProps = {
    link: string;
    linkText: string;
    className?: string;
    textClassName?: string;
    icon: ReactNode;
}

export default function DashboardLink({
    link, linkText, className, textClassName, icon
}: LinkProps) {
    const pathname = usePathname();
    const isActive = pathname === link;

    const styling = isActive ?
        "bg-accent/10 font-normal border-b-2 border-accent" :
        "text-text-muted font-light";

    return (
        <Link href={link} className={`${className} flex gap-2 items-center px-4 py-2.5 ${styling} hover:brightness-120 transition`}>
            {icon}
            <span className={`${textClassName} leading-none`}>{linkText}</span>
        </Link>
    )
}