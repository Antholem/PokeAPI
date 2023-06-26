import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../Store';
import { Box, Button, Card, CardContent, CardMedia, CssBaseline, Grid, IconButton, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import Logo from '../images/Pokemon_Icon_PokeAPI.svg';
import { blue, lightBlue, pink, red } from '@mui/material/colors';
import { CatchingPokemon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();
    const { mode, themeColor } = useStore();
    const [currentImage, setCurrentImage] = useState(0);

    const darkTheme = createTheme({
        palette: {
            mode: mode === 'dark' ? 'dark' : 'light',
        },
    });

    const images = [
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png',
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/7.png',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [images.length]);

    const socialIcons = [
        { name: 'fb', icon: <Facebook sx={{ fontSize: { xs: '0.8em', md: '1.5em' } }} />, color: mode === 'dark' ? blue[400] : blue[900] },
        { name: 'ig', icon: <Instagram sx={{ fontSize: { xs: '0.8em', md: '1.5em' } }} />, color: mode === 'dark' ? pink[300] : pink[600] },
        { name: 'tw', icon: <Twitter sx={{ fontSize: { xs: '0.8em', md: '1.5em' } }} />, color: mode === 'dark' ? lightBlue[300] : lightBlue[600] },
        { name: 'yt', icon: <YouTube sx={{ fontSize: { xs: '0.8em', md: '1.5em' } }} />, color: mode === 'dark' ? red[400] : red[700] }
    ];

    return (
        <Fragment>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Grid container sx={{ height: '100vh', px: { xs: 1, md: 4, lg: 8 }, zIndex: 1, }} justifyContent='center' alignItems='center'>
                    <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                        <Stack sx={{ alignItems: { xs: 'center', md: 'flex-start' } }} direction='column' spacing={{xs: 2, md: 4}} justifyContent='center'>
                            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                <Stack sx={{ alignItems: { xs: 'center', md: 'flex-start' } }} direction='column' spacing={2}>
                                    <Box>
                                        <CardMedia
                                            sx={{ width: {xs: '40%', md: '70%'}, mx: { xs: 'auto', md: 0 } }}
                                            component='img'
                                            image={Logo}
                                            alt='Pikachu'
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color='text.secondary'>
                                            Greetings, Pokémon Trainers! Welcome to our comprehensive platform designed for Pokémon Community. Delve into the vast world of Pokémon as you explore an extensive Pokédex and much more.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                            <Box>
                                <Button variant="contained" onClick={() => navigate('/pokedex')}>
                                    Get Started
                                </Button>
                            </Box>
                            <Box>
                                <Stack
                                    sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
                                    direction='row'
                                    spacing={3}
                                    alignItems='center'
                                >
                                    {socialIcons.map((icon) => (
                                        <Box key={icon.name}>
                                            <IconButton sx={{ color: icon.color, m: 0, p: 0 }}>
                                                {icon.icon}
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                            <Box sx={{ height: '100%' }}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2 }}
                                    unmountOnExit // Add this prop
                                >
                                    <motion.div
                                        key={currentImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 2 }}
                                    >
                                        <CardMedia
                                            sx={{ width: '60%', mx: 'auto', my: 'auto' }}
                                            component='img'
                                            image={images[currentImage]}
                                            alt='Pikachu'
                                            transition={{ duration: 2 }} // Add this prop
                                        />
                                    </motion.div>
                                </motion.div>
                            </Box>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: -1,
                    }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    >
                        <CatchingPokemon
                            sx={{
                                color: mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                                fontSize: { xs: '20em', md: '35em' },
                            }}
                        />
                    </motion.div>
                </Box>
            </ThemeProvider>
        </Fragment>
    );
};

export default Home;
