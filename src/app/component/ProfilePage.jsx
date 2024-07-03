"use client";
import { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('userRegistrationData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  if (!userData) {
    return <Typography variant="h6">No user data found. Please register first.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Avatar
                alt={userData.name}
                src={userData.profilePhoto}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6">Name: {userData.name}</Typography>
              <Typography variant="body1">Mobile: {userData.mobile}</Typography>
              <Typography variant="body1">Email: {userData.email}</Typography>
              <Typography variant="body1">City: {userData.city}</Typography>
              <Typography variant="body1">State: {userData.state}</Typography>
              <Typography variant="body1">Pincode: {userData.pincode}</Typography>
              <Typography variant="body1">12th Class: {userData.twelfthClass}</Typography>
              <Typography variant="body1">Graduation: {userData.graduation}</Typography>
              <Typography variant="body1">Post Graduation: {userData.postGraduation}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
