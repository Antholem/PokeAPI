import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import useStore from '../Store';
import { Card, CardContent, Typography, Box, Grid, CardMedia, Stack } from '@mui/material';
import { grey, green, yellow, blue, brown, pink, purple, red, blueGrey } from '@mui/material/colors';
import { CatchingPokemon } from '@mui/icons-material';
import Scale from '../animations/Scale';
import Loading from '../components/Loading';
import Pokemon from '../components/Other';
import SearchBar from '../components/Textfield';
import NoItem from '../components/Placeholder';
import Sort from '../components/SortButton';
import AbilityModal from '../components/AbilitiesModal';

function Ability() {
    const { mode, renderAbility } = useStore(); // Accessing from the useStore hook
    // State variables
    const [abilityList, setAbilityList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [sortOrderAbility, setsortOrderAbility] = useState(localStorage.getItem('sortOrderAbility') || 'asc');

    useEffect(() => {
        // Fetch ability data when component mounts
        const fetchAbilityData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/ability?limit=${renderAbility}`);
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
                    if (sortOrderAbility === 'asc') {
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

    // Clear the value of searchText
    const clearSearchText = () => {
        setSearchText('');
    };

    // Get the value of searchText
    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    // Sort the Pokémon ability by ascending/descending
    const sortAbilityList = () => {
        const newsortOrderAbility = sortOrderAbility === 'asc' ? 'desc' : 'asc';
        setsortOrderAbility(newsortOrderAbility);
        localStorage.setItem('sortOrderAbility', newsortOrderAbility);

        const sortedAbilityList = [...abilityList].sort((a, b) => {
            if (newsortOrderAbility === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

        setAbilityList(sortedAbilityList);
    };

    // Filtering the Pokémon ability
    const filteredAbilityList = abilityList.filter((ability) =>
        ability.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Pokémon color
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

    // Inline styles for components
    const style = {
        pageContainer: {
            padding: '16px'
        },
        filteringContainer: {
            marginBottom: '16px'
        },
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
            <Box sx={style.pageContainer}>
                <Grid container sx={style.filteringContainer} spacing={1}>
                    <Grid item>
                        {/* Sort toggle by ascending/descending */}
                        <Sort onClick={sortAbilityList} sortOrder={sortOrderAbility} />
                    </Grid>
                    <Grid item>
                        {/* Search ability */}
                        <SearchBar value={searchText} onChange={handleSearchTextChange} searchText={searchText} onClick={clearSearchText} />
                    </Grid>
                </Grid>
                {isLoading ? (
                    // display when fetching data
                    <Loading />
                ) : (
                    filteredAbilityList.length === 0 ? (
                        // display when there is no data based on the filter
                        <NoItem text={`Ability`} />
                    ) : (
                        // Grid container for displaying Pokémon abilities
                        <Grid container direction='row' spacing={1}>
                            {filteredAbilityList.map((ability, index) => (
                                <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={4}>
                                    <Scale key={ability.id}>  {/* Scale in/out animation for card */}
                                        <Card key={ability.id}>
                                            <AbilityModal
                                                abilityName={<Pokemon.Name name={ability.name} />}
                                                abilityEffect={ability.effect}
                                                pokemonList={ability.pokemon}
                                                getColor={getColor}
                                            >
                                                <CardContent>
                                                    <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                                                        <Box>
                                                            <Typography sx={style.abilityName} variant='h6' component='div'>
                                                                <Pokemon.Name name={ability.name} />
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography sx={style.abilityEffect} variant='body2' color='text.secondary'>
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
                                                                            <CardMedia sx={style.pokemonImg} component='img' alt={pokemon.name} src={pokemon.url} />
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
