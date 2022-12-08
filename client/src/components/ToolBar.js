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
      <Toolbar sx={{ height: '6vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={1.5} sx={{ fontSize: '1rem' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <IconButton
                disabled={auth.user === null}
                onClick={handleGoHome}
                sx={
                  store.currentScreen === 'HOME'
                    ? { color: 'rgb(32, 142, 252)' }
                    : ''
                }
              >
                <Home sx={{ fontSize: '2rem' }} />
              </IconButton>
              <IconButton
                onClick={handleGoAllPlaylists}
                sx={
                  store.currentScreen === 'ALLPLAYLISTS'
                    ? { color: 'rgb(32, 142, 252)' }
                    : ''
                }
              >
                <Group sx={{ fontSize: '2rem' }} />
              </IconButton>
              <IconButton
                sx={
                  store.currentScreen === 'USERS'
                    ? { mr: 2, color: 'rgb(32, 142, 252)' }
                    : { mr: 2 }
                }
                onClick={handleGoUsers}
              >
                <Person sx={{ fontSize: '2rem' }} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
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
          <Grid
            item
            xs={12}
            sm={1.5}
            sx={{ display: 'flex', justifyContent: 'right' }}
          >
            <IconButton onClick={handleSortMenuOpen} sx={{ mr: 2 }}>
              <Sort sx={{ fontSize: '2rem' }} />
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
