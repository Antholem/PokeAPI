import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Grid, CardMedia, Stack } from '@mui/material';
import { grey, green, yellow, blue, brown, pink, purple, red, blueGrey } from '@mui/material/colors';
import { CatchingPokemon } from '@mui/icons-material';

import useStore from '../Store';
import Scale from '../animations/Scale';
import Loading from '../components/Loading';
import Pokemon from '../components/Other';
import SearchBar from '../components/Textfield';
import NoItem from '../components/Placeholder';
import Sort from '../components/SortButton';
import AbilityModal from '../components/AbilitiesModal';

function Ability() {
    const { mode } = useStore();
    const [abilityList, setAbilityList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');

    useEffect(() => {
        // Fetch ability data when component mounts
        const fetchAbilityData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/ability?limit=50');
                const data = response.data.results;

                const formattedAbilityList = await Promise.all(
                    data.map(async (ability) => {
                        const res = await axios.get(ability.url);
                        const abilityData = res.data;

                        const pokemonList = await Promise.all(
                            abilityData.pokemon.map(async (pokemonEntry) => {
                                const pokemonData = await axios.get(pokemonEntry.pokemon.url);
                                const pokemonSpeciesData = await axios.get(pokemonData.data.species.url);
                                const pokemonSpecies = pokemonSpeciesData.data;

                                return {
                                    name: pokemonData.data.name,
                                    url: pokemonData.data.sprites.front_default,
                                    pokeId: pokemonData.data.id,
                                    color: pokemonSpecies.color.name,
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

                const sortedAbilityList = formattedAbilityList.sort((a, b) => {
                    if (sortOrder === 'asc') {
                        return a.name.localeCompare(b.name);
                    } else {
                        return b.name.localeCompare(a.name);
                    }
                });

                setAbilityList(sortedAbilityList);
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

    const sortAbilityList = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        localStorage.setItem('sortOrder', newSortOrder);

        const sortedAbilityList = [...abilityList].sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

        setAbilityList(sortedAbilityList);
    };

    const filteredAbilityList = abilityList.filter((ability) =>
        ability.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const getColor = (color) => {
        const pokemonColorImage = {
            black: mode === 'dark' ? grey[900] : grey[800],
            blue: mode === 'dark' ? blue[900] : blue[200],
            brown: mode === 'dark' ? brown[900] : brown[200],
            gray: mode === 'dark' ? blueGrey[900] : blueGrey[200],
            green: mode === 'dark' ? green[900] : green[200],
            pink: mode === 'dark' ? pink[400] : pink[100],
            purple: mode === 'dark' ? purple[900] : purple[200],
            red: mode === 'dark' ? red[900] : red[200],
            white: mode === 'dark' ? grey[300] : grey[50],
            yellow: mode === 'dark' ? yellow[800] : yellow[200],
        };

        return {
            imageBackground: pokemonColorImage[color] || '',
        };
    };

    const style = {
        abilityName: {
            textAlign: 'center'
        },
        abilityEffect: {
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            textAlign: 'center'
        },
        pokemonContainer: {
            mt: 2
        },
        pokemonImg: {
            maxWidth: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mx: 'auto',
            my: 'auto',
        },
        imgPlaceholder: {
            fontSize: '2em'
        }
    }

    return (
        <Fragment>
            <Box sx={{ padding: '16px' }}>
                <Grid container sx={{ marginBottom: '16px' }} spacing={1}>
                    <Grid item>
                        <Sort onClick={sortAbilityList} sortOrder={sortOrder} />
                    </Grid>
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
                                    <Scale key={ability.id}>
                                        <Card key={ability.id} variant="outlined">
                                            <AbilityModal
                                                abilityName={<Pokemon.Name name={ability.name} />}
                                                abilityEffect={ability.effect}
                                                pokemonList={ability.pokemon}
                                                getColor={getColor}
                                            >
                                                <CardContent>
                                                    <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                                                        <Box>
                                                            <Typography sx={style.abilityName} variant="h6" component="div">
                                                                <Pokemon.Name name={ability.name} />
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography sx={style.abilityEffect} variant="body2" color="text.secondary">
                                                                {ability.effect}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                    <Grid container sx={style.pokemonContainer} direction='row' justifyContent='center' alignItems='center' spacing={1}>
                                                        {ability.pokemon.map((pokemon, pokemonIndex) => (
                                                            <Fragment key={pokemonIndex}>
                                                                {pokemonIndex < 3 && (
                                                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                                        {pokemon.url ? (
                                                                            <CardMedia sx={style.pokemonImg} component="img" alt={pokemon.name} src={pokemon.url} />
                                                                        ) : (
                                                                            <CatchingPokemon sx={style.imgPlaceholder} />
                                                                        )}
                                                                    </Grid>
                                                                )}
                                                            </Fragment>
                                                        ))}
                                                    </Grid>
                                                </CardContent>
                                            </AbilityModal>
                                        </Card>
                                    </Scale>
                                </Grid>
                            ))}
                        </Grid>
                    )
                )}
            </Box>
        </Fragment>
    );
}

export default Ability;
