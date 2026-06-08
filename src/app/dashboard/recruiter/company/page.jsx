import React from 'react';
import CompanyHeader from '@/components/dashboard/CompanyHeader';
import { getCompanies } from '@/lib/actions/company';
import CompanyCard from '@/components/dashboard/CompanyCard';
import { getUserSession } from '@/lib/core/session';

export default async function CompanyPage() {
  const companies = await getCompanies();
  const user = await getUserSession();
  console.log("user session in company page,", user);

  return (
    <main className="min-h-screen text-white p-8 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <CompanyHeader recruiter={user} />

        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {companies.length === 0 ? (
              <div className="text-slate-300">No companies yet. Register one to get started.</div>
            ) : (
              companies.map((c) => <CompanyCard key={c._id} company={c} user={user} />)
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
