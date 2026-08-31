import SignUpView from "@/components/sign-up-view";

export default function SignUpPage() {
    return (
        <div className="flex flex-1 flex-row justify-center bg-background font-sans">
            <div
                className="flex flex-1 justify-center items-center sm:items-center">
                <div className="flex flex-col items-start justify-center gap-8 translate-y-32">
                    <h1 className="max-w-xl text-6xl font-bold tracking-tight text-accent">
                        Small quests. Big progress.
                    </h1>
                    <p className="max-w-2xl text-xl">
                        If life gives you side quests, keep track of them. Turn your life into your own adventure
                        role-playing game.
                    </p>
                </div>
            </div>
            <SignUpView/>
        </div>
    );
}