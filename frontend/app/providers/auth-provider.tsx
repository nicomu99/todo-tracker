"use client";

import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type User = {
    id: number
    username: string
    fullName: string
}

type AuthContextType = {
    user: User | null
    accessToken: string | null
    isLoading: boolean
    invalidCredentialsError: string | null
    login: (username: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [invalidCredentialsError, setInvalidCredentialsError] = useState<string | null>(null);
    const router = useRouter();

    const { lang } = useParams();

    async function login(username: string, password: string) {
        setInvalidCredentialsError(null);

        try {
            const body = new URLSearchParams();
            body.append("username", String(username));
            body.append("password", String(password));

            const response = await fetch("http://localhost:8000/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body,
                credentials: "include",
            });

            if (!response.ok) {
                setInvalidCredentialsError("Invalid username or password");
                return;
            }

            const data = await response.json();
            setAccessToken(data.access_token);

            await fetchAndSetUser(data.access_token);
            router.replace(`/${lang}/dashboard`);
        } finally {
            setIsLoading(false);
        }
    }

    async function restoreSession() {
        try {
            const response = await fetch("http://localhost:8000/auth/refresh/", {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) {
                console.error("Something went wrong");
                return;
            }

            const data = await response.json();
            setAccessToken(data.access_token);

            await fetchAndSetUser(data.access_token);
        } catch (error) {
            console.error(error);
            return;
        } finally {
            setIsLoading(false);
        }
    }

    async function logout() {
        setUser(null);
        setAccessToken(null);
    }

    async function fetchAndSetUser(accessToken: string) {
        try {
            const userEndpointResponse = await fetch("http://localhost:8000/users/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!userEndpointResponse.ok) {
                setInvalidCredentialsError("Invalid username or password");
                return;
            }

            const userData = await userEndpointResponse.json();
            const user: User = {
                id: userData.id,
                username: userData.username,
                fullName: userData.full_name,
            };
            setUser(user);
        } catch (error) {
            console.error(error);
            return;
        }

    }

    useEffect(() => {
        void restoreSession();
    }, []);

    return (
        <AuthContext
            value={{
                user,
                accessToken,
                isLoading,
                invalidCredentialsError,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}