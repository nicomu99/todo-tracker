import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex flex-row items-center justify-center gap-2">
            <Image
                className="h-7 w-auto"
                src="/logo.png"
                alt="Task logo"
                width={100}
                height={100}
                priority
            />
            <p className="text-2xl font-bold font-mono tracking-tight text-accent">
                Questlog
            </p>
        </div>
    );
}