import React from "react";
import { getJobs } from "../../../../lib/actions/jobs";
import JobListRow from "../../../../components/dashboard/JobListRow";
import { getCompanies } from "../../../../lib/actions/company";
import { getUserSession } from '@/lib/core/session';
import Link from "next/link";
import { FiPlus } from 'react-icons/fi';
import { Button } from '@heroui/react';

const RecruiterJobsPage = async () => {
    const jobs = await getJobs();
    const user = await getUserSession();
    const recruiterId = user?.id || user?._id || null;
    const companies = await getCompanies(recruiterId);

    const companyMap = new Map((companies || []).map((c) => [c._id || c.id, c]));
    const jobsWithCompany = (jobs || []).map((j) => ({
        ...j,
        companyName:
            (companyMap.get(j.companyId)?.name) ||
            (companyMap.get(j.companyId)?.companyName) ||
            null,
    }));

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

            {/* Jobs Table */}
            {jobsWithCompany?.length > 0 ? (
                <div className="overflow-x-auto rounded-[16px] border border-white/[0.06] bg-gradient-to-b from-[#1d1d1d] to-[#171717]">
                    <table className="min-w-full">
                        <thead>
                            <tr className="text-left text-zinc-400 text-sm border-b border-white/[0.04]">
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Company</th>
                                <th className="px-4 py-3">Deadline</th>
                                <th className="px-4 py-3">Created at</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Updated at</th>
                                <th className="px-4 py-3 text-right">Delete</th>
                                <th className="px-4 py-3 text-right">Edit</th>
                            </tr>
                        </thead>

                        <tbody>
                            {jobsWithCompany.map((job) => (
                                <JobListRow key={job._id} initialJob={job} companies={companies} />
                            ))}
                        </tbody>
                    </table>
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