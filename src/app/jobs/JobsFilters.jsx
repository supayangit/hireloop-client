"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input, Select, Label, ListBox } from "@heroui/react"; // 💡 Kept original matching items
import { FiSearch } from "react-icons/fi";

export default function JobsFilters({ categories, types }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const currentCategory = searchParams.get("category") || "all";
  const currentType = searchParams.get("type") || "all";

  // Debounced search update
  useEffect(() => {
    const currentSearchParam = searchParams.get("search") || "";

    if (search.trim() === currentSearchParam.trim()) {
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      router.push(`/jobs?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    // Clean up string values to ensure no internal leakage happens
    const cleanValue = value ? String(value).trim() : "";

    if (!cleanValue || cleanValue === "all") {
      params.delete(key);
    } else {
      params.set(key, cleanValue);
    }

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="mb-8 rounded-[24px] border border-white/8 bg-linear-to-b from-[#1d1d1d] to-[#171717] p-5">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_220px] gap-4 items-center">
        
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-zinc-400" />
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-125  border-white/6"
            aria-label="Search jobs input"
          />
        </div>

        {/* Category */}
        <Select
          value={currentCategory}
          onChange={(val) => updateFilter("category", val)} 
          placeholder="Choose category"
        >
          <Label>Category</Label>
          <Select.Trigger className="w-full">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {/* 💡 v3 relies on id for state management rather than raw keys */}
              <ListBox.Item id="all" textValue="All Categories">All Categories</ListBox.Item>
              {categories.map((category) => (
                <ListBox.Item id={category} key={category} textValue={category}>
                  {category}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Type */}
        <Select
          value={currentType}
          onChange={(val) => updateFilter("type", val)}
          placeholder="Choose type"
        >
          <Label>Job Type</Label>
          <Select.Trigger className="w-full">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item id="all" textValue="All Types">All Types</ListBox.Item>
              {types.map((type) => (
                <ListBox.Item id={type} key={type} textValue={type}>
                  {type}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

      </div>
    </div>
  );
}