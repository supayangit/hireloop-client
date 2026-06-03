import React, { Suspense } from 'react';
import StatsSection from '@/components/dashboard/StatsSection';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';

// Simulating a fast database/API fetch that returns a Promise
async function getDashboardStats() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                totalJobPosts: 48,
                totalApplicants: 1284,
                activeJobs: 18,
                jobsClosed: 32,
            });
        }, 100); // Small delay to mimic an async cycle
    });
}

export default async function RecruiterDashboardPage() {
    // Initiating the promise data fetch
    const statsDataPromise = getDashboardStats();

    return (
        <main className="min-h-screen bg-[#09090b] text-white p-8 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Welcome Header wrapped in Client Component for session access */}
                <WelcomeHeader />

                {/* Stats Section wrapped inside React Suspense for clean streaming UI */}
                <Suspense fallback={<StatsSkeleton />}>
                    <StatsSection statsPromise={statsDataPromise} />
                </Suspense>

            </div>
        </main>
    );
}

// Visual loading placeholder skeleton while the promise finishes resolving
function StatsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full animate-pulse">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-[#131315] border border-[#222226] rounded-xl p-6 min-h-[160px]" />
            ))}
        </div>
    );
}