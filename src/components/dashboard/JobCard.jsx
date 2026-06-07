import React from 'react';
import Link from 'next/link';

const JobCard = ({ job }) => {
  const {
    _id,
    title,
    category,
    type,
    salaryMin,
    salaryMax,
    currency,
    location,
    deadline,
    isRemote,
    status,
  } = job;

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm p-6 flex flex-col justify-between text-slate-900 dark:text-slate-100">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-300">{category} • {type} • {isRemote ? 'Remote' : location}</p>
        <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="font-medium">Salary: </span>{currency ? currency.toUpperCase() : ''} {salaryMin} - {salaryMax}
        </div>
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          <span className="font-medium">Deadline: </span>{deadline}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-200'}`}>
          {status}
        </span>
        <Link href={`/dashboard/recruiter/jobs/${_id}`} className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm rounded-md">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
