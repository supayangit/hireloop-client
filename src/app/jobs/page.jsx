import { getAllJobs } from "@/lib/actions/jobs";
import JobCard from "@/components/dashboard/JobCard";
import JobFilterSection from "../jobs/JobFilterSection";

const JobsPage = async ({ searchParams }) => {
  // Await search params in modern Next.js versions
  const filters = await searchParams;
  
  // Pass URL filters directly to your database query function
  const jobs = await getAllJobs({
    search: filters?.search || "",
    category: filters?.category || "all",
    type: filters?.type || "all",
  });

  return (
    <div className="p-8 md:p-12">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-white">Jobs</h1>
        <p className="mt-2 text-zinc-400 text-lg">Browse all available job listings</p>
      </div>

      {/* The filter UI component controls the URL parameters */}
      <JobFilterSection />

      {jobs?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-white/[0.08] bg-gradient-to-b from-[#1d1d1d] to-[#171717] p-12 text-center mt-8">
          <h3 className="text-xl font-semibold text-white">No jobs found</h3>
          <p className="mt-2 text-zinc-400">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

export default JobsPage;