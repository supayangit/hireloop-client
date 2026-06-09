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

// If recruiterId is provided (or inferred from session), fetch companies
// for that recruiter and include their companyId(s) as query params
// to the jobs API so only jobs belonging to those companies are returned.
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
    const jobs = await getJobs();
    return jobs.find(j => j._id === id) || null;
}

// Fetch all jobs without recruiter/company filtering
export const getAllJobs = async () => {
    const url = `${baseUrl}/api/jobs`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch jobs');
    const data = await res.json();
    return data.jobs || [];
}