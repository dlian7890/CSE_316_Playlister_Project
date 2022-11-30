import React, { useContext, useState } from 'react';
import { CurrentModal, GlobalStoreContext } from '../store';
import { Box, IconButton, Link } from '@mui/material';
import { Clear } from '@mui/icons-material';

const SongCard = (props) => {
  const { store } = useContext(GlobalStoreContext);
  const [draggedTo, setDraggedTo] = useState(0);
  const { song, index } = props;

  const handleDeleteSong = () => {
    store.selectSong(index, song);
    store.setModal(CurrentModal.DELETE_SONG);
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
      }}
    >
      <Box>
        {index + 1}.{' '}
        <Link
          underline='hover'
          id={'song-' + index + '-link'}
          className='song-link'
          href={'https://www.youtube.com/watch?v=' + song.youTubeId}
        >
          {song.title} by {song.artist}
        </Link>
      </Box>
      <IconButton sx={{ color: 'red' }} onClick={handleDeleteSong}>
        <Clear />
      </IconButton>
    </Box>
  );
};

export default SongCard;
