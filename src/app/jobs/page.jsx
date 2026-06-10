"use client";

import React, { useState, useEffect } from "react";
import { Input, Select, SelectItem } from "@heroui/react"; // or "@nextui-org/react" depending on your exact version
import { FiSearch } from "react-icons/fi";
import { getAllJobs } from "../../lib/actions/jobs";
import JobCard from "../../components/dashboard/JobCard";

const JobsPage = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(new Set([]));
  const [selectedType, setSelectedType] = useState(new Set([]));

  // Extract unique categories and types dynamically for the dropdowns
  const categories = Array.from(new Set(allJobs.map((j) => j.category).filter(Boolean)));
  const types = Array.from(new Set(allJobs.map((j) => j.type).filter(Boolean)));

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getAllJobs();
        setAllJobs(jobsData || []);
        setFilteredJobs(jobsData || []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Handle filtering whenever inputs change
  useEffect(() => {
    let updated = [...allJobs];

    // Search query filter (matches title or company/requirements loosely)
    if (searchQuery) {
      updated = updated.filter((job) =>
        job.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    const catValue = Array.from(selectedCategory)[0];
    if (catValue && catValue !== "all") {
      updated = updated.filter((job) => job.category === catValue);
    }

    // Type filter
    const typeValue = Array.from(selectedType)[0];
    if (typeValue && typeValue !== "all") {
      updated = updated.filter((job) => job.type === typeValue);
    }

    setFilteredJobs(updated);
  }, [searchQuery, selectedCategory, selectedType, allJobs]);

  return (
    <div className="p-8 md:p-12 min-h-screen bg-[#121212]">
      {/* Heading Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-white">Jobs</h1>
        <p className="mt-2 text-zinc-400 text-lg">Browse all available job listings</p>
      </div>

      {/* Hero UI Search & Filter Section */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between w-full">
        {/* Left Side: Search Input */}
        <div className="w-full md:w-1/2">
          <Input
            isClearable
            type="text"
            placeholder="Search job titles..."
            startContent={<FiSearch className="text-zinc-400 text-xl" />}
            value={searchQuery}
            onValueChange={setSearchQuery}
            variant="flat"
            classNames={{
              inputWrapper: "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] rounded-2xl h-12",
              input: "text-white placeholder:text-zinc-500",
            }}
          />
        </div>

        {/* Right Side: Select Dropdowns */}
        <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-4">
          <Select
            labelPlacement="outside"
            placeholder="All Categories"
            selectedKeys={selectedCategory}
            onSelectionChange={setSelectedCategory}
            className="w-full"
            classNames={{
              trigger: "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] rounded-2xl h-12",
              value: "text-white",
            }}
          >
            <SelectItem key="all" className="text-zinc-800">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-zinc-800 capitalize">
                {cat}
              </SelectItem>
            ))}
          </Select>

          <Select
            labelPlacement="outside"
            placeholder="Job Type"
            selectedKeys={selectedType}
            onSelectionChange={setSelectedType}
            className="w-full"
            classNames={{
              trigger: "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] rounded-2xl h-12",
              value: "text-white",
            }}
          >
            <SelectItem key="all" className="text-zinc-800">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type} className="text-zinc-800 capitalize">
                {type}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Jobs Grid Display */}
      {loading ? (
        <div className="text-center text-zinc-400 py-12">Loading jobs...</div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-[#1d1d1d] to-[#171717] p-12 text-center">
          <h3 className="text-xl font-semibold text-white">No jobs found</h3>
          <p className="mt-2 text-zinc-400">Try adjusting your search parameters or filters.</p>
        </div>
      )}
    </div>
  );
};

export default JobsPage;