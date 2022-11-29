import React, { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import { Box, IconButton } from '@mui/material';

const SongCard = (props) => {
  const [draggedTo, setDraggedTo] = useState(0);
  const { song, index } = props;

  return (
    <Box key={index} id={'song-' + index + '-card'}>
      {index + 1}.
      <a
        id={'song-' + index + '-link'}
        className='song-link'
        href={'https://www.youtube.com/watch?v=' + song.youTubeId}
      >
        {song.title} by {song.artist}
      </a>
      <IconButton></IconButton>
    </Box>
  );
};

export default SongCard;
