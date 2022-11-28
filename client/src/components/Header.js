import { React, useState, useContext } from 'react';
import AuthContext from '../auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import './Header.css';

const Header = () => {
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate('/login');
  };

  const handleRegister = () => {
    handleMenuClose();
    navigate('/register');
  };

  const handleLogout = () => {
    handleMenuClose();
    auth.logoutUser();
  };

  const handleGoToHome = () => {
    // store.clearAllTransactions();
  };

  const loggedOutMenu = (
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
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogin}>Login</MenuItem>
      <MenuItem onClick={handleRegister}>Create New Account</MenuItem>
    </Menu>
  );

  const loggedInMenu = (
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
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  let menu = auth.loggedIn ? loggedInMenu : loggedOutMenu;
  let className = false ? 'header hidden' : 'header';

  return (
    <Box className={className} sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            {/* <img class='logo-image' src={LogoImage} /> */}
            <Typography variant='h4'>Playlister</Typography>
          </Box>
          <IconButton onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {menu}
    </Box>
  );
};

export default Header;
