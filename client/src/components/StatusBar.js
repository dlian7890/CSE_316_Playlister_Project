import React, { useContext } from 'react';
import GlobalStoreContext from '../store';
import { Box, Typography, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
const StatusBar = () => {
  const { store } = useContext(GlobalStoreContext);

  const handleAddPlaylist = () => {
    store.createNewList();
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {store.currentScreen === 'HOME' && (
        <IconButton sx={{ mr: 3 }} onClick={handleAddPlaylist}>
          <Add />
        </IconButton>
      )}
      <Typography>
        {store.searchText !== ''
          ? store.searchText + ' Playlists'
          : store.currentScreen === 'HOME'
          ? 'Your Playlists'
          : 'Published Playlists'}
      </Typography>
    </Box>
  );
};

export default StatusBar;
