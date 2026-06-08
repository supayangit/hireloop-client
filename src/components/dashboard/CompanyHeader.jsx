"use client"
import React, { useState } from 'react';
import { Button, Input, TextArea } from '@heroui/react';
import { FiPlus, FiX, FiMapPin, FiUsers, FiGlobe, FiTag, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { createCompany } from '@/lib/actions/company';
import { ObjectId } from "mongodb";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();

    if (!data.secure_url) {
        throw new Error("Image upload failed");
    }

    return data.secure_url;
};

const industries = [
    { key: 'technology', label: 'Technology' },
    { key: 'finance', label: 'Finance' },
    { key: 'healthcare', label: 'Healthcare' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'design', label: 'Design' },
];

const employeeRanges = [
    { key: '1-10', label: '1-10' },
    { key: '11-50', label: '11-50' },
    { key: '51-200', label: '51-200' },
    { key: '201-500', label: '201-500' },
    { key: '500+', label: '500+' },
];

const CompanyHeader = ({ recruiter }) => {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const recruiterId = recruiter?.id
        ? new ObjectId(recruiter.id)
        : null;
    console.log("recruiter id:", recruiterId);

    const [form, setForm] = useState({
        name: '',
        website: '',
        email: '',
        description: '',
        industry: 'technology',
        location: '',
        employeesRange: '',
        logo: '',
        status: 'pending',
        recruiterId: recruiterId,
    });

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const [logoFile, setLogoFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLogoFile(file);

        // optional preview (fast UX)
        setForm((p) => ({
            ...p,
            logo: URL.createObjectURL(file),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let logoUrl = "";

            // 1. Upload image first
            if (logoFile) {
                setUploading(true);
                logoUrl = await uploadImageToCloudinary(logoFile);
                setUploading(false);
            }

            // 2. Create payload with URL (NOT base64)
            const payload = {
                ...form,
                logo: logoUrl,
                approved: false,
            };

            const res = await createCompany(payload);

            if (res?.insertedId) {
                toast.success("Company registered");
            } else {
                toast.success("Company registration submitted");
            }

            // reset
            setForm({
                name: '',
                website: '',
                email: '',
                description: '',
                industry: 'technology',
                location: '',
                employeesRange: '',
                logo: '',
                status: 'pending',
                recruiterId: recruiterId,
            });

            setLogoFile(null);
            closeModal();
        } catch (err) {
            console.error(err);
            toast.error("Failed to register company");
        } finally {
            setIsSubmitting(false);
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-white">My Company</h2>
                <p className="text-sm text-slate-300">Manage your company profile and settings</p>
            </div>

            <div>
                <Button onClick={openModal} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <FiPlus />
                    Register a Company
                </Button>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/60" onClick={closeModal} />
                    <div className="relative w-full max-w-2xl mx-4 bg-slate-900 border border-slate-700 rounded-lg p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Register a Company</h3>
                            <button onClick={closeModal} className="text-slate-300 hover:text-white"><FiX /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm text-slate-300 flex items-center gap-2"><FiTag /> Company Name</label>
                                <Input name="name" value={form.name} onChange={handleChange} required className="mt-1 bg-slate-800 border-slate-700 text-white" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-slate-300 flex items-center gap-2"><FiGlobe /> Website</label>
                                    <Input name="website" value={form.website} onChange={handleChange} className="mt-1 bg-slate-800 border-slate-700 text-white" />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-300 flex items-center gap-2"><FiMapPin /> Location</label>
                                    <Input name="location" value={form.location} onChange={handleChange} className="mt-1 bg-slate-800 border-slate-700 text-white" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-slate-300 flex items-center gap-2"><FiTag /> Industry</label>
                                    <select name="industry" value={form.industry} onChange={handleChange} className="w-full mt-1 bg-slate-800 border border-slate-700 text-white p-2 rounded">
                                        {industries.map((it) => (
                                            <option key={it.key} value={it.key} className="text-black">{it.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm text-slate-300 flex items-center gap-2"><FiUsers /> Employees</label>
                                    <select name="employeesRange" value={form.employeesRange} onChange={handleChange} className="w-full mt-1 bg-slate-800 border border-slate-700 text-white p-2 rounded">
                                        <option value="">Select size</option>
                                        {employeeRanges.map((r) => (
                                            <option key={r.key} value={r.key} className="text-black">{r.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-slate-300 flex items-center gap-2"><FiUpload /> Company Logo</label>
                                <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 text-sm text-slate-300" />
                                {form.logo && <img src={form.logo} alt="logo" className="mt-3 h-16 w-16 object-cover rounded" />}
                            </div>

                            <div>
                                <label className="text-sm text-slate-300 flex items-center gap-2"><FiMapPin /> Contact Email</label>
                                <Input name="email" value={form.email} onChange={handleChange} type="email" className="mt-1 bg-slate-800 border-slate-700 text-white" />
                            </div>

                            <div>
                                <label className="text-sm text-slate-300">Description</label>
                                <TextArea name="description" value={form.description} onChange={handleChange} minRows={4} className="mt-1 bg-slate-800 border-slate-700 text-white" />
                            </div>

                            <div className="flex items-center justify-end gap-3">
                                <Button variant="bordered" onClick={closeModal} className="border-white/10 text-white">Cancel</Button>
                                <Button type="submit" disabled={isSubmitting || uploading}>
                                    {uploading
                                        ? "Uploading logo..."
                                        : isSubmitting
                                            ? "Submitting..."
                                            : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyHeader;
