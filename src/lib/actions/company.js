'use server'

import { getUserSession } from '../core/session';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const createCompany = async (companyData) => {
  const res = await fetch(`${baseUrl}/api/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(companyData),
  });

  if (!res.ok) {
    throw new Error('Failed to create company');
  }

  return res.json();
}

export const getCompanies = async (recruiterId) => {
  // If no recruiterId provided, try to get it from the current session
  if (!recruiterId) {
    const user = await getUserSession();
    // user id might be stored as `id` or `_id` depending on auth
    recruiterId = user?.id || user?._id || null;
  }

  let url = `${baseUrl}/api/companies`;
  if (recruiterId) {
    url += `?recruiterId=${encodeURIComponent(recruiterId)}`;
  }

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch companies');
  const data = await res.json();
  return data.companies || [];
}

export const getCompanyById = async (id) => {
  const companies = await getCompanies();
  return companies.find((c) => c._id === id) || null;
}
