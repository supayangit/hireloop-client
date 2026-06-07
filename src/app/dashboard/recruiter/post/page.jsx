import React from 'react';
import NewJobClient from '../jobs/new/NewJobClient';

export const metadata = {
  title: 'Post a Job',
};

export default function PostJobPage() {
  return (
    <div>
      <NewJobClient />
    </div>
  );
}
