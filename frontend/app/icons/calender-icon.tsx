import type { SVGProps } from "react";

export default function CalenderIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" {...props}>
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v6.375l-2 2V10H5v10h6.2l2 2zm11.55.5L13 18.95l1.4-1.4l2.125 2.125l4.25-4.25l1.4 1.425z" />
        </svg>
    )
}