import React, { Fragment } from 'react';
import useStore from '../Store';
import { Box, Grid, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

function Settings() {
    const { mode, toggleColorMode, shiny, toggleShiny, themeColor, setThemeColor, sprites, setSprites } = useStore();

    const palette = [
        { value: 'cherry', name: 'Cherry' },
        { value: 'rose', name: 'Rose' },
        { value: 'navy', name: 'Navy' },
        { value: 'teal', name: 'Teal' },
        { value: 'emerald', name: 'Emerald' },
        { value: 'amber', name: 'Amber' },
        { value: 'apricot', name: 'Apricot' }
    ];

    const pokemonSprites = [
        { value: 'default', name: 'Default' },
        { value: 'home', name: 'Home' },
        { value: 'official-artwork', name: 'Official' },
    ];

    const handleModeToggle = () => {
        toggleColorMode();
    };

    const spritesHandler = (e) => {
        setSprites(e.target.value);
    };

    const handleShinyToggle = () => {
        toggleShiny();
    };

    const themeHandler = (e) => {
        setThemeColor(e.target.value);
    };

    return (
        <Fragment>
            <Box>
                <Grid sx={{ py: 1 }} container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                        <Stack direction="column">
                            <Box>
                                <Typography variant="body1">Dark Mode</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    reduce the glaring white light that may be distracting in the
                                    evenings
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} container justifyContent="flex-end">
                        <Switch checked={mode === 'dark'} onChange={handleModeToggle} color={themeColor} />
                    </Grid>
                </Grid>
                <Grid sx={{ py: 1 }} container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                        <Stack direction="column">
                            <Box>
                                <Typography variant="body1">Theme</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    specifies the color of the components
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} container justifyContent="flex-end">
                        <TextField value={themeColor} onChange={themeHandler} select color={themeColor} >
                            {palette.map((theme) => (
                                <MenuItem key={theme.value} value={theme.value}>
                                    <SquareRoundedIcon
                                        color={theme.value}
                                        sx={{
                                            fontSize: '1.4em',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: 20
                                        }}
                                    />
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid sx={{ py: 1 }} container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                        <Stack direction="column">
                            <Box>
                                <Typography variant="body1">Sprites</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    2D image of a Pokemon
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} container justifyContent="flex-end">
                        <TextField sx={{ minWidth: '100px' }} value={sprites} onChange={spritesHandler} select color={themeColor}>
                            {pokemonSprites.map((spritesOption) => (
                                <MenuItem key={spritesOption.value} value={spritesOption.value}>
                                    <Typography variant='body2' sx={{ fontSize: '14px' }}>
                                        {spritesOption.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid sx={{ py: 1 }} container direction="row" justifyContent="space-between" alignItems="center" >
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                        <Stack direction="column">
                            <Box>
                                <Typography variant="body1">Shiny Sprites</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    differently colored than other Pokémon of their species
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} container justifyContent="flex-end">
                        <Switch checked={shiny} onChange={handleShinyToggle} color={themeColor} />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}

export default Settings;
