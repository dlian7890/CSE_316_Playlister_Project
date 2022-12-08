import { React, useContext, useState, useEffect } from 'react';
import GlobalStoreContext from '../store';
import { Box, IconButton, Typography } from '@mui/material';
import {
  Pause,
  PlayArrow,
  Stop,
  SkipNext,
  SkipPrevious,
} from '@mui/icons-material';
import YouTube from 'react-youtube';

const VideoPlayer = () => {
  const { store } = useContext(GlobalStoreContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState('');

  let playerStatus = '';
  let id = '';
  // if (store.songPlayingIndex !== -1 && store.openedList !== null) {
  //   id = store.openedList.songs[store.songPlayingIndex].youTubeId;
  //   player.loadVideoById(id);
  // }

  useEffect(() => {
    if (player !== '') loadAndPlayCurrentSong();
  }, [store.openedList]);

  useEffect(() => {
    if (player !== '') loadAndPlayCurrentSong();
    console.log('Hello');
  }, [store.songPlayingIndex]);

  const playerOptions = {
    height: '315',
    width: '560',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const loadAndPlayCurrentSong = () => {
    id = '';
    if (store.openedList.songs.length > 0)
      id = store.openedList.songs[store.songPlayingIndex].youTubeId;
    player.loadVideoById(id);
    setIsPlaying(true);
  };

  const nextSong = () => {
    let index = store.songPlayingIndex + 1;
    index = index % store.openedList.songs.length;
    store.playSong(index);
  };

  const prevSong = () => {
    let index = store.songPlayingIndex - 1;
    if (index < 0) index = store.openedList.songs.length - 1;
    store.playSong(index);
  };

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    id = store.openedList.songs[store.songPlayingIndex].youTubeId;
    event.target.loadVideoById(id);
    setIsPlaying(true);
  };

  const onPlayerStateChange = (event) => {
    setPlayer(event.target);
    playerStatus = event.data;
    if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log('-1 Video unstarted');
    } else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log('0 Video ended');
      nextSong();
      // loadAndPlayCurrentSong();
      // setIsPlaying(true);
    } else if (playerStatus === 1) {
      // THE VIDEO IS PLAYED
      console.log('1 Video played');
    } else if (playerStatus === 2) {
      // THE VIDEO IS PAUSED
      console.log('2 Video paused');
    } else if (playerStatus === 3) {
      // THE VIDEO IS BUFFERING
      console.log('3 Video buffering');
    } else if (playerStatus === 5) {
      // THE VIDEO HAS BEEN CUED
      console.log('5 Video cued');
    }
  };

  const handleNextSong = () => {
    nextSong();
    loadAndPlayCurrentSong();
  };

  const handlePrevSong = () => {
    prevSong();
    loadAndPlayCurrentSong();
  };

  const handlePlaySong = () => {
    player.playVideo();
    setIsPlaying(true);
  };

  const handlePauseSong = () => {
    player.pauseVideo();
    setIsPlaying(false);
  };

  const handleStopSong = () => {
    player.stopVideo();
    setIsPlaying(false);
  };

  return (
    <>
      {store.openedList && (
        <Box
          sx={{
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box>
            <YouTube
              videoId={id}
              opts={playerOptions}
              onReady={onPlayerReady}
              onStateChange={onPlayerStateChange}
            />
          </Box>

          {store.openedList.songs.length > 0 && (
            <Box>
              <Typography>Playlist: {store.openedList.name}</Typography>
              <Typography>Song#: {store.songPlayingIndex + 1}</Typography>
              <Typography>
                {'Title: '}
                {store.openedList.songs.length > 0
                  ? store.openedList.songs[store.songPlayingIndex].title
                  : ''}
              </Typography>
              <Typography>
                Artist:{' '}
                {store.openedList.songs.length > 0
                  ? store.openedList.songs[store.songPlayingIndex].artist
                  : ''}
              </Typography>
            </Box>
          )}
        </Box>
      )}
      {!store.openedList && (
        <Box
          sx={{
            height: '60vh',
          }}
        ></Box>
      )}

      <Box
        sx={{ bgcolor: '#ffffff', display: 'flex', justifyContent: 'center' }}
      >
        <IconButton onClick={handlePrevSong} sx={{ mr: 1 }}>
          <SkipPrevious sx={{ fontSize: '2rem' }} />
        </IconButton>
        <IconButton onClick={handleStopSong} sx={{ mr: 1 }}>
          <Stop />
        </IconButton>
        {isPlaying && (
          <IconButton onClick={handlePauseSong} sx={{ mr: 1 }}>
            <Pause sx={{ fontSize: '2rem' }} />
          </IconButton>
        )}
        {!isPlaying && (
          <IconButton onClick={handlePlaySong} sx={{ mr: 1 }}>
            <PlayArrow sx={{ fontSize: '2rem' }} />
          </IconButton>
        )}
        <IconButton onClick={handleNextSong}>
          <SkipNext sx={{ fontSize: '2rem' }} />
        </IconButton>
      </Box>
    </>
  );
};

export default VideoPlayer;
