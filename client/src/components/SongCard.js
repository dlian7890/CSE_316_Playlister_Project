import React, { useContext, useState } from 'react';
import { CurrentModal, GlobalStoreContext } from '../store';
import { Box, IconButton, Link } from '@mui/material';
import { Clear } from '@mui/icons-material';

const SongCard = (props) => {
  const { store } = useContext(GlobalStoreContext);
  const [draggedTo, setDraggedTo] = useState(0);
  const { song, index } = props;

  const handleDragStart = (event) => {
    event.dataTransfer.setData('song', index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDraggedTo(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDraggedTo(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    let targetIndex = index;
    let sourceIndex = Number(event.dataTransfer.getData('song'));
    setDraggedTo(false);
    store.addMoveSongTransaction(sourceIndex, targetIndex);
  };

  const handleDeleteSong = () => {
    store.showDeleteSongModal(index, song);
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
      }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable='true'
      onDoubleClick={handleEditSong}
    >
      <Box>
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
      <IconButton sx={{ color: 'red' }} onClick={handleDeleteSong}>
        <Clear />
      </IconButton>
    </Box>
  );
};

export default SongCard;
