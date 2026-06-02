"use client";

import { motion } from "motion/react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { amount: 0.25, once: true },
};

export default function Looking() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: "url('/cta-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.2)_0%,rgba(0,0,0,0.8)_40%)]" />

      {/* Grid Pattern Overlay */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" /> */}

      {/* Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center flex flex-col items-center justify-center min-h-150">
        {/* Main Heading */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8"
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ amount: 0.3, once: true }}
        >
          Your next role is already looking for you
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          initial="initial"
          whileInView="whileInView"
          viewport={{ amount: 0.3, once: true }}
        >
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          initial="initial"
          whileInView="whileInView"
          viewport={{ amount: 0.3, once: true }}
        >
          <button className="px-8 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
            Create a free account
          </button>
          <button className="px-8 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/5 transition-all duration-300">
            View pricing
          </button>
        </motion.div>
      </div>
    </section>
  );
}
