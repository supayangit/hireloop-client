'use server'

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

export const getCompanies = async () => {
  // Fetch the rendered list of companies from the public API
  const res = await fetch(`${baseUrl}/api/companies`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch companies');
  const data = await res.json();
  return data.companies || [];
}

export const getCompanyById = async (id) => {
  const companies = await getCompanies();
  return companies.find((c) => c._id === id) || null;
}
