"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs({
    ignoreLast,
    labels = {},
}: {
    ignoreLast?: boolean;
    labels?: Record<string, string>;
})  {
    const pathname = usePathname();

    const pathSegments = pathname
        .split("/")
        .filter(Boolean);        // remove empty path segments
    const visibleSegments = ignoreLast
        ? pathSegments.slice(0, -1)
        : pathSegments;

    const breadcrumbLinks = [];
    for (let i = 2; i < visibleSegments.length + 1; i++) {
        breadcrumbLinks.push(visibleSegments.slice(0, i));
    }

    function beautifyLinkText(text: string | undefined) {
        if (text === undefined) {
            return "";
        }
        return text.split("-").join(" ");
    }

    function joinLink(linkSegments: Array<string> | string): string {
        if (typeof linkSegments === "string") {
            return linkSegments;
        }
        return "/" + linkSegments.join("/");
    }

    function getLabel(segment: string): string {
        return labels[segment] ?? beautifyLinkText(segment);
    }

    return (
        <div className="flex flex-row gap-2 capitalize px-4 pb-3">
            {breadcrumbLinks.map((segments,
                i) => {
                const isLast = i === breadcrumbLinks.length - 1;
                const segment = segments.at(-1)!;
                const text = getLabel(segment);

                return (
                    <div key={segments.join("/")} className="flex gap-2">
                        {i > 0 && <span>/</span>}

                        {isLast ? (
                            <p>{text}</p>
                        ) : (
                            <Link href={joinLink(segments)} className={"underline"}>
                                {text}
                            </Link>
                        )}
                    </div>
                );
            })}
        </div>
    );
}