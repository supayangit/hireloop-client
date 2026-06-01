"use client";

import Image from "next/image";
import { Magnifier, MapPin, Briefcase } from "@gravity-ui/icons";

const stats = [
  {
    value: "50K",
    label: "Active Jobs",
  },
  {
    value: "12K",
    label: "Companies",
  },
  {
    value: "2M",
    label: "Job Seekers",
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />

      {/* Purple Glow */}
      <div className="absolute bottom-[250px] left-1/2 h-[750px] w-[750px] -translate-x-1/2 rounded-full bg-indigo-600/40 blur-[180px]" />

      {/* Globe */}
      <div className="absolute inset-x-0 bottom-0 z-0 flex justify-center">
        <Image
          src="/globe.png"
          alt="Globe"
          width={1800}
          height={900}
          priority
          className="h-auto w-full max-w-[1800px] object-contain opacity-80"
        />
      </div>

      {/* container */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-28 pb-32 text-center">
        {/* Badge */}
        <div className="mb-10 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl">
          <Briefcase
            width={18}
            height={18}
            className="text-orange-400"
          />

          <span className="font-semibold text-white">
            50,000+
          </span>

          <span className="uppercase tracking-[0.2em] text-gray-400 text-sm">
            New Jobs This Month
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
          HireLoop connects top talent with world-class companies.
          Browse thousands of curated opportunities and land your
          next role — faster.
        </p>

        {/* Search */}
        <div className="mt-14 w-full max-w-5xl">
          <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl md:flex-row">
            {/* Job Search */}
            <div className="flex flex-1 items-center gap-3 px-6 py-5">
              <Magnifier
                width={18}
                height={18}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Job title, skill or company"
                className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
              />
            </div>

            <div className="hidden w-px bg-white/10 md:block" />

            {/* Location */}
            <div className="flex flex-1 items-center gap-3 px-6 py-5">
              <MapPin
                width={18}
                height={18}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Location or Remote"
                className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
              />
            </div>

            {/* Search Button */}
            <button className="flex h-16 w-16 items-center justify-center bg-indigo-600 transition hover:bg-indigo-500">
              <Magnifier width={22} height={22} />
            </button>
          </div>

          {/* Trending */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-gray-500">
              Trending Position
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
              Product Designer
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
              AI Engineering
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300">
              DevOps Engineer
            </span>
          </div>
        </div>

        {/* Spacer before globe text */}
        <div className="mt-40 md:mt-56 lg:mt-72 max-w-4xl">
          <h2 className="text-4xl font-light leading-tight text-gray-300 md:text-6xl">
            Assisting over{" "}
            <span className="font-medium text-white">
              150,000 job seekers
            </span>
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Stats */}
        <div className="mt-16 md:mt-20 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-black/40 p-8 text-left backdrop-blur-xl"
            >
              <h3 className="text-5xl font-semibold text-white">
                {item.value}
              </h3>

              <p className="mt-4 text-lg text-gray-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}