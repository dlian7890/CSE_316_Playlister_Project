import { React, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext, CurrentScreen } from '../store';
import AuthContext from '../auth';
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
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleGoHome = () => {
    navigate('/home');
    // store.setScreen(CurrentScreen.HOME);
  };

  const handleGoAllPlaylists = () => {
    navigate('/all-lists');
    // store.setScreen(CurrentScreen.ALLPLAYLISTS);
  };

  const handleGoUsers = () => {
    navigate('/users-lists');
    // store.setScreen(CurrentScreen.USERS);
  };

  const handleUpdateSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.code === 'Enter') {
      store.search(searchText);
    }
  };

  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSort = (type) => {
    store.setSortBy(type);
    handleSortMenuClose();
  };
  return (
    <>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} sx={{ fontSize: '35px' }}>
            <IconButton disabled={auth.user === null} onClick={handleGoHome}>
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
              variant='outlined'
              size='small'
              value={searchText}
              onChange={handleUpdateSearchText}
              onKeyPress={handleKeyPress}
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
      {store.currentScreen !== 'HOME' && (
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
              handleSort('NAME');
            }}
          >
            {'Name (A - Z)'}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSort('PUBLISH_DATE');
            }}
          >
            Publish Date (Newest)
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSort('LISTENS');
            }}
          >
            Listens (High - Low)
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSort('LIKES');
            }}
          >
            Likes (High - Low)
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSort('DISLIKES');
            }}
          >
            Dislikes (High - Low)
          </MenuItem>
        </Menu>
      )}
      {store.currentScreen === 'HOME' && (
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
              handleSort('NAME');
            }}
          >
            {'Name (A - Z)'}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSort('CREATION_DATE');
            }}
          >
            {'Creation Date (Old-New)'}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSort('EDIT_DATE');
            }}
          >
            {'Last Edit Date (New-Old)'}
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default ToolBar;
