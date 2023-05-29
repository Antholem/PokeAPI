import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Toolbar, AppBar, Box, CssBaseline, CardMedia } from '@mui/material/';
import { Divider, Drawer, Typography, IconButton } from '@mui/material/';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import { yellow } from '@mui/material/colors';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { CatchingPokemon } from '@mui/icons-material';
import PetsIcon from '@mui/icons-material/Pets';
import Logo from './images/Pokemon_Icon_PokeAPI.svg';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useStore from './Store';

const drawerWidth = 200;

function SideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleColorMode } = useStore();
  const location = useLocation();
  const path = location.pathname;

  const handleModeToggle = () => {
    toggleColorMode();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const menu = [
    { title: 'Pokédex', path: '/', icon: <CatchingPokemon /> },
    { title: 'Team Builder', path: '/team-builder', icon: <CatchingPokemon /> },
    { title: 'Favorites', path: '/favorites', icon: <CatchingPokemon /> },
    { title: 'Comparator', path: '/comparator', icon: <CatchingPokemon /> },

    { title: 'Types', path: '/types', icon: <CatchingPokemon /> },
    { title: 'Abilities', path: '/abilities', icon: <CatchingPokemon /> },
    { title: 'Items', path: '/items', icon: <CatchingPokemon /> },
    { title: 'Moves', path: '/moves', icon: <PetsIcon /> },

    { title: 'Settings', path: '/settings', icon: <PetsIcon /> },
  ];

  const style = {
    drawerContainer: {
      display: 'flex'
    },
    drawerTemporary: {
      display: { xs: 'block', sm: 'none' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    },
    drawerPermanent: {
      display: { xs: 'none', sm: 'block' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    },
    logo: {
      width: '90px',
      mx: 'auto',
      my: 'auto',
      display: 'flex',
      mt: 2,
      mb: -6.5
    },
    appBar: {
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` }
    },
    iconButton: {
      mr: 2,
      display: { sm: 'none' }
    },
    nav: {
      width: { sm: drawerWidth },
      flexShrink: { sm: 0 }
    },
    main: {
      flexGrow: 1,
      p: 3,
      width: { sm: `calc(100% - ${drawerWidth}px)` }
    },
    pageTitle: {
      flexGrow: 1
    },
    darkModeBtn: {
      color: yellow[300]
    }
  }

  const drawer = (
    <Fragment>
      <CardMedia component='img' image={Logo} sx={style.logo} />
      <Toolbar />
      <List>
        {menu.map((item, index) => (
          <Fragment key={item.title}>
            {(index === 0) && <Divider />}
            <ListItem disablePadding component={Link} to={item.path} selected={item.path === path} button>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
            {(index === 3 || index === 7) && <Divider />}
          </Fragment>
        ))}
      </List>
    </Fragment>
  );


  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box sx={style.drawerContainer}>
          <CssBaseline />
          <AppBar position='fixed' sx={style.appBar} >
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={style.iconButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' noWrap component='div' sx={style.pageTitle}>
                {menu.map((item) =>
                  item.path === path ? item.title : null
                )}
              </Typography>
              <IconButton onClick={handleModeToggle}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box component='nav' sx={style.nav} aria-label='mailbox folders' >
            <Drawer
              container={container}
              variant='temporary'
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={style.drawerTemporary}
            >
              {drawer}
            </Drawer>
            <Drawer variant='permanent' sx={style.drawerPermanent} open>
              {drawer}
            </Drawer>
          </Box>
          <Box component='main' sx={style.main}>
            <Toolbar />
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </Fragment>
  );
}

SideBar.propTypes = {
  window: PropTypes.func,
};

export default SideBar;
