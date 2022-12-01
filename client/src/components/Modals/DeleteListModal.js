import { React, useContext } from 'react';
import { Box, Button, Modal, Grid, Typography } from '@mui/material';
import { CurrentModal, GlobalStoreContext } from '../../store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeleteListModal = () => {
  const { store } = useContext(GlobalStoreContext);
  let name = '';
  if (store.isDeleteListModalOpen()) name = store.selectedList.name;
  const handleConfirmDeleteList = () => {
    store.deleteList(store.selectedList._id);
    store.setModal(CurrentModal.NONE);
  };

  const handleCancelDeleteList = () => {
    store.setModal(CurrentModal.NONE);
  };

  return (
    <Modal open={store.isDeleteListModalOpen()}>
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography component='h1' variant='h4'>
              Delete the playlist, {name}?
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
              <Button variant='contained' onClick={handleConfirmDeleteList}>
                Confirm
              </Button>
              <Button variant='contained' onClick={handleCancelDeleteList}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DeleteListModal;
