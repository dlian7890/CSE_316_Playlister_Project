import { React, useContext, useEffect, useState } from 'react';
import { Box, Grid, IconButton, Tab, Tabs } from '@mui/material';
import { GlobalStoreContext } from '../store';
import { Add } from '@mui/icons-material';
import ToolBar from '../components/ToolBar';
import PlaylistCard from '../components/PlaylistCard';
import VideoPlayer from '../components/VideoPlayer';

const HomeScreen = () => {
  const { store } = useContext(GlobalStoreContext);
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleAddPlaylist = () => {
    store.createNewList();
  };

  useEffect(() => {
    store.loadUsersLists();
  }, []);

  let playlistCards = '';
  if (store.visiblePlaylists !== null) {
    playlistCards = (
      <Box sx={{ m: 2 }}>
        {store.visiblePlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist._id}
            playlist={playlist}
            selected={false}
          />
        ))}
      </Box>
    );
  }

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
            {playlistCards}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tabs value={currentTab} onChange={handleChange}>
              <Tab label='Player' />
              <Tab label='Comments' />
            </Tabs>
            <Box sx={{ p: 2 }}>{currentTab === 0 && <VideoPlayer />}</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomeScreen;
