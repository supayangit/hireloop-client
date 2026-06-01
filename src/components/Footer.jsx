import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.12),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Left Column */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-3"
            />
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

              <div>
                <h2 className="text-3xl font-bold">
                  HireLoop
                </h2>
              </div>
            </Link>

            <p className="mt-8 max-w-sm text-lg leading-relaxed text-gray-400">
              The AI-native career platform. Built for
              people who take their work seriously.
            </p>

            {/* Socials */}
            <div className="mt-16 flex gap-4">
              <Link
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-xl transition hover:bg-white/10"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-xl transition hover:bg-indigo-500"
              >
                <FaPinterestP />
              </Link>

              <Link
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-xl transition hover:bg-white/10"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-8 text-xl font-medium text-indigo-500">
              Product
            </h3>

            <ul className="space-y-5 text-gray-400">
              <li>
                <Link href="#" className="transition hover:text-white">Job Discovery</Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">Worker AI</Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">Companies</Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">Salary Data</Link>
              </li>
            </ul>
          </div>
            {/* Company */}
            <div>
            <h3 className="mb-8 text-xl font-medium text-indigo-500">
              Company
            </h3>

            <ul className="space-y-5 text-gray-400">
              <li>
              <Link href="#" className="transition hover:text-white">About</Link>
              </li>
              <li>
              <Link href="#" className="transition hover:text-white">Blog</Link>
              </li>
              <li>
              <Link href="#" className="transition hover:text-white">Careers</Link>
              </li>
              <li>
              <Link href="#" className="transition hover:text-white">Press</Link>
              </li>
            </ul>
            </div>
          {/* Navigation */}
          <div>
            <h3 className="mb-8 text-xl font-medium text-indigo-500">
              Navigation
            </h3>

            <ul className="space-y-5 text-gray-400">
              <li>
                <Link href="#" className="transition hover:text-white">Help Center</Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">Career Library</Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-8 text-xl font-medium text-indigo-500">
              Resources
            </h3>

            <ul className="space-y-5 text-gray-400">
              <li>
                <Link href="#" className="transition hover:text-white">Brand Guideline</Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">Newsroom</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            Copyright © 2026 — HireLoop
          </p>

          <div className="flex gap-6">
            <Link href="#" className="transition hover:text-white">
              Terms & Policy
            </Link>

            <Link href="#" className="transition hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}