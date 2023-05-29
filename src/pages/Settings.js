import React, { Fragment } from 'react';
import useStore from '../Store';
import { Box, Grid, Stack, Switch, Typography } from '@mui/material';

function Settings() {
    const { mode, toggleColorMode, shiny, toggleShiny } = useStore();

    const handleModeToggle = () => {
        toggleColorMode();
    };

    const handleShinyToggle = () => {
        toggleShiny();
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
                                    reduce the glaring white light that may be distracting in the evenings
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} container justifyContent="flex-end">
                        <Switch checked={mode === 'dark'} onChange={handleModeToggle} />
                    </Grid>
                </Grid>
                <Grid sx={{ py: 1 }} container direction="row" justifyContent="space-between" alignItems="center">
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
                        <Switch checked={shiny} onChange={handleShinyToggle} />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}

export default Settings;
