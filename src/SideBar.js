import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import useStore from './Store';
import CloseModal from './components/CloseModal';
import PropTypes from 'prop-types';
import { Toolbar, AppBar, Box, CssBaseline, CardMedia } from '@mui/material/';
import { Divider, Drawer, Typography, IconButton } from '@mui/material/';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red, pink, purple, blue, teal, green, yellow, orange, grey, indigo } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { CatchingPokemon } from '@mui/icons-material';
import PetsIcon from '@mui/icons-material/Pets';
import Logo from './images/Pokemon_Icon_PokeAPI.svg';

const drawerWidth = 200;

function SideBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false); // State variables
  const { mode, themeColor } = useStore(); // Accessing from the useStore hook

  const { window } = props; // props for Sidebar

  const location = useLocation(); // useLocation for routing
  const path = location.pathname;

  // open and close toggle of Sidebar in mobile view
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  // Define other color options based on mode and themeColor
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          cherry: {
            main: mode === 'dark' ? red[400] : red[800],
            dark: mode === 'dark' ? red[500] : red[900],
            contrastText: mode === 'dark' ? grey[900] : grey[50],
          },
          rose: {
            main: mode === 'dark' ? pink[200] : pink[600],
            dark: mode === 'dark' ? pink[300] : pink[700],
            contrastText: mode === 'dark' ? grey[900] : grey[50],
          },
          lavender: {
            main: mode === 'dark' ? purple[200] : purple[800],
            dark: mode === 'dark' ? purple[300] : purple[900],
            contrastText: mode === 'dark' ? grey[900] : grey[50],
          },
          navy: {
            main: mode === 'dark' ? blue[300] : blue[800],
            dark: mode === 'dark' ? blue[400] : blue[900],
            contrastText: mode === 'dark' ? grey[900] : grey[50],
          },
          indigo: {
            main: mode === 'dark' ? indigo[300] : indigo[800],
            dark: mode === 'dark' ? indigo[400] : indigo[900],
            contrastText: mode === 'dark' ? grey[900] : grey[50],
          },
          teal: {
            main: mode === 'dark' ? teal[200] : teal[700],
            dark: mode === 'dark' ? teal[300] : teal[800],
            contrastText: mode === 'dark' ? grey[900] : grey[50],
          },
          emerald: {
            main: mode === 'dark' ? green[400] : green[800],
            dark: mode === 'dark' ? green[500] : green[900],
            contrastText: mode === 'dark' ? grey[900] : grey[50],
          },
          amber: {
            main: mode === 'dark' ? yellow[400] : yellow[800],
            dark: mode === 'dark' ? yellow[500] : yellow[900],
            contrastText: mode === 'dark' ? grey[900] : grey[50],
          },
          apricot: {
            main: mode === 'dark' ? orange[300] : orange[800],
            dark: mode === 'dark' ? orange[400] : orange[900],
            contrastText: mode === 'dark' ? grey[900] : grey[50],
          }
        }
      }),
    [mode],
  );

// Array containing menu title, path, and icon in the Sidebar
  const menu = [
    { title: 'Pokédex', path: '/pokedex', icon: <CatchingPokemon /> },
    { title: 'Moves', path: '/moves', icon: <PetsIcon /> },
    { title: 'Abilities', path: '/abilities', icon: <LightbulbIcon /> },
    { title: 'Items', path: '/items', icon: <ShoppingBagIcon /> },
    { title: 'Settings', path: '/settings', icon: <SettingsIcon /> },
  ];

  // Inline styles for components
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
      {/* Render the logo, toolbar, and list of menu items */}
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
            {(index === 0 || index === 3) && <Divider />}
          </Fragment>
        ))}
        <CloseModal>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary='Exit' />
        </CloseModal>
      </List>
    </Fragment>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Box sx={style.drawerContainer}>
          <CssBaseline />
          {/* Render the app bar */}
          <AppBar position='fixed' sx={{ ...style.appBar, backgroundColor: mode === 'dark' ? 'none' : theme.palette[themeColor].main }}>
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
            </Toolbar>
          </AppBar>
          {/* Render the drawer */}
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
