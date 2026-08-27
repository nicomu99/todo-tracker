import Link from "next/link";
import { ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";

type LinkProps = {
    link: string;
    linkText: string;
    className?: string;
    textClassName?: string;
    icon: ReactNode;
}

export default function DashboardLink({
    link, linkText, className, textClassName, icon,
}: LinkProps) {
    const pathname = usePathname();
    const { lang } = useParams();

    const isDashboardRoot = link === `/${lang}/dashboard`;
    const isActive =
        pathname === link ||
        (pathname.startsWith(`${link}/`) && !isDashboardRoot);

    const styling = isActive ?
        "bg-accent/10 font-normal border-accent" :
        "text-text-muted font-light";

    return (
        <Link href={link}
              className={`${className} flex gap-2 items-center px-4 py-2.5 border-b-2 ${styling} hover:brightness-120 transition`}>
            {icon}
            <span className={`${textClassName} leading-none`}>{linkText}</span>
        </Link>
    );
}