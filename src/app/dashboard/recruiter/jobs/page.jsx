import React from "react";
import { getJobs } from "../../../../lib/actions/jobs";
import JobCard from "../../../../components/dashboard/JobCard";
import Link from "next/link";
import { FiPlus } from 'react-icons/fi';
import { Button } from '@heroui/react';

const RecruiterJobsPage = async () => {
    const jobs = await getJobs();

    return (
        <div className="p-8 md:p-12">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-white">
                        Jobs
                    </h1>

                    <p className="mt-2 text-zinc-400 text-lg">
                        Manage and review your posted roles
                    </p>
                </div>

                <Link href="/dashboard/recruiter/post">
                    <Button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                        <FiPlus />
                        Post a Job
                    </Button>
                </Link>
            </div>

            {/* Jobs Grid */}
            {jobs?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {jobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            ) : (
                <div
                    className="
            rounded-[24px]
            border
            border-white/[0.08]
            bg-gradient-to-b
            from-[#1d1d1d]
            to-[#171717]
            p-12
            text-center
          "
                >
                    <h3 className="text-xl font-semibold text-white">
                        No jobs found
                    </h3>

                    <p className="mt-2 text-zinc-400">
                        Create your first job posting to get started.
                    </p>
                </div>
            )}
        </div>
    );
};

export default RecruiterJobsPage;