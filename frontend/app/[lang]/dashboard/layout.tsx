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
            <div className="min-h-screen">
                <Sidebar/>
                <main className="flex-1 bg-background p-4 md:ml-74 md:mt-10 md:mr-10">
                    {children}
                </main>
            </div>
        </TaskProvider>
    );
}