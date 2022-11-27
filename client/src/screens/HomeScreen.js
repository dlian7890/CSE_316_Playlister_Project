import React from 'react';
import { Box } from '@mui/material';
import ToolBar from '../components/ToolBar';

const HomeScreen = () => {
  return (
    <>
      <Box sx={{ bgcolor: '#f6f6f6' }}>
        <ToolBar />
      </Box>
    </>
  );
};

export default HomeScreen;
