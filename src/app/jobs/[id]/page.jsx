import React from 'react';
import JobDetailCard from '@/components/JobDetailCard';
import { getJobById } from '@/lib/actions/jobs';

const JobDetailPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="py-6">
        <p className="text-slate-600">Job not found.</p>
      </div>
    );
  }

  return <JobDetailCard job={job} backHref="/jobs" />;
};

export default JobDetailPage;
