import { React, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext, CurrentScreen } from '../store';
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Sort, Home, Group, Person } from '@mui/icons-material';

const ToolBar = () => {
  const { store } = useContext(GlobalStoreContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleGoHome = () => {
    navigate('/');
    store.setScreen(CurrentScreen.HOME);
  };

  const handleGoAllPlaylists = () => {
    navigate('/all-lists');
    store.setScreen(CurrentScreen.ALLPLAYLISTS);
  };

  const handleGoUsers = () => {
    navigate('/users-lists');
    store.setScreen(CurrentScreen.USERS);
  };

  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSort = (type) => {
    handleSortMenuClose();
  };
  return (
    <>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} sx={{ fontSize: '35px' }}>
            <IconButton onClick={handleGoHome}>
              <Home />
            </IconButton>
            <IconButton onClick={handleGoAllPlaylists}>
              <Group />
            </IconButton>
            <IconButton sx={{ mr: 2 }} onClick={handleGoUsers}>
              <Person />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id='outlined-basic'
              label='Search'
              variant='outlined'
              size='small'
              sx={{ bgcolor: '#ffffff' }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <IconButton onClick={handleSortMenuOpen}>
              <Sort sx={{ fontSize: '30px' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleSortMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleSort('Name');
          }}
        >
          {'Name (A - Z)'}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSort('DATE');
          }}
        >
          Date
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSort('LISTENS');
          }}
        >
          Listens
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSort('LIKES');
          }}
        >
          Likes
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSort('DISLIKES');
          }}
        >
          Dislikes
        </MenuItem>
      </Menu>
    </>
  );
};

export default ToolBar;
