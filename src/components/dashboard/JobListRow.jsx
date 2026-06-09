"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiTrash, FiEdit } from "react-icons/fi";
import { Input, TextArea, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { updateJob } from "@/lib/actions/jobs";

export default function JobListRow({ initialJob, companies }) {
  const [job, setJob] = useState(initialJob);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const jobTypes = [
    { key: "full-time", label: "Full-time" },
    { key: "part-time", label: "Part-time" },
    { key: "remote", label: "Remote" },
    { key: "contract", label: "Contract" },
    { key: "internship", label: "Internship" },
  ];

  const jobCategories = [
    { key: "technology", label: "Technology" },
    { key: "finance", label: "Finance" },
    { key: "healthcare", label: "Healthcare" },
    { key: "marketing", label: "Marketing" },
    { key: "sales", label: "Sales" },
    { key: "design", label: "Design" },
    { key: "hr", label: "Human Resources" },
    { key: "operations", label: "Operations" },
  ];

  const currencies = [
    { key: "usd", label: "USD ($)" },
    { key: "eur", label: "EUR (€)" },
    { key: "gbp", label: "GBP (£)" },
    { key: "inr", label: "INR (₹)" },
  ];

  const [selectedCompanyId, setSelectedCompanyId] = useState(
    job.companyId || (companies && companies.length > 0 ? companies[0]._id || companies[0].id : "")
  );

  const [selectedCompany, setSelectedCompany] = useState(() => {
    if (!companies || companies.length === 0) return null;
    return companies.find((c) => (c._id || c.id) === (job.companyId || selectedCompanyId)) || companies[0];
  });
  const [form, setForm] = useState({
    title: job.title || "",
    category: job.category || "",
    type: job.type || "",
    salaryMin: job.salaryMin || "",
    salaryMax: job.salaryMax || "",
    currency: job.currency || "usd",
    location: job.location || "",
    deadline: job.deadline ? job.deadline.split("T")[0] : "",
    isRemote: !!job.isRemote,
    responsibilities: job.responsibilities || "",
    requirements: job.requirements || "",
    benefits: job.benefits || "",
    status: job.status || "",
    companyId: job.companyId || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : value;
    setForm((p) => ({ ...p, [name]: v }));
  };

  useEffect(() => {
    // when form.companyId is updated externally, reflect in selectedCompanyId
    if (form.companyId && form.companyId !== selectedCompanyId) {
      setSelectedCompanyId(form.companyId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.companyId]);

  useEffect(() => {
    if (!companies || companies.length === 0) {
      setSelectedCompany(null);
      return;
    }

    const match = companies.find((c) => (c._id || c.id) === selectedCompanyId) || companies[0];
    setSelectedCompany(match || null);
    setForm((p) => ({ ...p, companyId: selectedCompanyId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanyId, companies]);

  useEffect(() => {
    // ensure default company selection after companies are loaded
    if (!companies || companies.length === 0) return;
    const initial = job.companyId || (companies[0]._id || companies[0].id);
    if (!selectedCompanyId && initial) {
      setSelectedCompanyId(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies]);

  const openEdit = () => setIsOpen(true);
  const closeEdit = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = { ...form };
      const updated = await updateJob(job._id, payload);

      // Merge updated fields into local job state
      setJob((prev) => ({ ...prev, ...updated }));

      toast.success("Job updated");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <tr className="border-t border-white/[0.04]">
        <td className="px-4 py-3">
          <Link href={`/jobs/${job._id}`} className="text-sm text-white font-medium hover:underline">
            {job.title}
          </Link>
        </td>

        <td className="px-4 py-3 text-sm text-zinc-300">{job.companyName || "-"}</td>

        <td className="px-4 py-3 text-sm text-zinc-300">{job.deadline ? new Date(job.deadline).toLocaleDateString() : "-"}</td>

        <td className="px-4 py-3 text-sm text-zinc-300">{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "-"}</td>

        <td className="px-4 py-3 text-sm text-zinc-300">{job.status || "-"}</td>

        <td className="px-4 py-3 text-sm text-zinc-300">{job.updatedAt ? new Date(job.updatedAt).toLocaleDateString() : "-"}</td>

        <td className="px-4 py-3 text-sm text-zinc-300 text-right">
          <button aria-label="Delete job" title="Delete" className="text-zinc-400 hover:text-red-400">
            <FiTrash />
          </button>
        </td>

        <td className="px-4 py-3 text-sm text-zinc-300 text-right">
          <button onClick={openEdit} aria-label="Edit job" title="Edit" className="text-zinc-400 hover:text-indigo-400">
            <FiEdit />
          </button>
        </td>
      </tr>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl max-h-[90vh] bg-[#0f0f0f] rounded-lg border border-white/[0.06] flex flex-col">
            <div className="p-6 overflow-auto flex-1">
              <h3 className="text-xl font-semibold text-white mb-4">Edit Job</h3>

              <form id={`job-edit-form-${job._id}`} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="title" label="Title" value={form.title} onChange={handleChange} className="bg-white/[0.03] text-white" />

                <div>
                  <label className="block text-sm text-white mb-2">Select Company</label>
                  <select value={selectedCompanyId} onChange={(e) => setSelectedCompanyId(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 text-white p-2 rounded">
                    <option value="">Choose company</option>
                    {companies && companies.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id} className="text-black">{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-white mb-2">Salary Range</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 no-spinner">
                  <Input name="salaryMin" label="Min Salary" type="number" value={form.salaryMin} onChange={handleChange} className="w-full" />
                  <Input name="salaryMax" label="Max Salary" type="number" value={form.salaryMax} onChange={handleChange} className="w-full" />
                  <div>
                    <label className="block text-sm text-white mb-2">Currency</label>
                    <select name="currency" value={form.currency} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 text-white p-2 rounded">
                      {currencies.map((cur) => (
                        <option key={cur.key} value={cur.key} className="text-black">{cur.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white mb-2">Job Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 text-white p-2 rounded">
                    <option value="">Select category</option>
                    {jobCategories.map((cat) => (
                      <option key={cat.key} value={cat.key} className="text-black">{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white mb-2">Job Type</label>
                  <select name="type" value={form.type} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/10 text-white p-2 rounded">
                    <option value="">Select type</option>
                    {jobTypes.map((t) => (
                      <option key={t.key} value={t.key} className="text-black">{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label htmlFor="remote" className="text-sm font-medium text-white">Fully Remote</label>
                  <button type="button" onClick={() => setForm((p) => ({ ...p, isRemote: !p.isRemote }))} className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${form.isRemote ? "bg-indigo-600" : "bg-white/10"}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.isRemote ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>

                {!form.isRemote && (
                  <Input name="location" label="Location (City, Country)" placeholder="e.g., New York, USA" value={form.location} onChange={handleChange} className="bg-white/[0.03] text-white w-full" />
                )}
              </div>

              <div>
                <label className="block text-sm text-white mb-1">Application Deadline</label>
                <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="w-full bg-white/[0.03] text-white p-2 rounded border border-white/10" />
              </div>

              <div className="textarea-wrap">
                <label className="block text-sm text-white mb-1">Responsibilities</label>
                <div className="textarea-scroll">
                  <TextArea name="responsibilities" value={form.responsibilities} onChange={handleChange} minRows={4} className="bg-white/[0.03] text-white w-full custom-textarea" />
                  <div className="textarea-fade" />
                </div>
              </div>

              <div className="textarea-wrap">
                <label className="block text-sm text-white mb-1">Requirements</label>
                <div className="textarea-scroll">
                  <TextArea name="requirements" value={form.requirements} onChange={handleChange} minRows={4} className="bg-white/[0.03] text-white w-full custom-textarea" />
                  <div className="textarea-fade" />
                </div>
              </div>

              <div className="textarea-wrap">
                <label className="block text-sm text-white mb-1">Benefits</label>
                <div className="textarea-scroll">
                  <TextArea name="benefits" value={form.benefits} onChange={handleChange} minRows={3} className="bg-white/[0.03] text-white w-full custom-textarea" />
                  <div className="textarea-fade" />
                </div>
              </div>

              <div>
                {selectedCompany ? (
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/10">
                    {(selectedCompany.logo || selectedCompany.logoUrl || selectedCompany.image) ? (
                      <img src={selectedCompany.logo || selectedCompany.logoUrl || selectedCompany.image} alt={selectedCompany.name} className="h-12 w-12 object-cover rounded" />
                    ) : (
                      <div className="h-12 w-12 bg-white/10 rounded flex items-center justify-center text-sm text-gray-300">No Logo</div>
                    )}
                    <div>
                      <div className="text-white font-semibold">{selectedCompany.name}</div>
                      <div className="text-xs text-gray-400">{selectedCompany.approved ? 'Approved' : 'Pending approval'}</div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-white/[0.05] border border-white/10">
                    <p className="text-sm text-gray-400">No company selected</p>
                  </div>
                )}
              </div>

              </form>
            </div>

            {/* Styles moved to globals.css for app-wide behavior */}

            <div className="p-4 border-t border-white/[0.06] bg-[#0f0f0f] flex gap-3 justify-end">
              <Button type="button" variant="bordered" className="border-white/20 text-white" onClick={closeEdit}>Cancel</Button>
              <Button form={`job-edit-form-${job._id}`} type="submit" disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white">{isSaving ? 'Saving...' : 'Save changes'}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
