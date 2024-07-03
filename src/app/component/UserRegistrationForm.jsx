"use client"
import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { _create } from '../../utils/apiUtils'; // Adjust the path as per your project structure

const registrationFields = [
  { label: "Name", name: "name", type: "text" },
  { label: "Profile Photo", name: "profilePhoto", type: "file" },
  { label: "Mobile No (Verified)", name: "mobile", type: "tel" },
  { label: "EMail ID (Verified)", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
  { label: "City", name: "city", type: "text" },
  { label: "State", name: "state", type: "text" },
  { label: "Pincode", name: "pincode", type: "text" },
  { label: "Date of Birth", name: "dob", type: "date" },
  { label: "Gender", name: "gender", type: "select", options: ['Male', 'Female', 'Other'] },
  { label: "Address", name: "address", type: "text" },
  { label: "12th Class - Completed?", name: "twelfthCompleted", type: "select", options: ['Yes', 'No'] },
  { label: "Graduation - Completed?", name: "graduationCompleted", type: "select", options: ['Yes', 'No'] },
  { label: "Post Graduation - Completed?", name: "postGraduationCompleted", type: "select", options: ['Yes', 'No'] }
];

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    profilePhoto: null,
    mobile: '',
    email: '',
    password: '',
    city: '',
    state: '',
    pincode: '',
    dob: '',
    gender: '',
    address: '',
    twelfthCompleted: '',
    graduationCompleted: '',
    postGraduationCompleted: ''
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your API function to create the user
      const response = await _create('/api/users', formData); // Replace '/api/users' with your actual API endpoint
      console.log('User registered:', response);

      // Reset form after successful submission
      setFormData({
        name: '',
        profilePhoto: null,
        mobile: '',
        email: '',
        password: '',
        city: '',
        state: '',
        pincode: '',
        dob: '',
        gender: '',
        address: '',
        twelfthCompleted: '',
        graduationCompleted: '',
        postGraduationCompleted: ''
      });

      // Show success message or navigate to another page
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error: show error message to user or retry logic
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>User Registration</Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
          {registrationFields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              {field.type === 'date' ? (
                <FormControl fullWidth>
                  <InputLabel shrink>{field.label}</InputLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                    required
                  />
                </FormControl>
              ) : field.type === 'select' ? (
                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    value={formData[field.name]}
                    onChange={handleChange}
                    label={field.label}
                    name={field.name}
                  >
                    {field.options.map((option, idx) => (
                      <MenuItem key={idx} value={option.toLowerCase()}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  variant="outlined"
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  inputProps={{ accept: 'image/*' }} // Only for file input
                  InputLabelProps={field.type === 'file' ? { shrink: true } : undefined}
                  required
                />
              )}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UserRegistrationForm;
