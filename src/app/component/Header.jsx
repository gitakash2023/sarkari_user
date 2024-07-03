"use client"
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Search as SearchIcon } from '@mui/icons-material';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'Latest Jobs', href: '/latest-jobs' },
    { text: 'State wise Jobs', href: '/state-wise-jobs' },
    { text: 'Admit Card', href: '/admit-card' },
    { text: 'Sarkari Result', href: '/sarkari-result' },
    { text: 'Exam Answer Key', href: '/exam-answer-key' },
    { text: 'Books', href: '/books' },
    { text: 'Old Papers', href: '/old-papers' },
    { text: 'Mock Test', href: '/mock-test' },
    { text: 'Filtered Job', href: '/filtered-job' },
    { text: 'Blogs', href: '/blogs' },
    { text: 'Web Stories', href: '/web-stories' },
    // { text: 'Profile', href: '/profile' } // Added profile page link
  ];

  const MenuLink = styled(Link)(({ theme }) => ({
    color: 'white',
    textDecoration: 'none',
    position: 'relative',
    fontSize: '0.875rem',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '0',
      height: '2px',
      bottom: '-2px',
      left: '0',
      backgroundColor: theme.palette.secondary.main,
      visibility: 'hidden',
      transition: 'all 0.3s ease-in-out',
    },
    '&:hover::after': {
      visibility: 'visible',
      width: '100%',
    },
  }));

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1976d2', mb: 8 }}>
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 2 }}>
          {menuItems.map((item, index) => (
            <MenuLink key={index} href={item.href} underline="none" variant="body2">{item.text}</MenuLink>
          ))}
        </Box>
        <TextField
          id="search"
          variant="outlined"
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <IconButton aria-label="search">
                <SearchIcon />
              </IconButton>
            ),
          }}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            marginLeft: 'auto',
            '& .MuiInputBase-root': {
              borderRadius: '20px',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
          }}
        />
        {isMobile && (
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              <List>
                {menuItems.map((item, index) => (
                  <ListItem button component={Link} key={index} href={item.href} onClick={toggleDrawer(false)}>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
