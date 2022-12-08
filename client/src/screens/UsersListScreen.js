import { React, useContext, useEffect, useState } from 'react';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { GlobalStoreContext } from '../store';
import ToolBar from '../components/ToolBar';
import PlaylistCard from '../components/PlaylistCard';
import VideoPlayer from '../components/VideoPlayer';
import Comments from '../components/Comments';
import StatusBar from '../components/StatusBar';

const HomeScreen = () => {
  const { store } = useContext(GlobalStoreContext);
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    store.setScreen('USERS');
  }, []);

  let playlistCards = '';
  if (store.visiblePlaylists !== null) {
    playlistCards = (
      <Box
        sx={{
          p: 4,
          maxHeight: '70vh',
          height: '70vh',
          overflow: 'auto',
        }}
      >
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

  let videoPlayerStyle =
    currentTab === 0 ? { p: 2 } : { p: 2, display: 'none' };
  let commentsStyle = currentTab === 1 ? { p: 2 } : { p: 2, display: 'none' };

  return (
    <>
      <Box sx={{ bgcolor: '#f6f6f6' }}>
        <ToolBar />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            {playlistCards}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tabs value={currentTab} onChange={handleChange}>
              <Tab label='Player' />
              <Tab label='Comments' />
            </Tabs>
            <Box sx={videoPlayerStyle}>
              <VideoPlayer />
            </Box>
            <Box sx={commentsStyle}>{currentTab === 1 && <Comments />}</Box>
          </Grid>
        </Grid>
        <StatusBar />
      </Box>
    </>
  );
};

export default HomeScreen;
