"use client";

import { SubmitEvent, useEffect, useState } from "react";
import { useAuth, UserUpdate } from "@/providers/auth-provider";
import Input from "@/components/ui/input";
import CheckIcon from "@/icons/check-icon";
import Button from "@/components/ui/button";
import ErrorMessageView from "@/components/ui/error-message-view";

export default function SettingsView() {
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const { user, updateProfile } = useAuth();

    useEffect(() => {
        if (user) {
            setUserName(user.username);
            setEmail(user.email);
            setFullName(user.fullName);
        }
    }, [user]);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const userUpdate: UserUpdate = {
            username: userName || undefined,
            password: password || undefined,
            email: email || undefined,
            full_name: fullName || undefined,
        };

        if (!user) {
            setErrorMessage("User could not be updated.");
            return;
        }

        try {
            await updateProfile(userUpdate);
            setSuccessMessage("The user has been updated.");
        } catch {
            setErrorMessage("User could not be updated.");
        }
    }

    return (
        <div>
            {successMessage ?
                <div className="flex flex-col items-center justify-center gap-5">
                    <CheckIcon className="text-positive" width="5em" height="5em"/>
                    <p className="leading-none text-lg">
                        {successMessage}
                    </p>
                </div>
                :
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md">
                    <Input
                        name="username"
                        title={"Username"}
                        type="text"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <Input
                        name="password"
                        title={"Password"}
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Input
                        name="email"
                        title={"Email"}
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Input
                        name="full-name"
                        title={"Full Name"}
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                    <Button>
                        Update User
                    </Button>
                    {errorMessage && (
                        <ErrorMessageView error={errorMessage} />
                    )}
                </form>
            }
        </div>
    );
}