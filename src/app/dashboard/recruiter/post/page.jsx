import React from 'react';
import NewJobClient from './NewJobClient';
import { getUserSession } from '@/lib/core/session';
import { getCompanies } from '@/lib/actions/company';

export const metadata = {
  title: 'Post a Job',
};

export default async function PostJobPage() {
    
   const user = await getUserSession();
   const recruiterId = user?.id || user?._id || null;
   const companies = await getCompanies(recruiterId);
 
   return (
     <div>
       <NewJobClient recruiterId={recruiterId} companies={companies} />
    </div>
  );
}
