import { React, useContext, useEffect } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const RegisterScreen = () => {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.registerUser(
      formData.get('firstName'),
      formData.get('lastName'),
      formData.get('username'),
      formData.get('email'),
      formData.get('password'),
      formData.get('passwordVerify')
    );
    // auth.loginUser(formData.get('email'), formData.get('password'));
  };

  useEffect(() => {
    store.setScreen('REGISTER');
  }, []);

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Sign up</Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='passwordVerify'
                label='Password Verify'
                type='password'
                id='passwordVerify'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login/' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterScreen;
