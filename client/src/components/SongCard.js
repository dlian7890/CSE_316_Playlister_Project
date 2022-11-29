import React, { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import { Box, IconButton, Link } from '@mui/material';

const SongCard = (props) => {
  const [draggedTo, setDraggedTo] = useState(0);
  const { song, index } = props;

  return (
    <Box
      key={index}
      id={'song-' + index + '-card'}
      sx={{ bgcolor: '#f6f6f6', mb: 2, p: 2 }}
    >
      {index + 1}.{' '}
      <Link
        underline='hover'
        id={'song-' + index + '-link'}
        className='song-link'
        href={'https://www.youtube.com/watch?v=' + song.youTubeId}
      >
        {song.title} by {song.artist}
      </Link>
      <IconButton></IconButton>
    </Box>
  );
};

export default SongCard;
