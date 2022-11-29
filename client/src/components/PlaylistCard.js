import { React, useContext, useEffect, useState } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  ExpandMore,
  ExpandLess,
  Add,
} from '@mui/icons-material';
import { GlobalStoreContext } from '../store';
import SongCard from './SongCard';

const PlaylistCard = (props) => {
  let { playlist } = props;
  const [selected, setSelected] = useState(false);
  const { store } = useContext(GlobalStoreContext);

  // let songCards = '';
  // if (selected) {
  //   songCards = (
  //     <Grid item xs={12}>
  //       <Box>
  //         <IconButton onClick={handleAddSong}>
  //           <Add />
  //         </IconButton>
  //       </Box>
  //       {playlist.songs.map((song, index) => (
  //         <SongCard index={index} song={song} />
  //       ))}
  //     </Grid>
  //   );
  // } else songCards = '';
  useEffect(() => {
    console.log(store.selectedList);
    if (store.selectedList === null || store.selectedList._id !== playlist._id)
      setSelected(false);
  }, [store.selectedList]);

  const handleToggleList = () => {
    if (!selected) store.selectList(playlist);
    else store.unselectList();
    setSelected(!selected);
  };

  const handleAddSong = () => {};

  return (
    <Grid container spacing={2} sx={{ bgcolor: '#ffffff', p: 2 }}>
      <Grid item xs={6}>
        <Box>
          <Typography>{playlist.name}</Typography>
          <Typography>By: {playlist.owner}</Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Box sx={{ display: 'flex' }}>
            <ThumbUp /> <Typography>{playlist.likesCount}</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <ThumbDown />
            <Typography>{playlist.dislikesCount}</Typography>
          </Box>
        </Box>
      </Grid>
      {selected && (
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={handleAddSong}>
              <Add />
            </IconButton>
          </Box>
          {playlist.songs.map((song, index) => (
            <SongCard index={index} song={song} />
          ))}
        </Grid>
      )}
      <Grid item xs={6}>
        <Typography>Published: {playlist.publishDate}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Likes: {playlist.listensCount}</Typography>
          <IconButton onClick={handleToggleList}>
            {selected ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PlaylistCard;
