"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Typography, Pagination } from '@mui/material';

const jobList = [
  { id: 21, title: 'Civil Service Officer', company: 'Government of the United States', location: 'Washington, DC' },
  { id: 22, title: 'Public Health Inspector', company: 'Department of Health', location: 'New York, NY' },
  { id: 23, title: 'Law Enforcement Officer', company: 'Federal Bureau of Investigation (FBI)', location: 'Washington, DC' },
  { id: 24, title: 'Administrative Officer', company: 'US Department of Administration', location: 'Chicago, IL' },
  { id: 25, title: 'Environmental Scientist', company: 'Environmental Protection Agency (EPA)', location: 'San Francisco, CA' },
  { id: 26, title: 'Firefighter', company: 'City Fire Department', location: 'Los Angeles, CA' },
  { id: 27, title: 'Tax Auditor', company: 'Internal Revenue Service (IRS)', location: 'Houston, TX' },
  { id: 28, title: 'Social Worker', company: 'Department of Social Services', location: 'Philadelphia, PA' },
  { id: 29, title: 'Postal Worker', company: 'United States Postal Service (USPS)', location: 'Denver, CO' },
  { id: 30, title: 'Federal Judge', company: 'US District Court', location: 'Washington, DC' },
  { id: 31, title: 'State Governor', company: 'State Government', location: 'Sacramento, CA' },
  { id: 32, title: 'Congressional Staffer', company: 'US Congress', location: 'Washington, DC' },
  { id: 33, title: 'Park Ranger', company: 'National Park Service', location: 'Yellowstone National Park, WY' },
  { id: 34, title: 'Border Patrol Agent', company: 'US Customs and Border Protection', location: 'San Diego, CA' },
  { id: 35, title: 'Fish and Wildlife Biologist', company: 'US Fish and Wildlife Service', location: 'Anchorage, AK' },
  { id: 36, title: 'Veterans Affairs Specialist', company: 'Department of Veterans Affairs', location: 'Atlanta, GA' },
  { id: 37, title: 'Public Defender', company: 'County Public Defender Office', location: 'Miami, FL' },
  { id: 38, title: 'Emergency Management Director', company: 'Federal Emergency Management Agency (FEMA)', location: 'New Orleans, LA' },
  { id: 39, title: 'Foreign Service Officer', company: 'US Department of State', location: 'Washington, DC' },
  { id: 40, title: 'Transportation Security Officer', company: 'Transportation Security Administration (TSA)', location: 'Chicago, IL' },
];

function LatestJobsPage() {
  const [page, setPage] = useState(1);
  const jobsPerPage = 10;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsOnPage = jobList.slice(startIndex, endIndex);

  return (
    <div>
      <Typography variant="h3" gutterBottom style={{ fontSize: '24px' }}>
        Latest Government Jobs
      </Typography>
      <ul style={{ padding: 0 }}>
        {jobsOnPage.map((job) => (
          <li key={job.id} style={{ marginBottom: '10px' }}>
            <Link href={`/latest-jobs/${job.id}`} passHref style={{ color: 'blue' }}>
              {job.title} at {job.company}, {job.location}
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        count={Math.ceil(jobList.length / jobsPerPage)}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="large"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
}

export default LatestJobsPage;
