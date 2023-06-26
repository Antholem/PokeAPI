import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../Store';
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import Logo from '../images/Pokemon_Icon_PokeAPI.svg';
import { blue, lightBlue, pink, red } from '@mui/material/colors';

const Home = () => {
    const navigate = useNavigate();
    const { mode, themeColor } = useStore();

    const img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png';

    return (
        <Fragment>
            <Grid container sx={{ height: '100vh', px: 8 }} justifyContent='center' alignItems='center'>
                <Grid item xs={12} md={6}>
                    <Stack direction='column' spacing={4} justifyContent='center' alignItems='flex-start'>
                        <Box>
                            <Typography variant="body2" color='text.secondary'>
                                Hello Trainers!
                            </Typography>
                            <Typography variant="h4">
                                PokéAPI
                            </Typography>
                            <Typography variant="body1" color='text.secondary'>
                                Explore Pokedex, items, moves, etc. and customize your personal using settings.
                            </Typography>
                        </Box>
                        <Box>
                            <Button variant="contained" onClick={() => navigate('/pokedex')}>
                                Get Started
                            </Button>
                        </Box>
                        <Box>
                            <Stack sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, }} direction='row' spacing={2} alignItems='center'>
                                <Box>
                                    <IconButton>
                                        <Facebook sx={{color: blue[900] }} />
                                    </IconButton>
                                </Box>
                                <Box>
                                    <IconButton>
                                        <Instagram sx={{ color: pink[600] }} />
                                    </IconButton>
                                </Box>
                                <Box>
                                    <IconButton>
                                        <Twitter sx={{ color: lightBlue[600] }} />
                                    </IconButton>
                                </Box>
                                <Box>
                                    <IconButton>
                                        <YouTube sx={{ color: red[700] }} />
                                    </IconButton>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction='column' justifyContent='center' alignItems='center'>
                        <img src={img} alt="Pikachu" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </Stack>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Home;
