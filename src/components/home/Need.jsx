"use client";

import { Magnifier } from "@gravity-ui/icons";
import {
  FaBuilding,
  FaBookmark,
  FaLightbulb,
  FaFile,
  FaGear,
  FaArrowTrendUp,
} from "react-icons/fa6";
import { motion } from "motion/react";

const featuresData = [
  {
    id: 1,
    icon: Magnifier,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    isGravityIcon: true,
  },
  {
    id: 2,
    icon: FaArrowTrendUp,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    isGravityIcon: false,
  },
  {
    id: 3,
    icon: FaBuilding,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    isGravityIcon: false,
  },
  {
    id: 4,
    icon: FaBookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    isGravityIcon: false,
  },
  {
    id: 5,
    icon: FaLightbulb,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
    isGravityIcon: false,
  },
  {
    id: 6,
    icon: FaFile,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    isGravityIcon: false,
  },
  {
    id: 7,
    icon: FaGear,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    isGravityIcon: false,
  },
  {
    id: 8,
    icon: FaArrowTrendUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    isGravityIcon: false,
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

export default function Need() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />

      {/* Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ amount: 0.3, once: true }}
        >
          {/* Badge */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="text-indigo-400 text-lg">■</span>
            <span className="font-semibold tracking-widest uppercase text-gray-300 text-sm">
              Features Job
            </span>
            <span className="text-indigo-400 text-lg">■</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Everything you need to succeed
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ amount: 0.2, once: true }}
        >
          {featuresData.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                className="group rounded-lg border border-white/10 bg-white/3 p-6 backdrop-blur-xl hover:bg-white/8 transition-all duration-300"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                  {feature.isGravityIcon ? (
                    <IconComponent
                      width={24}
                      height={24}
                      className="text-indigo-400"
                    />
                  ) : (
                    <IconComponent className="text-indigo-400 text-xl" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-3 text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
