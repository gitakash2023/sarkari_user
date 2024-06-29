"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Typography, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';

// Custom styled component for heading styles
const StyledHeading = styled('div')({
  ' & h2, & h3, & h4, & h5, & h6': {
    backgroundColor: 'blue',
    color: 'white !important',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
});

const StyledContent = styled('div')(({ theme }) => ({
  '& table': {
    width: '100%',
    margin: '20px 0',
    borderCollapse: 'collapse',
    '& th, & td': {
      border: '1px solid #ccc',
      padding: '10px',
    },
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    margin: '20px 0',
  },
  '& p': {
    margin: '10px 0',
  },
  // Specific table styling to override any inline styles
  '& table.MsoTableGridLight, & table.MsoTableGrid': {
    width: '100% !important',
    margin: '20px 0 !important',
    '& th, & td': {
      border: '1px solid #ccc !important',
      padding: '10px !important',
    },
  },
}));

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`https://backend.indiadatabaseprovider.com/api/job-posts/${id}`);
        console.log("Fetched job details:", res.data);
        // Assuming res.data is an object with job details
        setJob(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>No job found</div>;

  return (
    <div>
      <StyledHeading>
        <Typography variant="h4" gutterBottom>{job.title}</Typography>
      </StyledHeading>
      <StyledContent>
       
        <div dangerouslySetInnerHTML={{ __html: job.content }} />
      </StyledContent>
    </div>
  );
};

export default JobDetailsPage;
