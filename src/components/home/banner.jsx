"use client";

import Image from "next/image";
import { Magnifier, MapPin, Briefcase } from "@gravity-ui/icons";

export default function Banner() {
    return (
        <section className="w-full relative min-h-screen overflow-hidden bg-black text-white pt-50">

            {/* Background Image */}
            <Image
                src="/globe.png"
                alt="Background"
                fill
                priority
                className="object-cover opacity-65"
            />

            {/* Dark overlay for readability */}
            {/* <div className="absolute inset-0 bg-black/60" /> */}

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-12 pb-12 pt-32 text-center">

                {/* Badge */}
                <div className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md">
                    <Briefcase width={18} height={18} className="text-orange-400" />

                    <span className="font-semibold">50,000+</span>

                    <span className="uppercase tracking-wider text-gray-400">
                        New Jobs This Month
                    </span>
                </div>

                {/* Heading */}
                <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
                    Find Your Dream Job Today
                </h1>

                {/* Subtitle */}
                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
                    HireLoop connects top talent with world-class companies. Browse
                    thousands of curated opportunities and land your next role — faster.
                </p>

                {/* Search Box */}
                <div className="mt-12 w-full max-w-4xl">
                    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl md:flex-row">

                        {/* Job Search */}
                        <div className="flex flex-1 items-center gap-3 px-6 py-5">
                            <Magnifier width={18} height={18} className="text-gray-400" />

                            <input
                                type="text"
                                placeholder="Job title, skill or company"
                                className="w-full bg-transparent outline-none placeholder:text-gray-500"
                            />
                        </div>

                        <div className="hidden w-px bg-white/10 md:block" />

                        {/* Location */}
                        <div className="flex flex-1 items-center gap-3 px-6 py-5">
                            <MapPin width={18} height={18} className="text-gray-400" />

                            <input
                                type="text"
                                placeholder="Location or Remote"
                                className="w-full bg-transparent outline-none placeholder:text-gray-500"
                            />
                        </div>

                        {/* Search Button */}
                        <button className="flex items-center justify-center bg-indigo-600 px-8 py-5 transition hover:bg-indigo-500">
                            <Magnifier width={22} height={22} />
                        </button>
                    </div>

                    {/* Trending */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <span className="text-gray-500">Trending Position</span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                            Product Designer
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                            AI Engineering
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                            DevOps Engineer
                        </span>
                    </div>
                </div>

                <div className="mt-90 w-full px-50">
                    <p className="text-gray-300 text-3xl md:text-5xl">Assisting over <span className="text-gray-100">150,000 job seekers</span> find their dream positions.</p>
                </div>

            </div>

        </section>
    );
}