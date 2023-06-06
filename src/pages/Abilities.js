import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

import Loading from '../components/Loading';
import Pokemon from '../components/Other';

function Pokedex() {
    const [abilityList, setAbilityList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAbilityData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/ability?limit=233');
                const data = response.data.results;

                const formattedAbilityList = await Promise.all(
                    data.map(async (ability) => {
                        const res = await axios.get(ability.url);
                        const abilityData = res.data;

                        const formattedAbilityData = {
                            id: abilityData.id,
                            name: abilityData.name,
                            effect: abilityData.effect_entries.find((entry) => entry.language.name === 'en').short_effect,
                        };
                        return formattedAbilityData;
                    })
                );

                setAbilityList(formattedAbilityList);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAbilityData();
    }, []);

    return (
        <Fragment>
            <Box sx={{ padding: '16px' }}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Grid container spacing={1}>
                        {abilityList.map((ability, index) => (
                            <Grid item key={index} xs={12} sm={12} md={4} lg={4} xl={4}>
                                <Card key={ability.id} variant="outlined">
                                    <CardContent sx={{ textAlign: 'left' }}>
                                        <Typography variant="h6" component="div">
                                            <Pokemon.Name name={ability.name} />
                                        </Typography>
                                        <Typography
                                            sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 1,
                                            }}
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {ability.effect}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Fragment>
    );
}

export default Pokedex;
