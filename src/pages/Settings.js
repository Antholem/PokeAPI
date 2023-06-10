import React, { Fragment } from 'react';
import useStore from '../Store';
import { Box, Grid, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

function Settings() {
    // Accessing from the useStore hook
    const { mode, toggleColorMode, shiny, toggleShiny, themeColor, setThemeColor, sprites, setSprites, renderPokemon, setRenderPokemon, renderMove, setRenderMove, renderAbility, setRenderAbility, renderItem, setRenderItem } = useStore();

    // Update dark mode
    const handleModeToggle = () => {
        toggleColorMode();
    };

    // Update Pokémon sprites
    const spritesHandler = (e) => {
        setSprites(e.target.value);
    };

    // Update shiny sprites
    const handleShinyToggle = () => {
        toggleShiny();
    };

    // Update Pokémon web application theme color
    const themeHandler = (e) => {
        setThemeColor(e.target.value);
    };

    // Update number of rendered Pokémon
    const renderPokemonHandler = (e) => {
        setRenderPokemon(e.target.value);
    };

    // Update number of rendered Pokémon move
    const renderMoveHandler = (e) => {
        setRenderMove(e.target.value);
    };

    // Update number of rendered Pokémon ability
    const renderAbilityHandler = (e) => {
        setRenderAbility(e.target.value);
    };

    // Update number of rendered Pokémon item
    const renderItemHandler = (e) => {
        setRenderItem(e.target.value);
    };

    // Array containing theme color
    const palette = [
        { value: 'cherry', name: 'Cherry' },
        { value: 'rose', name: 'Rose' },
        { value: 'lavender', name: 'Lavender' },
        { value: 'navy', name: 'Navy' },
        { value: 'teal', name: 'Teal' },
        { value: 'emerald', name: 'Emerald' },
        { value: 'amber', name: 'Amber' },
        { value: 'apricot', name: 'Apricot' }
    ];

    // Array containing Pokémon sprites
    const pokemonSprites = [
        { value: 'default', name: 'Default' },
        { value: 'home', name: 'Home' },
        { value: 'official-artwork', name: 'Official' },
    ];

    // Array containing Pokémon render number
    const pokemonRender = [
        { value: 151, name: '151 (Kanto)' },
        { value: 251, name: '251 (Johto)' },
        { value: 386, name: '386 (Hoenn)' },
        { value: 493, name: '493 (Sinnoh)' },
        { value: 649, name: '649 (Unova)' },
        { value: 721, name: '721 (Kalos)' },
        { value: 809, name: '809 (Alola)' },
        { value: 898, name: '898 (Galar)' },
        { value: 1008, name: '1008 (Paldea)' },
        { value: 1281, name: '1281 (All)' },
    ];

    // Array containing Pokémon move render number
    const moveRender = [
        { value: 100, name: '100' },
        { value: 200, name: '200' },
        { value: 300, name: '300' },
        { value: 400, name: '400' },
        { value: 500, name: '500' },
        { value: 600, name: '600' },
        { value: 700, name: '700' },
        { value: 800, name: '800' },
        { value: 900, name: '900' },
    ];

    // Array containing Pokémon ability render number
    const abilityRender = [
        { value: 10, name: '10' },
        { value: 20, name: '20' },
        { value: 30, name: '30' },
        { value: 40, name: '40' },
        { value: 50, name: '50' },
        { value: 60, name: '60' },
        { value: 70, name: '70' },
        { value: 80, name: '80' },
        { value: 90, name: '90' },
        { value: 100, name: '100' },
    ];

    // Array containing Pokémon item render number
    const itemRender = [
        { value: 100, name: '100' },
        { value: 200, name: '200' },
        { value: 300, name: '300' },
        { value: 400, name: '400' },
        { value: 500, name: '500' },
        { value: 600, name: '600' },
        { value: 700, name: '700' },
        { value: 800, name: '800' },
        { value: 900, name: '900' },
        { value: 1000, name: '1000' },
    ];

    const renderDatas = [
        { name: 'Pokémon', render: renderPokemon, handler: renderPokemonHandler, data: pokemonRender },
        { name: 'Moves', render: renderMove, handler: renderMoveHandler, data: moveRender },
        { name: 'Abilities', render: renderAbility, handler: renderAbilityHandler, data: abilityRender },
        { name: 'Items', render: renderItem, handler: renderItemHandler, data: itemRender },
    ]

    // Inline styles for components
    const style = {
        componentPadding: {
            py: 1
        },
        squareIcon: {
            fontSize: '1.4em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 20
        },
        renderTextfield: {
            minWidth: '140px'
        },
        menuItemText: {
            fontSize: '14px'
        },
        spritesTextfield: {
            minWidth: '100px'
        }
    }

    return (
        <Fragment>
            <Box>
                <Grid sx={style.componentPadding} container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                        <Stack direction='column'>
                            <Box>
                                <Typography variant='body1'>Dark Mode</Typography>
                            </Box>
                            <Box>
                                <Typography variant='caption' color='text.secondary'>
                                    reduce the glaring white light that may be distracting in the
                                    evenings
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} container justifyContent='flex-end'>
                        <Switch checked={mode === 'dark'} onChange={handleModeToggle} color={themeColor} />
                    </Grid>
                </Grid>
                <Grid sx={style.componentPadding} container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                        <Stack direction='column'>
                            <Box>
                                <Typography variant='body1'>Theme</Typography>
                            </Box>
                            <Box>
                                <Typography variant='caption' color='text.secondary'>
                                    specifies the color of the components
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} container justifyContent='flex-end'>
                        <TextField value={themeColor} onChange={themeHandler} select color={themeColor} >
                            {palette.map((theme) => (
                                <MenuItem key={theme.value} value={theme.value}>
                                    <SquareRoundedIcon color={theme.value} sx={style.squareIcon}/>
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                {renderDatas.map((render) => (
                    <Grid sx={style.componentPadding} container direction='row' justifyContent='space-between' alignItems='center'>
                        <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                            <Stack direction='column'>
                                <Box>
                                    <Typography variant='body1'>Render {render.name}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant='caption' color='text.secondary'>
                                        number of {render.name}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} container justifyContent='flex-end'>
                            <TextField sx={style.renderTextfield} value={render.render} onChange={render.handler} select color={themeColor}>
                                {render.data.map((data) => (
                                    <MenuItem key={data.value} value={data.value}>
                                        <Typography sx={style.menuItemText} variant='body2'>
                                            {data.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                ))}
                <Grid sx={style.componentPadding} container direction='row' justifyContent='space-between' alignItems='center'>
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                        <Stack direction='column'>
                            <Box>
                                <Typography variant='body1'>Sprites</Typography>
                            </Box>
                            <Box>
                                <Typography variant='caption' color='text.secondary'>
                                    2D image of a Pokemon
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} container justifyContent='flex-end'>
                        <TextField sx={style.spritesTextfield} value={sprites} onChange={spritesHandler} select color={themeColor}>
                            {pokemonSprites.map((spritesOption) => (
                                <MenuItem key={spritesOption.value} value={spritesOption.value}>
                                    <Typography sx={style.menuItemText} variant='body2'>
                                        {spritesOption.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid sx={style.componentPadding} container direction='row' justifyContent='space-between' alignItems='center' >
                    <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                        <Stack direction='column'>
                            <Box>
                                <Typography variant='body1'>Shiny Sprites</Typography>
                            </Box>
                            <Box>
                                <Typography variant='caption' color='text.secondary'>
                                    differently colored than other Pokémon of their species
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} container justifyContent='flex-end'>
                        <Switch checked={shiny} onChange={handleShinyToggle} color={themeColor} />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}

export default Settings;
