import React from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";
import { capitalize } from "@/lib/string";
import { getCompanyById } from "@/lib/actions/company";
import { getUserSession } from "@/lib/core/session";

const JobDetailCard = async ({ job, backHref = '/dashboard/recruiter/jobs' }) => {
  if (!job) return null;

  const company = job.companyId ? await getCompanyById(job.companyId) : job.company || null;
  const companyName = company?.name || job.companyName || null;
  const companyLogo = company?.logo || job.companyLogo || job.logo || null;
  const user = await getUserSession();
  const isRecruiter = user?.role === 'recruiter';

  return (
    <div className="">
      {/* Fixed top navigation (sticky, above everything) */}
      <nav className="top-0 left-0 right-0 z-50 bg-[#0b0b0b]/70 backdrop-blur-sm border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href={backHref} className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors">
              <FiArrowLeft />
              <span className="text-sm">Back to jobs</span>
            </Link>

            <a href="#overview" className="px-3 py-2 rounded text-sm text-zinc-300 hover:bg-white/5">Overview</a>
            <a href="#responsibilities" className="px-3 py-2 rounded text-sm text-zinc-300 hover:bg-white/5">Responsibilities</a>
            <a href="#requirements" className="px-3 py-2 rounded text-sm text-zinc-300 hover:bg-white/5">Requirements</a>
            <a href="#benefits" className="px-3 py-2 rounded text-sm text-zinc-300 hover:bg-white/5">Benefits</a>
          </div>

          <div className="flex items-center gap-2">
            <a href="#company" className="px-3 py-2 rounded text-sm text-zinc-300 hover:bg-white/5">Company</a>
            <a href="#apply" className="px-3 py-2 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700">Apply</a>
          </div>
        </div>
      </nav>
      {/* Back Link moved into fixed nav (same row) */}

      {/* Card */}
      <div className="rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-[#1d1d1d] to-[#171717] p-8">
        {/* Header */}
        <div id="overview" className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              {job.title}
            </h1>

            {/* Company logo + name (link to company page) */}
            {company && (
              <div id="company" className="mt-3 flex items-center gap-3">
                <Link
                  href={company._id ? `/dashboard/recruiter/company/${company._id}` : job.companyId ? `/dashboard/recruiter/company/${job.companyId}` : '#'}
                  className="flex items-center gap-3"
                >
                  {companyLogo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={companyLogo} alt={companyName || 'company logo'} className="h-10 w-10 rounded object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded bg-white/5 flex items-center justify-center text-sm text-zinc-300">Logo</div>
                  )}

                  <span className="text-sm text-zinc-300">{companyName}</span>
                </Link>
              </div>
            )}

            <p className="mt-3 text-zinc-400">
              {capitalize(job.category) || 'Not specified'} • {job.isRemote ? 'Remote' : job.location}
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
        <div className="my-4 border-t border-white/[0.05]" />

        {/* (fixed nav above replaces in-card navigation) */}

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
                {capitalize(job.type) || 'Not specified'}
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
        <div id="responsibilities" className="mt-10">
          <div className="border-t border-white/[0.05] pt-8">
            <h3 className="text-xl font-semibold text-white">Responsibilities</h3>

            <p className="mt-4 text-zinc-300 leading-8 whitespace-pre-line">{job.responsibilities}</p>
          </div>
        </div>

        {/* Requirements */}
        <div id="requirements" className="mt-10">
          <div className="border-t border-white/[0.05] pt-8">
            <h3 className="text-xl font-semibold text-white">Requirements</h3>

            <p className="mt-4 text-zinc-300 leading-8 whitespace-pre-line">{job.requirements}</p>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="mt-10">
          <div className="border-t border-white/[0.05] pt-8">
            <h3 className="text-xl font-semibold text-white">Benefits</h3>

            <p className="mt-4 text-zinc-300 leading-8 whitespace-pre-line">{job.benefits}</p>
          </div>
        </div>

        {/* Apply CTA */}
        <div className="mt-8">
          <div className="my-6 border-t border-white/[0.05]" />

          <div id="apply" className="flex items-center justify-end">
            <Link
              href={`/jobs/${job._id}/apply`}
              className={`inline-flex items-center px-5 py-3 rounded-xl border border-white/[0.08] bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 ${isRecruiter ? 'opacity-50 pointer-events-none cursor-not-allowed hover:bg-indigo-600' : ''}`}
              aria-disabled={isRecruiter}
              title={isRecruiter ? 'Recruiter accounts cannot apply' : 'Apply to this job'}
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailCard;