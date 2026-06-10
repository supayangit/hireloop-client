"use client";

import React from "react";
import { Input, Select, ListBoxItem } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function JobFilterSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract current values from URL to keep UI inputs synchronized
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "all";
  const currentType = searchParams.get("type") || "all";

  // Updates the browser URL parameter strings safely
  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Updates URL which re-runs server component data fetch automatically
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Wait 400ms after user stops typing before making server request
  const handleSearchChange = useDebouncedCallback((value) => {
    updateFilters("search", value);
  }, 400);

  const categories = ["all", "engineering", "design", "marketing", "product"];
  const types = ["all", "full-time", "part-time", "contract", "internship"];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Left Column: Search Bar */}
      <div className="w-full md:w-1/2">
        <Input
          isClearable
          type="text"
          placeholder="Search by title or keywords..."
          startContent={<FiSearch className="text-zinc-400" />}
          defaultValue={currentSearch}
          onValueChange={handleSearchChange}
          onClear={() => updateFilters("search", "")}
          variant="bordered"
          classNames={{
            inputWrapper: "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] text-white",
            input: "text-white placeholder:text-zinc-500",
          }}
        />
      </div>

      {/* Right Column: Dropdown Select Elements */}
      <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 flex-1 justify-end">
        <Select
          label="Category"
          className="w-full sm:w-48 text-white"
          selectedKeys={[currentCategory]}
          onChange={(e) => updateFilters("category", e.target.value)}
          variant="bordered"
          classNames={{
            trigger: "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]",
            value: "text-white",
            label: "text-zinc-400"
          }}
        >
          {categories.map((cat) => (
            <ListBoxItem key={cat} value={cat} className="capitalize text-zinc-900 dark:text-zinc-200">
              {cat === "all" ? "All Categories" : cat}
            </ListBoxItem>
          ))}
        </Select>

        <Select
          label="Job Type"
          className="w-full sm:w-48 text-white"
          selectedKeys={[currentType]}
          onChange={(e) => updateFilters("type", e.target.value)}
          variant="bordered"
          classNames={{
            trigger: "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]",
            value: "text-white",
            label: "text-zinc-400"
          }}
        >
          {types.map((t) => (
            <ListBoxItem key={t} value={t} className="capitalize text-zinc-900 dark:text-zinc-200">
              {t === "all" ? "All Types" : t}
            </ListBoxItem>
          ))}
        </Select>
      </div>
    </div>
  );
}