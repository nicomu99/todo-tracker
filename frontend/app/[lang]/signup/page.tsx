import SignUpView from "@/components/sign-up-view";

export default function SignUpPage() {
    return (
        <div className="flex flex-1 flex-col gap-8 md:flex-row justify-center bg-background p-4">
            <div
                className="flex flex-1 justify-center items-center">
                <div className="flex flex-col items-start justify-center gap-8">
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