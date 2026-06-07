"use client";

import React, { useState } from "react";
import { Input, Button, TextArea, Card, CardContent, CardHeader } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";


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

// Mock company used as a fallback when a real company ID is not available.
// This provides a stable-ish random id so submissions don't fail in dev.
const mockCompany = {
    id: `mock_${Math.random().toString(36).substring(2, 9)}`,
    name: "Acme Corp",
    approved: true,
};
export default function NewJobClient() {
    const { data: session } = authClient.useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isRemote, setIsRemote] = useState(false);

    const [formData, setFormData] = useState({
        // Job Info
        title: "",
        category: "",
        type: "",
        salaryMin: "",
        salaryMax: "",
        currency: "usd",
        location: "",
        deadline: "",
        isRemote: false,
        // Job Description
        responsibilities: "",
        requirements: "",
        benefits: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e, field) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleRemoteToggle = () => {
        setIsRemote(!isRemote);
        setFormData((prev) => ({ ...prev, isRemote: !isRemote }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title || !formData.category || !formData.type) {
            toast.error("Please fill in all required Job Info fields");
            return;
        }

        if (!formData.salaryMin || !formData.salaryMax) {
            toast.error("Please enter salary range");
            return;
        }

        if (!formData.isRemote && !formData.location) {
            toast.error("Please enter location or mark as remote");
            return;
        }

        if (!formData.deadline) {
            toast.error("Please set an application deadline");
            return;
        }

        if (!formData.responsibilities || !formData.requirements) {
            toast.error("Please fill in responsibilities and requirements");
            return;
        }

        setIsLoading(true);

        try {
            // prefer a real company id from session if available, otherwise use mockCompany
            const companyId = session?.user?.companyId || session?.user?.company?.id || mockCompany.id;

            const payload = {
                ...formData,
                recruiterId: session?.user?.id,
                status: "active",
                isPublic: true,
                companyId,
            };

            const res = await createJob(payload);
            if (res.insertedId) {
                toast.success("Job posted successfully!");

                console.log("========== JOB SUBMISSION ==========");
                console.log(payload);
                console.log("===================================");

                setFormData({
                    title: "",
                    category: "",
                    type: "",
                    salaryMin: "",
                    salaryMax: "",
                    currency: "usd",
                    location: "",
                    deadline: "",
                    isRemote: false,
                    responsibilities: "",
                    requirements: "",
                    benefits: "",
                });
                setIsRemote(false);
                redirect(`/dashboard/recruiter/jobs/${res.insertedId}`); // Redirect to the new job's detail page   
            }

        } catch (err) {
            console.error(err);
            toast.error("Failed to process job");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen text-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Post a New Job</h1>
                    <p className="text-gray-400">Fill in the job details below to post your job listing</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Job Info Section */}
                    <Card className="bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                        <CardHeader className="flex flex-col items-start px-6 py-5 border-b border-white/10">
                            <h2 className="text-xl font-semibold text-white">Job Information</h2>
                            <p className="text-sm text-gray-400 mt-1">Basic details about the job</p>
                        </CardHeader>
                        <CardContent className="px-6 py-6 space-y-5">
                            {/* Job Title */}
                            <Input
                                name="title"
                                label="Job Title *"
                                placeholder="e.g., Senior Frontend Developer"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="bg-white/[0.05] border-white/10 text-white"
                                classNames={{
                                    label: "text-white",
                                    input: "text-white placeholder-gray-500",
                                }}
                            />

                            {/* Job Category & Type - Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm text-white mb-2">Job Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleSelectChange(e, "category")}
                                        className="w-full bg-white/[0.05] border border-white/10 text-white p-2 rounded"
                                    >
                                        <option value="" className="text-black">Select category</option>
                                        {jobCategories.map((cat) => (
                                            <option key={cat.key} value={cat.key} className="text-black">
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-white mb-2">Job Type *</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => handleSelectChange(e, "type")}
                                        className="w-full bg-white/[0.05] border border-white/10 text-white p-2 rounded"
                                    >
                                        <option value="" className="text-black">Select type</option>
                                        {jobTypes.map((type) => (
                                            <option key={type.key} value={type.key} className="text-black">
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Salary Range & Currency - Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <Input
                                    name="salaryMin"
                                    type="number"
                                    label="Min Salary *"
                                    placeholder="e.g., 50000"
                                    value={formData.salaryMin}
                                    onChange={handleInputChange}
                                    className="bg-white/[0.05] border-white/10"
                                    classNames={{
                                        label: "text-white",
                                        input: "text-white placeholder-gray-500",
                                    }}
                                />

                                <Input
                                    name="salaryMax"
                                    type="number"
                                    label="Max Salary *"
                                    placeholder="e.g., 80000"
                                    value={formData.salaryMax}
                                    onChange={handleInputChange}
                                    className="bg-white/[0.05] border-white/10"
                                    classNames={{
                                        label: "text-white",
                                        input: "text-white placeholder-gray-500",
                                    }}
                                />

                                <div>
                                    <label className="block text-sm text-white mb-2">Currency *</label>
                                    <select
                                        value={formData.currency}
                                        onChange={(e) => handleSelectChange(e, "currency")}
                                        className="w-full bg-white/[0.05] border border-white/10 text-white p-2 rounded"
                                    >
                                        {currencies.map((cur) => (
                                            <option key={cur.key} value={cur.key} className="text-black">
                                                {cur.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Location / Remote Toggle */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <label htmlFor="remote" className="text-sm font-medium text-white">
                                        Fully Remote
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleRemoteToggle}
                                        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${isRemote ? "bg-indigo-600" : "bg-white/10"
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isRemote ? "translate-x-6" : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>
                                {!isRemote && (
                                    <Input
                                        name="location"
                                        label="Location (City, Country)"
                                        placeholder="e.g., New York, USA"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="bg-white/[0.05] border-white/10"
                                        classNames={{
                                            label: "text-white",
                                            input: "text-white placeholder-gray-500",
                                        }}
                                    />
                                )}
                            </div>

                            {/* Application Deadline */}
                            <Input
                                name="deadline"
                                type="date"
                                label="Application Deadline *"
                                value={formData.deadline}
                                onChange={handleInputChange}
                                className="bg-white/[0.05] border-white/10"
                                classNames={{
                                    label: "text-white",
                                    input: "text-white placeholder-gray-500",
                                }}
                            />
                        </CardContent>
                    </Card>

                    {/* Job Description Section */}
                    <Card className="bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                        <CardHeader className="flex flex-col items-start px-6 py-5 border-b border-white/10">
                            <h2 className="text-xl font-semibold text-white">Job Description</h2>
                            <p className="text-sm text-gray-400 mt-1">Describe the role and requirements</p>
                        </CardHeader>
                        <CardContent className="px-6 py-6 space-y-5">
                            {/* Responsibilities */}
                            <TextArea
                                name="responsibilities"
                                label="Responsibilities *"
                                placeholder="Describe key responsibilities and tasks..."
                                value={formData.responsibilities}
                                onChange={handleInputChange}
                                minRows={5}
                                className="bg-white/[0.05] border-white/10"
                                classNames={{
                                    label: "text-white",
                                    input: "text-white placeholder-gray-500",
                                }}
                            />

                            {/* Requirements */}
                            <TextArea
                                name="requirements"
                                label="Requirements *"
                                placeholder="List required skills and experience..."
                                value={formData.requirements}
                                onChange={handleInputChange}
                                minRows={5}
                                className="bg-white/[0.05] border-white/10"
                                classNames={{
                                    label: "text-white",
                                    input: "text-white placeholder-gray-500",
                                }}
                            />

                            {/* Benefits */}
                            <TextArea
                                name="benefits"
                                label="Benefits (Optional)"
                                placeholder="List any perks and benefits offered..."
                                value={formData.benefits}
                                onChange={handleInputChange}
                                minRows={4}
                                className="bg-white/[0.05] border-white/10"
                                classNames={{
                                    label: "text-white",
                                    input: "text-white placeholder-gray-500",
                                }}
                            />
                        </CardContent>
                    </Card>

                    {/* Company Section */}
                    <Card className="bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                        <CardHeader className="flex flex-col items-start px-6 py-5 border-b border-white/10">
                            <h2 className="text-xl font-semibold text-white">Company</h2>
                            <p className="text-sm text-gray-400 mt-1">Auto-filled from your registered company</p>
                        </CardHeader>
                        <CardContent className="px-6 py-6">
                            <div className="p-4 rounded-lg bg-white/[0.05] border border-white/10">
                                <p className="text-sm text-gray-400">Company Info</p>
                                <p className="text-white font-semibold mt-1">Your registered company will be linked to this job</p>
                                <p className="text-xs text-gray-500 mt-2">Ensure your company is approved by an admin to make this job publicly visible</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex gap-3 justify-end pt-6">
                        <Button
                            type="button"
                            variant="bordered"
                            className="border-white/20 text-white"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            <Check />
                            {isLoading ? "Publishing..." : "Publish Job"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}