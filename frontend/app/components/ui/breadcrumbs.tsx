import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const pathSegments = pathname
        .split("/")
        .filter(Boolean);        // remove empty path segments

    const breadcrumbLinks = [];
    for (let i = 2; i < pathSegments.length + 1; i++) {
        breadcrumbLinks.push(pathSegments.slice(0, i));
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

    return (
        <div className="flex flex-row gap-2 capitalize px-4 pb-3">
            {breadcrumbLinks.map((segments,
                i) => {
                const isLast = i === breadcrumbLinks.length - 1;
                const text = beautifyLinkText(segments.at(-1));

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