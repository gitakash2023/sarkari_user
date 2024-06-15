// BlogsPage.js
import React from 'react';
import Link from 'next/link';
import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import Image from 'next/image'; // Import Image component from next/image

const blogsData = [
  { id: 1, title: 'Introduction to React Hooks', author: 'John Doe', publish_date: '2024-06-15', category: 'Programming', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', image: '/images/react-hooks.jpg' },
  { id: 2, title: 'Mastering CSS Grid Layout', author: 'Jane Smith', publish_date: '2024-06-18', category: 'Web Development', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', image: '/images/css-grid.jpg' },
  // Add more blog entries here...
];

const BlogsPage = () => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Latest Blogs
      </Typography>
      <Grid container spacing={3}>
        {blogsData.map((blog) => (
          <Grid item key={blog.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <Image src={blog.image} alt={blog.title} layout="fill" objectFit="cover" />
                </div>
                <Typography variant="h5" component="h2" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {blog.author} - {blog.publish_date}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {blog.content.substring(0, 150)}...
                </Typography>
                <Link href={`/blogs/${blog.id}`} passHref>
                  <Button variant="contained" color="primary">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BlogsPage;
