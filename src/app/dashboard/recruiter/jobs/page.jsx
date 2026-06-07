import React from 'react';
import { getJobs } from '../../../../lib/actions/jobs';
import JobCard from '../../../../components/dashboard/JobCard';

const RecruiterJobsPage = async () => {
    const jobs = await getJobs();

    return (
        <div className="py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Jobs</h1>
                <p className="text-sm text-slate-600">Manage and review your posted roles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default RecruiterJobsPage;