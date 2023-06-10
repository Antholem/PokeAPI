import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import useStore from '../Store';
import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import Pokemon from '../components/Other';
import Loading from '../components/Loading';
import Scale from '../animations/Scale';
import NoItem from '../components/Placeholder';
import SearchBar from '../components/Textfield';
import Sort from '../components/SortButton';
import SelectItem from '../components/SelectItem';
import MoveModal from '../components/MoveModal';

function Moves() {
    // Accessing from the useStore hook
    const { renderMove } = useStore();
    // State variables
    const [moveList, setMoveList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [selectedType, setSelectedType] = useState(localStorage.getItem('selectedType') || 'Any');
    const [selectedClass, setSelectedClass] = useState(localStorage.getItem('selectedClass') || 'Any');
    const [selectedStat, setSelectedStat] = useState(localStorage.getItem('selectedStat') || 'id');
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');

    // Fetch move data from PokeAPI
    useEffect(() => {
        const fetchMoveData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/move?limit=${renderMove}`);
                const data = response.data.results;

                // Format the move data
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

                // Set the formatted move list and update loading state
                setMoveList(formattedMoveList);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMoveData();
    }, []);

    // Trigger the effect whenever selectedStat changes
    useEffect(() => {
        sortMoveList();
    }, [selectedStat]);

    // Filterting Pokémon move by damage class
    const filteredMovesByClass =
        selectedClass === 'Any' ? moveList : moveList.filter((move) => move.damageClass === selectedClass);

    // Filterting Pokémon move by Type
    const filteredMovesByType =
        selectedType === 'Any' ? filteredMovesByClass : filteredMovesByClass.filter((move) => move.type === selectedType);

    // Filterting Pokémon move by name
    const filteredMovesByName = filteredMovesByType.filter((move) =>
        move.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Sort Pokémon move list based on the value of sortOrder
    const sortMoveList = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

        const sortedList = [...filteredMovesByName].sort((a, b) => {
            if (selectedStat === 'name') {
                if (newSortOrder === 'asc') {
                    return a[selectedStat].localeCompare(b[selectedStat]);
                } else {
                    return b[selectedStat].localeCompare(a[selectedStat]);
                }
            } else {
                if (newSortOrder === 'asc') {
                    return a[selectedStat] - b[selectedStat];
                } else {
                    return b[selectedStat] - a[selectedStat];
                }
            }
        });

        setMoveList(sortedList);
        setSortOrder(newSortOrder);
        localStorage.setItem('sortOrder', newSortOrder);
    };

    // get the value of search text
    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    // Clear the search text
    const clearSearchText = () => {
        setSearchText('');
    };

    // Get and update selectedStat value
    const handleStatChange = (event) => {
        setSelectedStat(event.target.value);
        localStorage.setItem('selectedStat', event.target.value);
        sortMoveList();
    };

    // Get and update selectedClass value
    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
        localStorage.setItem('selectedClass', event.target.value);
    };

    // Get and uodate selectedType value
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        localStorage.setItem('selectedType', event.target.value);
    };

    // Array containing damage class
    const damageClass = [
        { name: 'Physical', value: 'physical' },
        { name: 'Status', value: 'status' },
        { name: 'Special', value: 'special' },
    ];

    // Array containing statistics
    const stat = [
        { name: 'ID', value: 'id' },
        { name: 'NAME', value: 'name' },
        { name: 'POW', value: 'power' },
        { name: 'PP', value: 'pp' },
        { name: 'ACC', value: 'accuracy' },
    ];

    // Array containing Pokémon type
    const pokemonType = [
        { name: 'Bug', value: 'bug' },
        { name: 'Dark', value: 'dark' },
        { name: 'Dragon', value: 'dragon' },
        { name: 'Electric', value: 'electric' },
        { name: 'Fairy', value: 'fairy' },
        { name: 'Fighting', value: 'fighting' },
        { name: 'Fire', value: 'fire' },
        { name: 'Flying', value: 'flying' },
        { name: 'Ghost', value: 'ghost' },
        { name: 'Grass', value: 'grass' },
        { name: 'Ground', value: 'ground' },
        { name: 'Ice', value: 'ice' },
        { name: 'Normal', value: 'normal' },
        { name: 'Poison', value: 'poison' },
        { name: 'Psychic', value: 'psychic' },
        { name: 'Rock', value: 'rock' },
        { name: 'Steel', value: 'steel' },
        { name: 'Water', value: 'water' },
    ];

    const style = {
        pageContainer: {
            padding: '16px'
        },
        filteringContainer: {
            marginBottom: '16px'
        },
        pokemonStatContainer: {
            mt: 2
        }
    }

    return (
        <Fragment>
            <Box sx={style.pageContainer}>
                <Grid container sx={style.filteringContainer} spacing={1}>
                    <Grid item>
                        {/* Sort toggle by ascending/descending */}
                        <Sort onClick={sortMoveList} sortOrder={sortOrder} />
                    </Grid>
                    <Grid item>
                        {/* Search move */}
                        <SearchBar value={searchText} onChange={handleSearchTextChange} searchText={searchText} onClick={clearSearchText} />
                    </Grid>
                    <Grid item>
                        {/* Select damage class */}
                        <SelectItem.SelectDamageClass value={selectedClass} onChange={handleClassChange} map={damageClass} />
                    </Grid>
                    <Grid item>
                        {/* Select type */}
                        <SelectItem.SelectType value={selectedType} onChange={handleTypeChange} map={pokemonType} />
                    </Grid>
                    <Grid item>
                        {/* Select statistics */}
                        <SelectItem.SelectStat value={selectedStat} onChange={handleStatChange} map={stat} />
                    </Grid>
                </Grid>
                {isLoading ? (
                    // display when fetching data
                    <Loading />
                ) : filteredMovesByName.length === 0 ? (
                    // display when there is no data based on the filter
                    <NoItem text={`Item`} />
                ) : (
                    // Grid container for displaying Pokémon move
                    <Grid container direction='row' spacing={1}>
                        {filteredMovesByName.map((move, index) => (
                            <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={4}>
                                <Scale key={move.id}> {/* Scale in/out animation for card */}
                                    <Card>
                                        <CardMedia>
                                            <MoveModal
                                                moveName={<Pokemon.MoveName name={move.name} />}
                                                moveId={move.id}
                                                movePower={move.power ? move.power : 0}
                                                movePp={move.pp}
                                                moveAccuracy={move.accuracy ? move.accuracy : 0}
                                                moveAilment={<Pokemon.MoveName name={move.ailment} />}
                                                moveTarget={<Pokemon.MoveName name={move.target} />}
                                                moveCategory={<Pokemon.MoveName name={move.category} />}
                                                moveEffect={move.effect}
                                                moveType={<Pokemon.TypeMove name={move.type} />}
                                                moveDamageClass={<Pokemon.DamageClass name={move.damageClass} />}
                                            >
                                                <CardContent>
                                                    <Box
                                                        display='flex'
                                                        flexDirection='column'
                                                        justifyContent='center'
                                                        alignItems='center'
                                                        spacing={1}
                                                    >
                                                        <Typography variant='h6' component='div'>
                                                            <Pokemon.MoveName name={move.name} />
                                                        </Typography>
                                                        <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                                                            <Box>
                                                                <Pokemon.TypeMove name={move.type} />
                                                            </Box>
                                                            <Box>
                                                                <Pokemon.DamageClass name={move.damageClass} />
                                                            </Box>
                                                        </Stack>
                                                        <Stack sx={style.pokemonStatContainer} direction='row' justifyContent='space-between' alignItems='center' spacing={5}>
                                                            <Box>
                                                                <Typography variant='body2' color='text.secondary'>
                                                                    ACC: {move.accuracy ? move.accuracy : 0}%
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography variant='body2' color='text.secondary'>
                                                                    PP: {move.pp}
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography variant='body2' color='text.secondary'>
                                                                    POW: {move.power ? move.power : 0}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                </CardContent>
                                            </MoveModal>
                                        </CardMedia>
                                    </Card>
                                </Scale>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Fragment>
    );
}

export default Moves;