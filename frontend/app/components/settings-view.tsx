"use client";

import { useAuth, UserUpdate } from "@/providers/auth-provider";
import { SubmitEvent, useEffect, useState } from "react";
import CheckIcon from "@/icons/check-icon";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import ErrorMessageView from "@/components/ui/error-message-view";

export default function SettingsView() {
    const { user, updateProfile } = useAuth();

    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");

    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

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
            email: email || undefined,
            fullName: fullName || undefined,
            password: password || undefined,
        }

        if (!user) {
            setErrorMessage("Could not update user.");
            return;
        }

        try {
            await updateProfile(user.id, userUpdate);
            setSuccessMessage("User updated successfully.");
        } catch {
            setErrorMessage("Could not update user.");
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
                <form
                    className="flex flex-col gap-6 max-w-md"
                    onSubmit={handleSubmit}
                >
                    <Input
                        name="username" title="Username" type="text" highlight={false} value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <Input
                        name="email" title="Email" type="email" value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Input
                        name="password" title="Password" type="password" value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Input
                        name="full-name" title="Full Name" type="text" value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />

                    <Button>
                        Update User
                    </Button>
                    {errorMessage && (
                        <ErrorMessageView error={errorMessage}/>
                    )}
                </form>
            }
        </div>
    );
}