import React from 'react';
import Link from 'next/link';

const JobDetailCard = ({ job }) => {
  if (!job) return null;

  return (
    <div className="py-6">
      <div className="mb-4">
        <Link href="/dashboard/recruiter/jobs" className="text-indigo-400 hover:underline">← Back to jobs</Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-sm p-6 text-slate-100">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-sm text-slate-300">{job.category} • {job.type} • {job.isRemote ? 'Remote' : job.location}</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-slate-200">Salary</h3>
            <p className="text-sm text-slate-300">{job.currency?.toUpperCase()} {job.salaryMin} - {job.salaryMax}</p>

            <h3 className="mt-4 text-sm font-medium text-slate-200">Deadline</h3>
            <p className="text-sm text-slate-300">{job.deadline}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-200">Status</h3>
            <p className="text-sm text-slate-300">{job.status}</p>

            <h3 className="mt-4 text-sm font-medium text-slate-200">Company ID</h3>
            <p className="text-sm text-slate-300">{job.companyId}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-slate-200">Responsibilities</h3>
          <p className="text-sm text-slate-300 mt-2 whitespace-pre-line">{job.responsibilities}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-slate-200">Requirements</h3>
          <p className="text-sm text-slate-300 mt-2 whitespace-pre-line">{job.requirements}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-slate-200">Benefits</h3>
          <p className="text-sm text-slate-300 mt-2 whitespace-pre-line">{job.benefits}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetailCard;
