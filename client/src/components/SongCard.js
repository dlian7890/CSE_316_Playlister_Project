import React, { useContext, useState } from 'react';
import { CurrentModal, GlobalStoreContext } from '../store';
import { Box, IconButton, Link } from '@mui/material';
import { Clear } from '@mui/icons-material';
import './SongCard.css';

const SongCard = (props) => {
  const { store } = useContext(GlobalStoreContext);
  const [draggedTo, setDraggedTo] = useState(0);
  const { song, index, playlist } = props;

  const handleDragStart = (event) => {
    event.dataTransfer.setData('song', index);
  };

  const handleDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setDraggedTo(true);
  };

  const handleDragLeave = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setDraggedTo(false);
  };

  const handleDrop = (event) => {
    event.stopPropagation();
    event.preventDefault();
    let targetIndex = index;
    let sourceIndex = Number(event.dataTransfer.getData('song'));
    setDraggedTo(false);
    store.addMoveSongTransaction(sourceIndex, targetIndex);
  };

  const handleDeleteSong = (event) => {
    event.stopPropagation();
    store.showDeleteSongModal(index, song);
  };

  const handlePlaySong = (event) => {
    event.stopPropagation();
    store.openList(store.selectedList, index);
  };

  const handleEditSong = () => {
    store.showEditSongModal(index, song);
  };

  return (
    <Box
      key={index}
      id={'song-' + index + '-card'}
      sx={{
        bgcolor: '#f6f6f6',
        mb: 2,
        p: 1,
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '2.5rem',
      }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable='true'
      onClick={handlePlaySong}
      onDoubleClick={handleEditSong}
    >
      <Box
        className={
          store.songPlayingIndex === index ? 'song-text selected' : 'song-text'
        }
      >
        {index + 1}.{' '}
        {/* <Link
          underline='hover'
          id={'song-' + index + '-link'}
          className='song-link'
          href={'https://www.youtube.com/watch?v=' + song.youTubeId}
        > */}
        {song.title} by {song.artist}
        {/* </Link> */}
      </Box>
      {!playlist.isPublished && (
        <IconButton sx={{ color: 'red' }} onClick={handleDeleteSong}>
          <Clear />
        </IconButton>
      )}
    </Box>
  );
};

export default SongCard;
