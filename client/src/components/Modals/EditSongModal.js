import { React, useContext, useState, useEffect } from 'react';
import { Box, Button, Modal, Grid, TextField, Typography } from '@mui/material';
import { CurrentModal, GlobalStoreContext } from '../../store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditSongModal = () => {
  const { store } = useContext(GlobalStoreContext);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [youTubeId, setYouTubeId] = useState('');

  useEffect(() => {
    if (store.selectedSong !== null) {
      setTitle(store.selectedSong.title);
      setArtist(store.selectedSong.artist);
      setYouTubeId(store.selectedSong.youTubeId);
    }
  }, [store.selectedSong]);

  const handleConfirmEditSong = () => {
    let newSong = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    store.addEditSongTransaction(newSong);
    store.setModal(CurrentModal.NONE);
  };

  const handleCancelEditSong = () => {
    store.setModal(CurrentModal.NONE);
  };

  const handleUpdateTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleUpdateArtist = (event) => {
    setArtist(event.target.value);
  };

  const handleUpdateYouTubeId = (event) => {
    setYouTubeId(event.target.value);
  };

  return (
    <Modal open={store.isEditSongModalOpen()}>
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography component='h1' variant='h4'>
              Edit Song
            </Typography>
          </Grid>
          <Typography component='h1' variant='h6'>
            Title
          </Typography>
          <TextField
            id='outlined-basic'
            variant='outlined'
            fullWidth
            value={title}
            onChange={handleUpdateTitle}
          />
          <Typography component='h1' variant='h5'>
            Artist
          </Typography>
          <TextField
            id='outlined-basic'
            variant='outlined'
            fullWidth
            value={artist}
            onChange={handleUpdateArtist}
          />
          <Typography component='h1' variant='h5'>
            YouTubeId
          </Typography>
          <TextField
            id='outlined-basic'
            variant='outlined'
            fullWidth
            value={youTubeId}
            onChange={handleUpdateYouTubeId}
          />
          <Grid item xs={12}>
            <Box
              component='span'
              m={1}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Button variant='contained' onClick={handleConfirmEditSong}>
                Confirm
              </Button>
              <Button variant='contained' onClick={handleCancelEditSong}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditSongModal;
