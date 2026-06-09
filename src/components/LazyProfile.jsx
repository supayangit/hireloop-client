"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { capitalize } from "@/lib/string";

export default function LazyProfile({ variant = "compact", className = "" }) {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  
  // Force a minimum loading lifespan so the animation is visible
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session !== undefined) {
      // Small delay (e.g., 600ms) to let the smooth animation finish playing
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [session]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => (window.location.href = "/login"),
      },
    });
  };

  // --- LOADING STATE (Now guaranteed to render and pulse smoothly) ---
  if (isLoading) {
    if (variant === "compact") {
      return (
        <div className={`flex items-center gap-4 animate-pulse ${className}`}>
          <div className="h-9 w-16 rounded-xl bg-white/10" />
          <div className="h-10 w-24 rounded-xl bg-white/10" />
        </div>
      );
    }

    if (variant === "sidebar") {
      return (
        <div className="flex items-center gap-3 w-full animate-pulse">
          <div className="h-10 w-10 shrink-0 rounded-full bg-white/10" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-3.5 w-28 rounded-lg bg-white/10" />
            <div className="h-2.5 w-16 rounded-lg bg-white/10" />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4 w-full animate-pulse">
        <div className="flex items-center gap-3 rounded-xl border border-white/5 p-4 bg-white/5">
          <div className="h-12 w-12 rounded-full bg-white/10" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 w-32 rounded-lg bg-white/10" />
            <div className="h-3 w-24 rounded-lg bg-white/10" />
          </div>
        </div>
        <div className="h-11 w-full rounded-lg bg-white/10" />
      </div>
    );
  }

  // --- REST OF YOUR CODE (STAYS EXACTLY THE SAME) ---
  if (!session?.user) {
    if (variant === "compact") {
      return (
        <div className={`flex items-center gap-5 ${className}`}>
          <Link href="/login" className="text-violet-400 transition hover:text-violet-300">Login</Link>
          <Link href="/register" className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:scale-105">Get Started</Link>
        </div>
      );
    }
    if (variant === "sidebar") return null;
    return (
      <div className="flex flex-col gap-3">
        <Link href="/login" className="rounded-lg border border-white/10 px-4 py-3 text-center text-violet-400">Login</Link>
        <Link href="/register" className="rounded-lg bg-white px-4 py-3 text-center font-medium text-black">Get Started</Link>
      </div>
    );
  }

  const user = session.user;

  if (variant === "compact") {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setOpen((s) => !s)}
          className="relative h-11 w-11 overflow-hidden rounded-full border border-white/20 hover:scale-105 transition"
          aria-expanded={open}
        >
          <Image src={user.image || "/assets/user.png"} alt={user.name || "User"} fill className="object-cover" />
        </button>

        {open && (
          <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={user.image || "/assets/user.png"} alt="User" fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-white">{user.name}</p>
                <p className="truncate text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            <div className="p-2">
              <Link href="/profile" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white">Profile</Link>
              <button onClick={handleSignOut} className="w-full rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10">Logout</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/5">
          <Image src={user.image || "/avatar-placeholder.png"} alt={user.name || "User"} fill className="object-cover rounded-full" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{user.name}</div>
          <div className="text-xs text-gray-400">{capitalize(user.role || user.user_metadata?.role || "Recruiter · Premium")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 p-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={user.image || "/assets/user.png"} alt="User" fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-white">{user.name}</p>
          <p className="truncate text-sm text-gray-400">{user.email}</p>
        </div>
      </div>
      <Link href="/profile" className="block rounded-lg border border-white/10 px-4 py-3 text-center text-white">Profile</Link>
      <button onClick={handleSignOut} className="w-full rounded-lg border border-red-500/20 px-4 py-3 text-red-400">Logout</button>
    </div>
  );
}