"use client";

import { MapPin, Briefcase, FileDollar, ArrowRight } from "@gravity-ui/icons";
import { motion } from "motion/react";

const rolesData = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25-€40/hour",
  },
  {
    id: 2,
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25-€40/hour",
  },
  {
    id: 3,
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25-€40/hour",
  },
  {
    id: 4,
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25-€40/hour",
  },
  {
    id: 5,
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25-€40/hour",
  },
  {
    id: 6,
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25-€40/hour",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { amount: 0.25, once: true },
};

const containerVariants = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { amount: 0.2, once: true },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { amount: 0.25, once: true },
};

export default function Roles() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />

      {/* Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ amount: 0.3, once: true }}
        >
          {/* Badge */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="text-indigo-400 text-lg">■</span>
            <span className="font-semibold tracking-widest uppercase text-gray-300 text-sm">
              Smart Job Discovery
            </span>
            <span className="text-indigo-400 text-lg">■</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            The roles you would never find by searching
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ amount: 0.2, once: true }}
        >
          {rolesData.map((role, index) => (
            <motion.div
              key={role.id}
              className="group rounded-lg border border-white/10 bg-white/3 p-6 backdrop-blur-xl hover:bg-white/8 transition-all duration-300"
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 text-white">
                {role.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {role.description}
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 mb-3">
                <MapPin
                  width={16}
                  height={16}
                  className="text-indigo-400 shrink-0"
                />
                <span className="text-sm text-gray-400">{role.location}</span>
                <span className="text-sm text-gray-500 ml-auto flex items-center gap-1">
                  <Briefcase width={14} height={14} />
                  {role.workType}
                </span>
              </div>

              {/* Salary */}
              <div className="flex items-center gap-2 mb-6">
                <FileDollar
                  width={16}
                  height={16}
                  className="text-indigo-400 shrink-0"
                />
                <span className="text-sm text-gray-400">{role.salary}</span>
              </div>

              {/* Apply Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-white font-medium text-sm group-hover:text-indigo-400 transition-colors duration-300"
              >
                Apply Now
                <ArrowRight
                  width={16}
                  height={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center"
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300"
          >
            View all job open
          </button>
        </motion.div>
      </div>
    </section>
  );
}
