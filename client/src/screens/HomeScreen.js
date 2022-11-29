import { React, useContext, useEffect } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import ToolBar from '../components/ToolBar';
import { GlobalStoreContext } from '../store';

const HomeScreen = () => {
  const { store } = useContext(GlobalStoreContext);

  const handleAddPlaylist = () => {
    store.createNewList();
    console.log('hello');
  };

  useEffect(() => {
    store.loadUsersLists();
  }, []);

  return (
    <>
      <Box sx={{ bgcolor: '#f6f6f6' }}>
        <ToolBar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right' }}>
              <IconButton sx={{ mr: 3 }} onClick={handleAddPlaylist}>
                <Add />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomeScreen;
