import React, { Fragment } from 'react';
import { Card, CardContent, Typography, Box, Grid, CardMedia, Stack } from '@mui/material';
import { Dialog, DialogActions, DialogContent, Button, CardActionArea, DialogTitle } from '@mui/material/';
import { grey } from '@mui/material/colors';
import { CatchingPokemon } from '@mui/icons-material';

import useStore from '../Store';
import Pokemon from '../components/Other';

function AbilityModal(props) {
    const [openModal, setOpenModal] = React.useState(false);
    const { themeColor } = useStore();

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const style = {
        effectContainer: {
            mb: 1
        },
        pokemonImg: {
            maxWidth: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mx: 'auto',
            my: 'auto'
        },
        placeholderImg: {
            fontSize: '2.77em'
        },
        cardContent: {
            textAlign: 'center'
        },
        pokemonId: {
            textAlign: 'center',
        }
    }

    return (
        <Fragment>
            <CardActionArea onClick={handleOpenModal}>
                {props.children}
            </CardActionArea>
            <Dialog
                maxWidth='sm'
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
            >
                <DialogTitle>
                    {props.abilityName}
                </DialogTitle>
                <DialogContent>
                    <Stack sx={style.effectContainer} direction='column' spacing={1}>
                        <Box>
                            <Typography variant='body2'>
                                {props.abilityEffect}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='body2'>
                                Pokémon with ability of {props.abilityName}:
                            </Typography>
                        </Box>
                    </Stack>
                    <Grid container direction='row' spacing={1}>
                        {props.pokemonList.map((pokemon) => (
                            <Grid item key={pokemon.pokeId} xs={4} sm={4} md={3} lg={2} xl={2}>
                                <Card sx={{ backgroundColor: props.getColor(pokemon.color).imageBackground }}>
                                    <CardContent sx={style.cardContent}>
                                        {pokemon.url ? (
                                            <CardMedia sx={style.pokemonImg} component="img" alt={pokemon.name} src={pokemon.url}/>
                                        ) : (
                                            <CatchingPokemon sx={style.placeholderImg} />
                                        )}
                                    </CardContent>
                                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                                        <Box>
                                            <Typography sx={[style.pokemonId, { color: pokemon.color === 'white' ? grey[900] : pokemon.color === 'black' ? grey[50] : 'none' }]} variant='caption'>
                                                <Pokemon.ID id={pokemon.pokeId} />
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color={themeColor} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default AbilityModal;