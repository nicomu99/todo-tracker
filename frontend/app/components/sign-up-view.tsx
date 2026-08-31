"use client";

import { useAuth, UserCreate } from "@/providers/auth-provider";
import { SubmitEvent, useState } from "react";
import Logo from "@/icons/logo";
import CheckIcon from "@/icons/check-icon";
import Input from "@/components/ui/input";
import ErrorMessageView from "@/components/ui/error-message-view";
import { useParams } from "next/navigation";

export default function SignUpView() {
    const { createProfile } = useAuth();
    const { lang } = useParams();

    const [errors, setErrors] = useState<{
        username?: string;
        email?: string;
        password?: string;
        fullName?: string;
    }>({});

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const username = String(formData.get("username"));
        const password = String(formData.get("password"));
        const email = String(formData.get("email"));
        const fullName = String(formData.get("full-name"));

        const newErrors: {
            username?: string;
            email?: string;
            password?: string;
            fullName?: string;
        } = {};

        if (!username.trim()) {
            newErrors.username = "Please enter a valid user name.";
        }
        if (!password.trim()) {
            newErrors.password = "Please enter a password";
        }
        if (!email.trim()) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!fullName.trim()) {
            newErrors.fullName = "Please enter a valid full name.";
        }

        setErrors(newErrors);

        console.log(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const newUser: UserCreate = {
            username: username,
            password: password,
            email: email,
            full_name: fullName,

        }

        try {
            await createProfile(newUser);
            setSuccessMessage("New user successfully created.");
            setErrorMessage("");
        } catch {
            setErrorMessage("Could not create new profile.");
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-2 items-center">
            <div className="flex flex-1 flex-col gap-3 justify-center items-start">
                <div
                    className={`
                            flex flex-col gap-10 p-6 border bg-surface border-text-subtle
                            backdrop-blur-lg w-md
                            shadow-[var(--shadow-x,0px)_var(--shadow-y,8px)_20px_-8px_rgba(104,104,111)]
                        `}>
                    <Logo/>
                    <div className="flex flex-col justify-center gap-5">
                        <h2 className="text-3xl tracking-tight font-semibold translate-y-1/5 text-center">
                            Create new account
                        </h2>
                        {successMessage ?
                            <div className="flex flex-col items-center justify-center gap-5">
                                <CheckIcon className="text-positive" width="5em" height="5em"/>
                                <p className="leading-none text-lg">
                                    {successMessage}
                                </p>
                            </div>
                            :
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <Input
                                    name="username" title="Username" placeholder="Username" type="text"
                                    error={errors.username}
                                    onChange={() => {
                                        if (errors.username) {
                                            setErrors(prev => ({
                                                ...prev,
                                                username: undefined,
                                            }));
                                        }
                                    }}
                                />

                                <Input
                                    name="email" title="Email" placeholder="me@example.com" type="email"
                                    error={errors.email}
                                    onChange={() => {
                                        if (errors.email) {
                                            setErrors(prev => ({
                                                ...prev,
                                                email: undefined,
                                            }));
                                        }
                                    }}
                                />

                                <Input
                                    name="password" title="Password" placeholder="******" type="password"
                                    error={errors.password}
                                    onChange={() => {
                                        if (errors.password) {
                                            setErrors(prev => ({
                                                ...prev,
                                                password: undefined,
                                            }));
                                        }
                                    }}
                                />

                                <Input
                                    name="full-name" title="Full Name" placeholder="Jane Doe" type="text"
                                    error={errors.fullName}
                                    onChange={() => {
                                        if (errors.fullName) {
                                            setErrors(prev => ({
                                                ...prev,
                                                fullName: undefined,
                                            }));
                                        }
                                    }}
                                />
                                {errorMessage && (
                                    <ErrorMessageView error={errorMessage} />
                                )}
                                <button type="submit"
                                        className="block w-full text-center text-white py-1.5 bg-accent uppercase font-semibold hover:cursor-pointer hover:bg-accent-hover transition-colors">
                                    Submit
                                </button>
                            </form>
                        }
                        <p className="text-sm">Already have an account? <a href={`/${lang}/`} className="underline decoration-1">Click
                            here.</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}