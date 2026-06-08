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
  console.log("getCompanies recruiterId:", recruiterId);

  let url = `${baseUrl}/api/companies`;

  if (recruiterId) {
    url += `?recruiterId=${encodeURIComponent(recruiterId)}`;
  }

  console.log("URL:", url);

  const res = await fetch(url, { cache: "no-store" });

  const data = await res.json();

  console.log("API RESPONSE:", data);

  return data.companies || [];
};

export const getCompanyById = async (id) => {
  const companies = await getCompanies();
  return companies.find((c) => c._id === id) || null;
}
