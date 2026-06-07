"use client";
import Link from "next/link";
import {
  FiMapPin,
  FiGlobe,
  FiUsers,
} from "react-icons/fi";

const CompanyCard = ({ company }) => {
  const {
    _id,
    name,
    industry,
    location,
    employeesRange,
    website,
    logo,
    description,
    approved,
  } = company;

  return (
    <Link href={`/dashboard/recruiter/company/${_id}`}>
      <div className="group h-full rounded-3xl border border-white/10 bg-[#161616] p-6 transition-all duration-300 hover:border-white/20 hover:-translate-y-1">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-neutral-300 flex-shrink-0">
              {logo ? (
                <img
                  src={logo}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-black font-semibold text-lg">
                  {name?.charAt(0)}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white">
                {name}
              </h3>

              <p className="text-neutral-400 capitalize text-lg">
                {industry || "Technology"}
              </p>
            </div>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-xs font-semibold border ${
              approved
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
            }`}
          >
            {approved ? "APPROVED" : "PENDING"}
          </span>
        </div>

        {/* Description */}
        <div className="mt-8 min-h-[120px]">
          <p className="text-neutral-300 text-lg leading-relaxed line-clamp-4">
            {description ||
              "No company description available."}
          </p>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-white/10" />

        {/* Meta */}
        <div className="mt-6 flex items-center justify-between text-neutral-300">

          <div className="flex items-center gap-2">
            <FiMapPin size={18} />
            <span>
              {location || "Not specified"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FiUsers size={18} />
            <span>
              {employeesRange
                ? `${employeesRange} range`
                : "—"}
            </span>
          </div>

        </div>

        {/* Website */}
        {website && (
          <div className="mt-8">
            <a
              href={
                website.startsWith("http")
                  ? website
                  : `https://${website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-neutral-200 hover:text-white transition-colors"
            >
              <FiGlobe size={18} />
              <span>Visit Website</span>
            </a>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CompanyCard;