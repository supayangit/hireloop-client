"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Company",
      href: "/company",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-5">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
             <div className="rounded-full bg-linear-to-r from-violet-400 to-pink-400 p-2">
                 <Image
                src="/logo.png"
                alt="HireLoop"
                width={42}
                height={42}
                priority
              />
             </div>

              <span className="text-xl font-bold text-white">
                HireLoop
              </span>
            </Link>

            {/* Desktop Navbar */}
            <div className="hidden md:flex items-center rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl px-8 py-3">
              <ul className="flex items-center gap-10">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-gray-300 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="mx-8 h-7 w-px bg-white/10" />

              {/* Auth Buttons */}
              <div className="flex items-center gap-5">
                <Link
                  href="/login"
                  className="text-violet-400 hover:text-violet-300 transition"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-white"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Right Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-75 bg-[#0F0F13] border-l border-white/10 transition-transform duration-300 ${
          isMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            Menu
          </h3>

          <button onClick={() => setIsMenuOpen(false)}>
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-5">
          <ul className="space-y-2">
            {navLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-6 h-px bg-white/10" />

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-white/10 px-4 py-3 text-center text-violet-400"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-white px-4 py-3 text-center font-medium text-black"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;