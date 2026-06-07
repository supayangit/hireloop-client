import React from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";

const JobDetailCard = ({ job }) => {
  if (!job) return null;

  return (
    <div className="py-6">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/dashboard/recruiter/jobs"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <FiArrowLeft />
          Back to jobs
        </Link>
      </div>

      {/* Card */}
      <div
        className="
          rounded-[24px]
          border
          border-white/[0.08]
          bg-gradient-to-b
          from-[#1d1d1d]
          to-[#171717]
          p-8
        "
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              {job.title}
            </h1>

            <p className="mt-3 text-zinc-400">
              {job.category} • {job.type} •{" "}
              {job.isRemote ? "Remote" : job.location}
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border self-start ${
              job.status === "active"
                ? "bg-green-500/10 text-green-400 border-green-500/25"
                : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
            }`}
          >
            {job.status}
          </span>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/[0.05]" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
                <FiDollarSign />
                Salary Range
              </div>

              <p className="mt-2 text-lg text-zinc-100 font-medium">
                {job.currency?.toUpperCase()} {job.salaryMin} - {job.salaryMax}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
                <FiCalendar />
                Application Deadline
              </div>

              <p className="mt-2 text-zinc-300">
                {job.deadline
                  ? new Date(job.deadline).toLocaleDateString()
                  : "Not specified"}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
                <FiBriefcase />
                Employment Type
              </div>

              <p className="mt-2 text-zinc-300">
                {job.type}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
                <FiMapPin />
                Location
              </div>

              <p className="mt-2 text-zinc-300">
                {job.isRemote ? "Remote" : job.location}
              </p>
            </div>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="mt-10">
          <div className="border-t border-white/[0.05] pt-8">
            <h3 className="text-xl font-semibold text-white">
              Responsibilities
            </h3>

            <p className="mt-4 text-zinc-300 leading-8 whitespace-pre-line">
              {job.responsibilities}
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-10">
          <div className="border-t border-white/[0.05] pt-8">
            <h3 className="text-xl font-semibold text-white">
              Requirements
            </h3>

            <p className="mt-4 text-zinc-300 leading-8 whitespace-pre-line">
              {job.requirements}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-10">
          <div className="border-t border-white/[0.05] pt-8">
            <h3 className="text-xl font-semibold text-white">
              Benefits
            </h3>

            <p className="mt-4 text-zinc-300 leading-8 whitespace-pre-line">
              {job.benefits}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailCard;