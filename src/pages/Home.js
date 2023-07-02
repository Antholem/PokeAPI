import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '../Store';
import { Box, Button, CardMedia, CssBaseline, Grid, IconButton, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import { blue, grey, lightBlue, pink, red } from '@mui/material/colors';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import { CatchingPokemon } from '@mui/icons-material';
import Logo from '../images/Pokemon_Icon_PokeAPI.svg';
import Hero1 from '../images/Pokemon_Hero_1.png';
import Hero2 from '../images/Pokemon_Hero_2.png';
import Hero3 from '../images/Pokemon_Hero_3.png';
import Hero4 from '../images/Pokemon_Hero_4.png';
import Hero5 from '../images/Pokemon_Hero_5.png';
import Hero6 from '../images/Pokemon_Hero_6.png';
import Hero7 from '../images/Pokemon_Hero_7.png';
import Hero8 from '../images/Pokemon_Hero_8.png';

const Home = () => {
    const navigate = useNavigate();
    const { mode, themeColor } = useStore();
    const [currentImage, setCurrentImage] = useState(0);

    const darkTheme = createTheme({
        palette: {
            mode: mode === 'dark' ? 'dark' : 'light',
        },
    });

    const images = [Hero1, Hero2, Hero3, Hero4, Hero5, Hero6, Hero7, Hero8];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [images.length]);

    const style = {
        homeContainer: {
            height: '100vh',
            px: { xs: 1, md: 4, lg: 8 },
            py: 10,
            zIndex: 1
        },
        leftContainer: {
            order: { xs: 2, md: 1 }
        },
        leftContainerAlignments: {
            alignItems: { xs: 'center', md: 'flex-start' }
        },
        headerContainer: {
            textAlign: { xs: 'center', md: 'left' }
        },
        headerContainerAlignments: {
            alignItems: { xs: 'center', md: 'flex-start' }
        },
        logo: {
            width: '70%',
            mx: { xs: 'auto', md: 0 }
        },
        socialIconsContainer: {
            justifyContent: { xs: 'center', md: 'flex-start' }
        },
        socialIconsButton: {
            m: 0,
            p: 0
        },
        socialIcons: {
            fontSize: '1.5em'
        },
        rightContainer: {
            order: { xs: 1, md: 2 }
        },
        pokemonImageContainer: {
            height: { xs: '230px', md: '100%' }
        },
        pokemonImage: {
            width: '60%',
            mx: 'auto',
            my: 'auto'
        },
        background: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1
        },
        backgroundImage: {
            color: mode === 'dark' ? grey[900] : grey[300],
            fontSize: { xs: '20em', md: '35em' }
        }
    }

    const socialIcons = [
        { name: 'fb', icon: <Facebook sx={style.socialIcons} />, color: mode === 'dark' ? blue[400] : blue[900] },
        { name: 'ig', icon: <Instagram sx={style.socialIcons} />, color: mode === 'dark' ? pink[300] : pink[600] },
        { name: 'tw', icon: <Twitter sx={style.socialIcons} />, color: mode === 'dark' ? lightBlue[300] : lightBlue[600] },
        { name: 'yt', icon: <YouTube sx={style.socialIcons} />, color: mode === 'dark' ? red[400] : red[700] }
    ];

    return (
        <Fragment>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Grid container sx={style.homeContainer} justifyContent='center' alignItems='center'>
                    <Grid item sx={style.leftContainer} xs={12} md={6}>
                        <Stack sx={style.leftContainerAlignments} direction='column' spacing={4} justifyContent='center'>
                            <Box sx={style.headerContainer}>
                                <Stack sx={style.headerContainerAlignments} direction='column' spacing={2}>
                                    <Box>
                                        <CardMedia sx={style.logo} component='img' image={Logo} alt='PokéAPI' />
                                    </Box>
                                    <Box>
                                        <Typography variant='body2' color='text.secondary'>
                                            Greetings, Pokémon Trainers! Welcome to our comprehensive platform designed for Pokémon Community. Delve into the vast world of Pokémon as you explore an extensive Pokédex and much more.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                            <Box>
                                <Button variant='contained' onClick={() => navigate('/pokedex')}>
                                    Get Started
                                </Button>
                            </Box>
                            <Box>
                                <Stack sx={style.socialIconsContainer} direction='row' spacing={3} alignItems='center'>
                                    {socialIcons.map((icon) => (
                                        <Box key={icon.name}>
                                            <IconButton sx={[style.socialIconsButton, { color: icon.color }]}>
                                                {icon.icon}
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item sx={style.rightContainer} xs={12} md={6}>
                        <Box sx={style.pokemonImageContainer}>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }} unmountOnExit>
                                <motion.div key={currentImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
                                    <CardMedia sx={style.pokemonImage} component='img' image={images[currentImage]} alt='Starter Pokemon' transition={{ duration: 2 }} />
                                </motion.div>
                            </motion.div>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={style.background}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}>
                        <CatchingPokemon sx={style.backgroundImage} />
                    </motion.div>
                </Box>
            </ThemeProvider>
        </Fragment>
    );
};

export default Home;
