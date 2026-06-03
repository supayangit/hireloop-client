import React from 'react';

// Individual Reusable Card Component
export function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-[#131315] border border-[#222226] rounded-xl p-6 flex flex-col justify-between min-h-[160px] transition-all hover:border-[#323238]">
      <div className="flex items-center justify-between">
        <span className="text-[#8e8e93] text-sm font-medium tracking-wide">
          {title}
        </span>
        {Icon && (
          <div className="text-[#8e8e93] bg-[#1c1c1e] p-2 rounded-lg border border-[#2c2c30]">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-4">
        <span className="text-3xl font-semibold text-white tracking-tight">
          {value.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

// Main Section Component handling the Promise
export default async function StatsSection({ statsPromise }) {
  // Destructuring the resolved promise data
  const { totalJobPosts, totalApplicants, activeJobs, jobsClosed } = await statsPromise;

  // Mapping data to Gravity-styled SVG icons
  const statsConfig = [
    {
      title: 'Total Job Posts',
      value: totalJobPosts,
      icon: (props) => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
    },
    {
      title: 'Total Applicants',
      value: totalApplicants,
      icon: (props) => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.656-5.64 9.163 9.163 0 0 1-2.253 9.023M15 3.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM7.5 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM5.25 15.75a3 3 0 0 0-4.656 5.64 9.093 9.093 0 0 0 3.741.479c1.243 0 2.417-.255 3.483-.717m6.737-12.72a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.938 21a11.95 11.95 0 0 1-3.238-3.308m13.738 3.308a11.95 11.95 0 0 0 3.238-3.308M19.5 13.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
    },
    {
      title: 'Active Jobs',
      value: activeJobs,
      icon: (props) => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
      ),
    },
    {
      title: 'Jobs Closed',
      value: jobsClosed,
      icon: (props) => (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statsConfig.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}