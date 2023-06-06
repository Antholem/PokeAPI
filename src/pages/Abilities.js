import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Grid, CardMedia, Stack } from '@mui/material';
import { CatchingPokemon } from '@mui/icons-material';

import useStore from '../Store';
import Loading from '../components/Loading';
import Pokemon from '../components/Other';
import SearchBar from '../components/Textfield';
import NoItem from '../components/Placeholder';

function Pokedex() {
    const { themeColor } = useStore();
    const [abilityList, setAbilityList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchAbilityData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/ability?limit=233');
                const data = response.data.results;

                const formattedAbilityList = await Promise.all(
                    data.map(async (ability) => {
                        const res = await axios.get(ability.url);
                        const abilityData = res.data;

                        const pokemonList = await Promise.all(
                            abilityData.pokemon.map(async (pokemonEntry) => {
                                const pokemonData = await axios.get(pokemonEntry.pokemon.url);
                                const pokemon = pokemonData.data;

                                return {
                                    name: pokemon.name,
                                    url: pokemon.sprites.front_default,
                                };
                            })
                        );

                        const formattedAbilityData = {
                            id: abilityData.id,
                            name: abilityData.name,
                            effect: abilityData.effect_entries.find((entry) => entry.language.name === 'en').short_effect,
                            pokemon: pokemonList,
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

    const clearSearchText = () => {
        setSearchText('');
    };

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredAbilityList = abilityList.filter((ability) =>
        ability.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Fragment>
            <Box sx={{ padding: '16px' }}>
                <Grid container sx={{ marginBottom: '16px' }} spacing={1}>
                    <Grid item>
                        <SearchBar value={searchText} onChange={handleSearchTextChange} searchText={searchText} onClick={clearSearchText} />
                    </Grid>
                </Grid>
                {isLoading ? (
                    <Loading />
                ) : (
                    filteredAbilityList.length === 0 ? (
                        <NoItem text={`Ability`} />
                    ) : (
                        <Grid container direction='row' spacing={1}>
                            {filteredAbilityList.map((ability, index) => (
                                <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <Card key={ability.id} variant="outlined">
                                        <CardContent>
                                            <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                                                <Box>
                                                    <Typography sx={{ textAlign: 'center' }} variant="h6" component="div">
                                                        <Pokemon.Name name={ability.name} />
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography sx={{ textAlign: 'center' }} variant="body2" color="text.secondary">
                                                        #{ability.id}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            display: '-webkit-box',
                                                            overflow: 'hidden',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 1,
                                                            textAlign: 'center'
                                                        }}
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {ability.effect}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                            <Grid container sx={{ mt: 2 }} direction='row' justifyContent='center' alignItems='center' spacing={1}>
                                                {ability.pokemon.map((pokemon, pokemonIndex) => (
                                                    <Fragment key={pokemonIndex}>
                                                        {pokemonIndex < 3 && (
                                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                                {pokemon.url ? (
                                                                    <CardMedia
                                                                        sx={{
                                                                            maxWidth: 40,
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            mx: 'auto',
                                                                            my: 'auto',
                                                                        }}
                                                                        component="img"
                                                                        alt={pokemon.name}
                                                                        src={pokemon.url}
                                                                    />
                                                                ) : (
                                                                    <CatchingPokemon sx={{ fontSize: '2em' }} />
                                                                )}
                                                            </Grid>
                                                        )}
                                                    </Fragment>
                                                ))}
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )
                )}
            </Box>
        </Fragment>
    );
}

export default Pokedex;
