'use server'

import { getUserSession } from '../core/session';
import { getCompanies } from './company';

const baseUrl =  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
export const createJob = async(newJobData) => {
    const res = await fetch(`${baseUrl}/api/jobs`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJobData),
    })
    return res.json();
}

export const getJobs = async (recruiterId) => {
    // If no recruiterId provided, try to get it from the current session
    if (!recruiterId) {
        const user = await getUserSession();
        recruiterId = user?.id || user?._id || null;
    }

    let url = `${baseUrl}/api/jobs`;

    if (recruiterId) {
        // Fetch companies for recruiter and build companyId query params
        const companies = await getCompanies(recruiterId);
        const companyIds = (companies || []).map(c => c._id).filter(Boolean);

        if (companyIds.length === 0) {
            // No companies for this recruiter -> return empty list early
            return [];
        }

        // Build query like ?companyId=id1&companyId=id2...
        const qs = companyIds.map(id => `companyId=${encodeURIComponent(id)}`).join('&');
        url = `${url}?${qs}`;
    }

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch jobs');
    }
    const data = await res.json();
    return data.jobs || [];
}

export const getJobById = async (id) => {
    if (!id) return null;
    const res = await fetch(`${baseUrl}/api/jobs/${encodeURIComponent(id)}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch job');
    const data = await res.json();
    return data.job || data || null;
}

// Fetch all jobs with optional server-side filtering parameters
export const getAllJobs = async (filters = {}) => {
    const { search, category, type } = filters;
    
    // Construct URL query parameters dynamically
    const params = new URLSearchParams();
    
    if (search) params.append('search', search);
    if (category && category !== 'all') params.append('category', category);
    if (type && type !== 'all') params.append('type', type);

    // Append query string if any filters exist
    const queryString = params.toString();
    const url = `${baseUrl}/api/jobs${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch jobs');
    
    const data = await res.json();
    return data.jobs || [];
};

// Update a job by id
export const updateJob = async (id, updateData) => {
    if (!id) throw new Error('Missing job id');

    // Ensure updatedAt is included
    const payload = { ...updateData, updatedAt: new Date().toISOString() };

    const res = await fetch(`${baseUrl}/api/jobs/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to update job: ${text}`);
    }

    const data = await res.json();
    // Expect API to return the updated job as `job` or the whole object
    return data.job || data || {};
}