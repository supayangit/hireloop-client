'use server'

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

export const getJobs = async () => {
    const res = await fetch(`${baseUrl}/api/jobs`, { cache: 'no-store' });
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