import { React, useContext } from 'react';
import { Box, Button, Modal, Grid, Typography } from '@mui/material';
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

const DeleteSongModal = () => {
  const { store } = useContext(GlobalStoreContext);

  const handleConfirmDeleteSong = () => {
    store.addDeleteSongTransaction();
    store.setModal(CurrentModal.NONE);
  };

  const handleCancelDeleteSong = () => {
    store.setModal(CurrentModal.NONE);
  };

  let songTitle = '';
  if (store.isDeleteSongModalOpen()) {
    songTitle = store.selectedSong.title;
  }

  return (
    <Modal open={store.isDeleteSongModalOpen()}>
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography component='h1' variant='h4'>
              Remove {songTitle}?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              component='span'
              m={1}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Button variant='contained' onClick={handleConfirmDeleteSong}>
                Confirm
              </Button>
              <Button variant='contained' onClick={handleCancelDeleteSong}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DeleteSongModal;
