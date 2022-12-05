import { useContext } from 'react';
import AuthContext from '../../auth';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

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

export default function ErrorModal() {
  const { auth } = useContext(AuthContext);
  const handleCloseModal = (event) => {
    auth.setErrorMessage('');
  };

  return (
    <Modal open={auth.errorMessage !== ''}>
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              component='span'
              m={1}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Alert severity='error'>{auth.errorMessage}</Alert>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              component='span'
              m={1}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Button variant='contained' onClick={handleCloseModal}>
                Close Alert
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
