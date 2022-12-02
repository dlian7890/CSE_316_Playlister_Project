import { React, useContext, useState } from 'react';
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

  let player = '';
  let playerStatus = '';
  let playlist = ['mqmxkGjow1A', '8RbXIMZmVv8', '8UbNbor3OqQ'];
  let currentSong = 0;

  const playerOptions = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const loadAndPlayCurrentSong = () => {
    let song = playlist[currentSong];
    player.loadVideoById(song);
    player.playVideo();
    setIsPlaying(true);
  };

  const nextSong = () => {
    currentSong++;
    currentSong = currentSong % playlist.length;
  };

  const prevSong = () => {
    currentSong++;
    if (currentSong < 0) currentSong = playlist.length - 1;
  };

  const onPlayerReady = (event) => {
    player = event.target;
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    player = event.target;
    playerStatus = event.data;
    if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log('-1 Video unstarted');
    } else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log('0 Video ended');
      nextSong();
      loadAndPlayCurrentSong(player);
      setIsPlaying(true);
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
    loadAndPlayCurrentSong(player);
  };

  const handlePrevSong = () => {
    prevSong();
    loadAndPlayCurrentSong(player);
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
  };
  return (
    <>
      <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
      />
      <Typography>{'Playlist: '}</Typography>
      <Typography>{'Song#: '}</Typography>
      <Typography>{'Title: '}</Typography>
      <Typography>{'Artist: '}</Typography>
      <Box>
        <IconButton onClick={handlePrevSong}>
          <SkipPrevious />
        </IconButton>
        <IconButton onClick={handleStopSong}>
          <Stop />
        </IconButton>
        {!isPlaying && (
          <IconButton onClick={handlePauseSong}>
            <Pause />
          </IconButton>
        )}
        {isPlaying && (
          <IconButton onClick={handlePlaySong}>
            <PlayArrow />
          </IconButton>
        )}
        <IconButton onClick={handleNextSong}>
          <SkipNext />
        </IconButton>
      </Box>
    </>
  );
};

export default VideoPlayer;
