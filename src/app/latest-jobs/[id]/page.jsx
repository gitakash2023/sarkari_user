"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Typography, CircularProgress, Box, Fab } from '@mui/material';
import { styled } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// Custom styled component for heading styles
const StyledHeading = styled('div')({
  '& h2, & h3, & h4, & h5, & h6': {
    backgroundColor: 'navy', 
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

const ScrollTopButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`https://backend.indiadatabaseprovider.com/api/job-posts/${id}`);
        console.log("Fetched job details:", res.data);
        if (res.data.length > 0) {
          setJob(res.data[0]);
        } else {
          throw new Error('Job not found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>No job found</div>;

  return (
    <Box sx={{ p: 3 }}>
      <StyledHeading>
        <Typography variant="h4" gutterBottom>{job.title}</Typography>
      </StyledHeading>
      <StyledContent>
        <Typography variant="body1">Content:</Typography>
        <div dangerouslySetInnerHTML={{ __html: job.content }} />
      </StyledContent>
      {showScrollTop && (
        <ScrollTopButton color="primary" onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </ScrollTopButton>
      )}
    </Box>
  );
};

export default JobDetailsPage;
