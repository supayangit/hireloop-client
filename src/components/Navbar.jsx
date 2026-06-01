"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: session } = authClient.useSession();

  const navbarRef = useRef(null);

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

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const target = e.target;
      if (
        navbarRef.current &&
        target instanceof Node &&
        !navbarRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  return (
    <>
      <nav
        ref={navbarRef}
        className="top-0 left-0 right-0 z-50 py-5"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
            >
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

              <div className="mx-8 h-7 w-px bg-white/10" />

              {/* Auth Area */}
              <div className="relative flex items-center">
                {session?.user ? (
                  <>
                    <button
                      onClick={() =>
                        setProfileOpen((prev) => !prev)
                      }
                      className="relative h-11 w-11 overflow-hidden rounded-full border border-white/20 hover:scale-105 transition"
                    >
                      <Image
                        src={
                          session.user.image ||
                          "/assets/user.png"
                        }
                        alt={
                          session.user.name || "User"
                        }
                        fill
                        className="object-cover"
                      />
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
                        <div className="flex items-center gap-3 border-b border-white/10 p-4">
                          <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={
                                session.user.image ||
                                "/assets/user.png"
                              }
                              alt="User"
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-white">
                              {session.user.name}
                            </p>

                            <p className="truncate text-sm text-gray-400">
                              {session.user.email}
                            </p>
                          </div>
                        </div>

                        <div className="p-2">
                          <Link
                            href="/profile"
                            onClick={() =>
                              setProfileOpen(false)
                            }
                            className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
                          >
                            Profile
                          </Link>

                          <button
                            onClick={handleSignOut}
                            className="w-full rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-5">
                    <Link
                      href="/login"
                      className="text-violet-400 transition hover:text-violet-300"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:scale-105"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-white md:hidden"
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
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-75 border-l border-white/10 bg-[#0F0F13] transition-transform duration-300 ${
          isMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h3 className="text-lg font-semibold text-white">
            Menu
          </h3>

          <button
            onClick={() => setIsMenuOpen(false)}
          >
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
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-6 h-px bg-white/10" />

          {session?.user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 p-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={
                      session.user.image ||
                      "/assets/user.png"
                    }
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-medium text-white">
                    {session.user.name}
                  </p>

                  <p className="truncate text-sm text-gray-400">
                    {session.user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/profile"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className="block rounded-lg border border-white/10 px-4 py-3 text-center text-white"
              >
                Profile
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full rounded-lg border border-red-500/20 px-4 py-3 text-red-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="rounded-lg border border-white/10 px-4 py-3 text-center text-violet-400"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-white px-4 py-3 text-center font-medium text-black"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;