import { React, useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
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

  useEffect(() => {
    if (store.selectedList === null || store.selectedList._id !== playlist._id)
      setSelected(false);
    else if (store.selectedList._id === playlist._id) setSelected(true);
  }, [store.selectedList]);

  const handleToggleList = () => {
    if (!selected) store.selectList(playlist);
    else store.selectList(null);
    setSelected(!selected);
  };

  const handleAddSong = () => {
    store.addNewSong();
  };

  const handleDeletePlaylist = () => {
    store.deleteList(playlist._id);
  };

  return (
    <Grid container spacing={2} sx={{ bgcolor: '#ffffff', p: 2, m: 2 }}>
      <Grid item xs={6}>
        <Box>
          <Typography>{playlist.name}</Typography>
          <Typography>By: {playlist.ownerName}</Typography>
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
        <Button variant='contained' sx={{ mr: 2 }}>
          Undo
        </Button>
        <Button variant='contained'>Redo</Button>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button variant='contained' sx={{ mr: 2 }}>
          Publish
        </Button>
        <Button
          variant='contained'
          onClick={handleDeletePlaylist}
          sx={{ mr: 2 }}
        >
          Delete
        </Button>
        <Button variant='contained' sx={{ mr: 2 }}>
          Duplicate
        </Button>
      </Grid>
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
