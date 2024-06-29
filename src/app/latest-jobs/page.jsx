"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Typography, Pagination } from '@mui/material';

const LatestJobsPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://backend.indiadatabaseprovider.com/api/job-posts');
        setData(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsOnPage = data.slice(startIndex, endIndex);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Typography variant="h3" gutterBottom style={{ fontSize: '24px' }}>
        Latest Government Jobs
      </Typography>
      <ul style={{ padding: 0 }}>
        {jobsOnPage.map((job) => (
          <li key={job.id} style={{ marginBottom: '10px', listStyle: 'none' }}>
            <Link href={`/latest-jobs/${job.id}`} style={{ color: 'blue' }}>
              {job.title} at {job.company}, {job.location}
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        count={Math.ceil(data.length / jobsPerPage)}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="large"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default LatestJobsPage;
