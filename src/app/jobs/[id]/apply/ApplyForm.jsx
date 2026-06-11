"use client"

import { useState } from "react";
import Link from "next/link";
import { submitApplication } from "@/lib/actions/apply";
import toast from "react-hot-toast";

export default function ApplyForm({ jobId, user }) {
  const userId = user?.id || user?._id || null;
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", coverLetter: "", resumeLink: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const update = (field) => (e) => setForm((s) => ({ ...s, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = { ...form, seekerId: userId };
      await submitApplication(jobId, payload);
      setSuccess(true);
    } catch (err) {
      const msg = err?.message || "Submission failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="rounded-lg border border-green-600/30 bg-linear-to-b from-green-900/30 to-transparent p-8 text-center">
          <h2 className="text-2xl font-semibold text-white">Application submitted</h2>
          <p className="mt-2 text-zinc-300">Thanks — your application was sent successfully. We'll notify you of any updates.</p>

          <div className="mt-6 flex justify-center gap-3">
            <Link href={`/jobs/${jobId}`} className="px-4 py-2 rounded bg-white/5 border border-white/10 text-white hover:bg-white/10">
              Back to job
            </Link>

            <Link href="/jobs" className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
              Browse jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold mb-4">Apply to this job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-200">Full name</label>
          <input required value={form.name} onChange={update("name")} className="mt-1 block w-full rounded-md border bg-transparent p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-200">Email</label>
          <input required type="email" value={form.email} onChange={update("email")} className="mt-1 block w-full rounded-md border bg-transparent p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-200">Resume link (public URL)</label>
          <input required type="url" value={form.resumeLink} onChange={update("resumeLink")} className="mt-1 block w-full rounded-md border bg-transparent p-2" placeholder="https://" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-200">Cover letter</label>
          <textarea required value={form.coverLetter} onChange={update("coverLetter")} rows={6} className="mt-1 block w-full rounded-md border bg-transparent p-2" />
        </div>

        {error && <div className="text-sm text-red-400">{error}</div>}

        <div>
          <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">
            {loading ? "Submitting…" : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
