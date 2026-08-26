"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { TaskProvider } from "@/providers/task-provider";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, user, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <TaskProvider>
            <div className="flex min-h-screen">
                <Sidebar/>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </TaskProvider>
    );
}