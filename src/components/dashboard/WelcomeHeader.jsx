"use client";

import { authClient } from "@/lib/auth-client";

export default function WelcomeHeader() {
    const { data: session } = authClient.useSession();

    return (
        <>
            {session?.user && (
                <div>
                    {/* Welcome Header */}
                    <h1 className="text-3xl font-semibold tracking-tight text-white">
                        Welcome back, {session.user.name}
                    </h1>
                </div>
            )}
        </>
    );
}
