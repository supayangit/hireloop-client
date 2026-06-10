import React from "react";
import { getAllJobs } from "@/lib/actions/jobs";
import JobCard from "@/components/dashboard/JobCard";
import JobsFilters from "./JobsFilters";

const JobsPage = async ({
  searchParams,
}) => {
  const params = await searchParams;

  const search = params?.search || "";

  const category = params?.category || "";

  const type = params?.type || "";

  const jobs = await getAllJobs({
    search,
    category,
    type,
  });

  const allJobs = await getAllJobs();

  const categories = [
    ...new Set(
      allJobs
        .map((job) => job.category)
        .filter(Boolean)
    ),
  ];

  const types = [
    ...new Set(
      allJobs
        .map((job) => job.type)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="p-8 md:p-12">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          Jobs
        </h1>

        <p className="mt-2 text-zinc-400 text-lg">
          Browse all available job listings
        </p>
      </div>

      <JobsFilters
        categories={categories}
        types={types}
      />

      <div className="mb-6 text-zinc-400">
        {jobs.length} job
        {jobs.length !== 1 ? "s" : ""} found
      </div>

      {jobs?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-[#1d1d1d] to-[#171717] p-12 text-center">
          <h3 className="text-xl font-semibold text-white">
            No jobs found
          </h3>

          <p className="mt-2 text-zinc-400">
            Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobsPage;