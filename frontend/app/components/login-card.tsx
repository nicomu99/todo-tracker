"use client";

import { useState, MouseEvent, SubmitEvent } from "react";
import { useAuth } from "@/providers/auth-provider";
import Logo from "@/icons/logo";

export default function LoginCard() {
    const [highlightUserName, setHighlightUserName] = useState<boolean>(false);
    const [highlightPassword, setHighlightPassword] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const { invalidCredentialsError, login } = useAuth();

    const usernameStyling = highlightUserName ?
        "border-accent-hover bg-accent/10 focus:bg-surface-hover" :
        "border-text-subtle focus:outline-none focus:border-accent-dark focus:bg-surface-hover";

    const passwordStyling = highlightPassword ?
        "border-accent-hover bg-accent/10 focus:bg-surface-hover" :
        "border-text-subtle focus:outline-none focus:border-accent-dark focus:bg-surface-hover";

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        const element = event.currentTarget;
        const rect = event.currentTarget.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const offsetX = ((x / rect.width) - 0.5) * 10;
        const offsetY = ((y / rect.height) - 0.5) * 10;

        element.style.transition = "none";

        element.style.setProperty("--shadow-x", `${offsetX}px`);
        element.style.setProperty("--shadow-y", `${offsetY}px`);
    }

    function handleMouseLeave(event: MouseEvent<HTMLDivElement>) {
        const element = event.currentTarget;

        element.style.transition = "box-shadow 500ms ease-out";

        element.style.setProperty("--shadow-x", `0px`);
        element.style.setProperty("--shadow-y", `8px`);
    }

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const username = formData.get("username");
        const password = formData.get("password");

        if (!username) {
            setUsernameError("Please enter your username");
            setHighlightUserName(true);
            setPasswordError("");
            setHighlightPassword(false);
            return;
        } else {
            setUsernameError("");
            setHighlightUserName(false);
        }
        if (!password) {
            setPasswordError("Please enter your password");
            setHighlightPassword(true);
            return;
        } else {
            setPasswordError("");
            setHighlightPassword(false);
        }

        await login(String(username), String(password));
    }

    return (
        <div className="flex flex-1 flex-col gap-2 items-center">
            <div className="flex flex-1 flex-col gap-3 justify-center items-start max-w-sm">
                <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={`
                            flex flex-col gap-10 p-6 border bg-surface border-text-subtle
                            backdrop-blur-lg
                            shadow-[var(--shadow-x,0px)_var(--shadow-y,8px)_20px_-8px_rgba(104,104,111)]
                        `}>
                    <Logo/>
                    <div className="flex flex-col justify-center gap-5">
                        <h2 className="text-3xl tracking-tight font-semibold translate-y-1/5 text-center">
                            Welcome back!
                        </h2>
                        <p className="text-sm text-center">
                            Don't have an account? <a href="#" className="underline decoration-1">Create a new
                            account now.</a> We promise you will not regret it.
                        </p>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <label className="block">
                                Username
                                <input
                                    className={`block w-full px-3 py-1.5 outline-none box-border border-b-2 ${usernameStyling}`}
                                    type="text" placeholder="Enter your username" name="username"
                                    onChange={() => setHighlightUserName(false)}/>
                            </label>

                            <label className="block">
                                Password
                                <input
                                    className={`block w-full px-3 py-1.5 outline-none box-border border-b-2 ${passwordStyling}`}
                                    type="password" placeholder="Password" name="password"
                                    onChange={() => setHighlightPassword(false)}/>
                            </label>
                            {(usernameError || passwordError || invalidCredentialsError) && (
                                <div
                                    className="flex items-center gap-2 px-3 border-accent-hover box-border border-2 py-2">
                                    <svg className="shrink-0" fill="none" viewBox="0 0 24 24" width={20} height={20}>
                                        <path
                                            fill="#f2555a"
                                            stroke="none"
                                            strokeWidth={0}
                                            strokeLinecap="butt"
                                            strokeLinejoin="miter"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm6.293-3.707a1 1 0 0 1 1.414 0L12 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12 8.293 9.707a1 1 0 0 1 0-1.414Z"
                                        ></path>
                                    </svg>
                                    <p className="leading-none -translate-y-px">
                                        {usernameError} {passwordError} {invalidCredentialsError}
                                    </p>
                                </div>
                            )}
                            <button type="submit"
                                    className="block w-full text-center text-white py-1.5 bg-accent uppercase font-semibold hover:cursor-pointer hover:bg-accent-hover transition-colors">
                                Submit
                            </button>
                        </form>
                        <p className="text-sm">Forgot password? <a href="#" className="underline decoration-1">Click
                            here.</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}