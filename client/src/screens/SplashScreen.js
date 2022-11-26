import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <Box
      className='splash-screen'
      sx={{
        pt: '25vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '75vh',
      }}
    >
      <Typography mb={3} variant='h3' color='white'>
        Welcome To
      </Typography>
      <Typography mb={3} variant='h1' color='white'>
        Playlister
      </Typography>
      <Typography variant='h5' color='white'>
        Explore and Compose Playlists of Countless
      </Typography>
      <Typography mb={3} variant='h5' color='white'>
        Songs on the Internet
      </Typography>
      <Typography variant='body' color='white'>
        Created and Designed by
      </Typography>
      <Typography mb={10} variant='body' color='white'>
        Danny Lian
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '50vw',
        }}
      >
        <Button variant='contained' size='large'>
          Create Account
        </Button>
        <Button variant='contained' size='large'>
          Login
        </Button>
        <Button variant='contained' size='large'>
          Continue as Guest
        </Button>
      </Box>
    </Box>
  );
};

export default SplashScreen;
