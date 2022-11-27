import { React, useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Sort, Home, Group, Person } from '@mui/icons-material';

const ToolBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

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
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <Toolbar>
        <IconButton>
          <Home />
        </IconButton>
        <IconButton>
          <Group />
        </IconButton>
        <IconButton sx={{ mr: 2 }}>
          <Person />
        </IconButton>
        <Box sx={{ width: '400px', bgcolor: '#ffffff' }}>
          <TextField
            fullWidth
            id='outlined-basic'
            label='Search'
            variant='outlined'
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton onClick={handleSortMenuOpen}>
          <Sort />
        </IconButton>
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
    </Box>
  );
};

export default ToolBar;
