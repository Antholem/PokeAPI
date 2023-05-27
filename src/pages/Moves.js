import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Avatar, Box, Card, CardActionArea, CardContent, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material';

import BugIcon from '../images/Pokemon_Type_Icon_Bug.svg';
import DarkIcon from '../images/Pokemon_Type_Icon_Dark.svg';
import DragonIcon from '../images/Pokemon_Type_Icon_Dragon.svg';
import ElectricIcon from '../images/Pokemon_Type_Icon_Electric.svg';
import FairyIcon from '../images/Pokemon_Type_Icon_Fairy.svg';
import FightingIcon from '../images/Pokemon_Type_Icon_Fighting.svg';
import FireIcon from '../images/Pokemon_Type_Icon_Fire.svg';
import FlyingIcon from '../images/Pokemon_Type_Icon_Flying.svg';
import GhostIcon from '../images/Pokemon_Type_Icon_Ghost.svg';
import GrassIcon from '../images/Pokemon_Type_Icon_Grass.svg';
import GroundIcon from '../images/Pokemon_Type_Icon_Ground.svg';
import IceIcon from '../images/Pokemon_Type_Icon_Ice.svg';
import NormalIcon from '../images/Pokemon_Type_Icon_Normal.svg';
import PoisonIcon from '../images/Pokemon_Type_Icon_Poison.svg';
import PsychicIcon from '../images/Pokemon_Type_Icon_Psychic.svg';
import RockIcon from '../images/Pokemon_Type_Icon_Rock.svg';
import SteelIcon from '../images/Pokemon_Type_Icon_Steel.svg';
import WaterIcon from '../images/Pokemon_Type_Icon_Water.svg';

const typeIcons = {
    Bug: BugIcon,
    Dark: DarkIcon,
    Dragon: DragonIcon,
    Electric: ElectricIcon,
    Fairy: FairyIcon,
    Fighting: FightingIcon,
    Fire: FireIcon,
    Flying: FlyingIcon,
    Ghost: GhostIcon,
    Grass: GrassIcon,
    Ground: GroundIcon,
    Ice: IceIcon,
    Normal: NormalIcon,
    Poison: PoisonIcon,
    Psychic: PsychicIcon,
    Rock: RockIcon,
    Steel: SteelIcon,
    Water: WaterIcon,
};

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function Moves() {
    const [isLoading, setIsLoading] = useState(true);
    const [moves, setMoves] = useState([]);
    const [loadingProgress, setLoadingProgress] = useState(0); // Track the loading progress

    useEffect(() => {
        fetchMoves();
    }, []);

    const fetchMoves = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/move?limit=100');
            const movesData = response.data.results;
            setMoves(movesData);
            setIsLoading(false); // Set isLoading to false after fetching the moves
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoveDetails = async (move) => {
        try {
            const response = await axios.get(move.url);
            const moveData = response.data;
            const typeResponse = await axios.get(moveData.type.url);
            const typeData = typeResponse.data;
            return {
                ...move,
                power: moveData.power,
                damage_class: moveData.damage_class.name,
                accuracy: moveData.accuracy,
                pp: moveData.pp,
                type: capitalizeFirstLetter(typeData.name), // Capitalize the first letter
            };
        } catch (error) {
            console.log(error);
            return move;
        }
    };

    useEffect(() => {
        const fetchMoveDetailsForAllMoves = async () => {
            const totalMoves = moves.length;
            let loadedMoves = 0;
            const updatedMoves = await Promise.all(
                moves.map(async (move) => {
                    const moveWithDetails = await fetchMoveDetails(move);
                    loadedMoves++;
                    const progress = (loadedMoves / totalMoves) * 100; // Calculate the progress percentage
                    setLoadingProgress(progress.toFixed(2)); // Update the loading progress
                    return moveWithDetails;
                })
            );
            setMoves(updatedMoves);
        };

        fetchMoveDetailsForAllMoves();
    }, [moves]);

    const formatMoveName = (name) => {
        const words = name.split('-');
        return words.map(capitalizeFirstLetter).join(' ');
    };

    const style = {
        loadingProgress: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
        },
        loadingProgressText: {
            position: 'absolute',
            textAlign: 'center'
        },
    }

    return (
        <Fragment>
            {
                isLoading ?
                    <Box sx={style.loadingProgress}>
                        <CircularProgress size={60} />
                        <Box sx={style.loadingProgressText}>
                            <Typography variant="caption" component="div" color="text.secondary">
                                {loadingProgress.toFixed(2)}%
                            </Typography>
                        </Box>
                    </Box>
                    :
                    <Grid container spacing={2}>
                        {moves.map((move, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                                <Card sx={{ textAlign: 'center' }}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Typography variant='h6'>
                                                        {formatMoveName(move.name)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Stack justifyContent="center" direction='row' spacing={1}>
                                                        <Box>
                                                            <Chip
                                                                avatar={<Avatar alt="TypeIcon" src={typeIcons[move.type]} />}
                                                                label={move.type}
                                                                size='small'
                                                                variant='outlined'
                                                            />
                                                        </Box>

                                                    </Stack>
                                                </Grid>
                                                <Grid sx={{ mt: 2 }} item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Grid container justifyContent="space-between" spacing={1}>
                                                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                            <Typography variant='body2' color='text.secondary'>
                                                                Power
                                                            </Typography>
                                                            <Typography variant='body2' color='text.secondary'>
                                                                {
                                                                    move.power ? `${move.power}` : `0`
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                            <Typography variant='body2' color='text.secondary'>
                                                                PP
                                                            </Typography>
                                                            <Typography variant='body2' color='text.secondary'>
                                                                {
                                                                    move.pp ? `${move.pp}` : `0`
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                            <Typography variant='body2' color='text.secondary'>
                                                                Accuracy
                                                            </Typography>
                                                            <Typography variant='body2' color='text.secondary'>
                                                                {
                                                                    move.accuracy ? `${move.accuracy}%` : `0%`
                                                                }
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
            }
        </Fragment>
    );
}

export default Moves;
