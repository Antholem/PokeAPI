import React, { useEffect, useState, Fragment } from 'react';
import useStore from '../Store';
import axios from 'axios';

import Pokemon from '../components/Other';
import Loading from '../components/Loading';
import Scale from '../animations/Scale';
import NoItem from '../components/Placeholder';
import SearchBar from '../components/Textfield';
import Sort from '../components/SortButton';
import SelectItem from '../components/SelectItem';
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';

function Moves() {
    const { mode } = useStore();
    const [moveList, setMoveList] = useState([]);

    useEffect(() => {
        const fetchMoveData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/move?limit=100');
                const data = response.data.results;

                const formattedMoveList = await Promise.all(
                    data.map(async (move) => {
                        const moveDataResponse = await axios.get(move.url);
                        const moveData = moveDataResponse.data;

                        return {
                            name: moveData.name,
                            type: moveData.type.name,
                            accuracy: moveData.accuracy,
                            pp: moveData.pp,
                            power: moveData.power,
                            damageClass: moveData.damage_class.name,
                            effect: moveData.effect_entries[0].short_effect,
                            ailment: moveData.meta.ailment.name,
                            category: moveData.meta.category.name,
                            target: moveData.target.name,
                            id: moveData.id,
                        };
                    })
                );
                setMoveList(formattedMoveList);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMoveData();
    }, []);

    return (
        <Fragment>
            <Box sx={{ padding: '16px' }}>
                <Grid container sx={{ marginBottom: '16px' }} spacing={1}>
                    <Grid item>
                        <Sort />
                    </Grid>
                    <Grid item>
                        <SearchBar />
                    </Grid>
                </Grid>
                <Grid container direction="row" spacing={1}>
                    {moveList.map((move, index) => (
                        <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={4}>
                            <Card>
                                <CardMedia>
                                    <CardActionArea>
                                        <CardContent>
                                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" spacing={1}>
                                                <Typography variant="h6" component="div">
                                                    <Pokemon.Name name={move.name} />
                                                </Typography>
                                                <Stack direction='row' justifyContent="center" alignItems="center" spacing={1}>
                                                    <Box>
                                                        <Pokemon.TypeMove
                                                            name={move.type}
                                                        />
                                                    </Box>
                                                    <Box>
                                                        <Pokemon.DamageClass
                                                            name={move.damageClass}
                                                        />
                                                    </Box>
                                                </Stack>
                                                <Stack sx={{mt: 2}} direction='row' justifyContent="space-between" alignItems="center" spacing={5}>
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            ACC: {move.accuracy ? move.accuracy : 0}%
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            PP: {move.pp}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            POW: {move.power ? move.power : 0}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </CardMedia>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Fragment>
    );
}

export default Moves;
