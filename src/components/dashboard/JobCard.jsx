import React from "react";
import Link from "next/link";
import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";

import { getCompanyById } from "@/lib/actions/company";
import { capitalize } from "@/lib/string";

const JobCard = async ({ job }) => {
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
    companyId,
    requirements,
  } = job;


  const company = companyId ? await getCompanyById(companyId) : null;
  const companyName = company?.name || company?.title || company?.companyName || null;

  const reqText = Array.isArray(requirements)
    ? requirements.join(", ")
    : requirements || "Not specified";

  const displayCategory = capitalize(category) || "Not specified";

  return (
    <div
      className="
        group
        h-full
        rounded-[24px]
        border
        border-white/[0.08]
        bg-gradient-to-b
        from-[#1d1d1d]
        to-[#171717]
        p-6
        flex
        flex-col
        justify-between
        transition-all
        duration-300
        ease-out
        hover:border-white/[0.15]
        hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]
        hover:scale-[1.01]
      "
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              {title}
            </h3>
            {/* Company name under title */}
            {companyName && (
              <p className="mt-1 text-sm text-zinc-300">{companyName}</p>
            )}

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 items-center gap-2 text-sm text-zinc-400">
              <div>{displayCategory}</div>

              <div className="flex items-center gap-2 justify-end text-sm text-zinc-400">
                <FiMapPin className="text-zinc-400 text-sm" />
                <span>{isRemote ? "Remote" : location || "Not specified"}</span>
              </div>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
              status === "active"
                ? "bg-green-500/10 text-green-400 border-green-500/25"
                : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Compact rows: type+salary, requirements, then deadline+action */}

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-2 text-zinc-300">
            <FiBriefcase className="text-zinc-400 text-lg" />
            <span>{capitalize(type) || "Not specified"}</span>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 justify-end text-zinc-500 text-xs uppercase tracking-wider">
              <FiDollarSign />
              Salary Range
            </div>

            <p className="mt-2 text-lg font-medium text-zinc-100">
              {currency?.toUpperCase()} {salaryMin} - {salaryMax}
            </p>
          </div>
        </div>

        {/* Requirements (clamped to 2 lines) */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
            Requirements
          </div>

          <p
            className="mt-2 text-sm text-zinc-300"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {reqText}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div>
        <div className="my-6 border-t border-white/[0.05]" />

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider">
              <FiCalendar />
              Deadline
            </div>

            <p className="mt-2 text-sm text-zinc-300">
              {deadline ? new Date(deadline).toLocaleDateString() : "Not specified"}
            </p>
          </div>

          <Link
            href={`/jobs/${_id}`}
            className="inline-flex items-center px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-200 text-sm transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.12]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;