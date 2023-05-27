import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Scale from '../animations/Scale';
import FadeIn from '../animations/FadeIn';
import {
  Chip,
  Stack,
  Typography,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Grid
} from '@mui/material';
import {
  CardActionArea,
  CardMedia,
  CardContent,
  Card,
  CircularProgress
} from '@mui/material';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
import { CatchingPokemon } from '@mui/icons-material';
import useStore from '../Store';

function Pokemon() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  const [selectedType1, setSelectedType1] = useState(
    localStorage.getItem('selectedType1') || 'All'
  );
  const [selectedType2, setSelectedType2] = useState(
    localStorage.getItem('selectedType2') || 'All'
  );
  const [selectedSort, setSelectedSort] = useState(
    localStorage.getItem('selectedSort') || 'idAscending'
  );
  const { mode } = useStore();

  useEffect(() => {
    const storedSearchText = localStorage.getItem('searchText');
    const storedSelectedType1 = localStorage.getItem('selectedType1');
    const storedSelectedType2 = localStorage.getItem('selectedType2');
    const storedSelectedSort = localStorage.getItem('selectedSort');

    if (storedSearchText) {
      setSearchText(storedSearchText);
    }
    if (storedSelectedType1) {
      setSelectedType1(storedSelectedType1);
    }
    if (storedSelectedType2) {
      setSelectedType2(storedSelectedType2);
    }
    if (storedSelectedSort) {
      setSelectedSort(storedSelectedSort);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchText', searchText);
    localStorage.setItem('selectedType1', selectedType1);
    localStorage.setItem('selectedType2', selectedType2);
    localStorage.setItem('selectedSort', selectedSort);
  }, [searchText, selectedType1, selectedType2, selectedSort]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=500&offset=0');
        const results = response.data.results;
        const pokemonCount = results.length; // Total number of Pokémon

        // Fetch each Pokémon and update the loading progress
        const pokemon = await Promise.all(
          results.map(async (result, index) => {
            const response = await axios.get(result.url);
            const progress = ((index + 1) / pokemonCount) * 100; // Calculate loading progress percentage
            setLoadingProgress(progress); // Update loading progress state

            // Fetch color data for each Pokémon
            const colorResponse = await axios.get(response.data.species.url);
            const color = colorResponse.data.color.name;

            return { ...response.data, color }; // Include color in the Pokémon data
          })
        );

        setPokemonData(pokemon);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonData();
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatPokemonName = (name) => {
    const words = name.split('-');
    if (words.length > 1) {
      return `${capitalizeFirstLetter(words[0])} ${capitalizeFirstLetter(words[1])}`;
    }
    return capitalizeFirstLetter(name);
  };

  const getColor = (color) => {
    switch (color) {
      case 'black':
        return 'rgba(128,128,128,1) 0%, rgba(73,73,73,1) 38%, rgba(50,50,50,0.7) 65%, rgba(0,0,0,0) 100%';
      case 'blue':
        return 'rgba(0,133,232,1) 0%, rgba(0,49,181,1) 38%, rgba(8,0,124,0.7) 65%, rgba(0,0,0,0) 100%';
      case 'brown':
        return 'rgba(198,99,0,1) 0%, rgba(136,68,0,1) 38%, rgba(89,45,0,0.7) 65%, rgba(0,0,0,0) 100%';
      case 'gray':
        return 'rgba(203,203,203,1) 0%, rgba(158,158,158,1) 38%, rgba(102,102,102,0.7) 65%, rgba(0,0,0,0) 100%';
      case 'green':
        return 'rgba(0,232,85,1) 0%, rgba(8,164,0,1) 38%, rgba(15,89,0,0.7) 65%, rgba(0,0,0,0) 100%';
      case 'pink':
        return 'rgba(255,192,203,1) 0%, rgba(221,100,122,1) 38%, rgba(144,73,85,0.7) 65%, rgba(0,0,0,0) 100%';
      case 'purple':
        return 'rgba(171,0,232,1) 0%, rgba(103,0,181,1) 38%, rgba(56,0,96,0.7) 65%, rgba(0,0,0,0) 100%';
      case 'red':
      return 'rgba(232,81,0,1) 0%, rgba(181,0,0,1) 38%, rgba(124,0,0,0.7) 65%, rgba(0,0,0,0) 100%';
      case 'white':
        return 'rgba(255,255,255,1) 0%, rgba(228,228,228,1) 38%, rgba(145,145,145,0.7) 65%, rgba(0,0,0,0) 100%';
      case 'yellow':
        return 'rgba(247,255,50,1) 0%, rgba(185,174,0,1) 38%, rgba(101,96,0,0.7) 65%, rgba(0,0,0,0) 100%';
      default:
        return 'rgba(128,128,128,1) 0%, rgba(73,73,73,1) 38%, rgba(50,50,50,0.7) 65%, rgba(0,0,0,0) 100%';
    }
  };

  const getTypeIcon = (type) => {
    const typeIcons = {
      bug: BugIcon,
      dark: DarkIcon,
      dragon: DragonIcon,
      electric: ElectricIcon,
      fairy: FairyIcon,
      fighting: FightingIcon,
      fire: FireIcon,
      flying: FlyingIcon,
      ghost: GhostIcon,
      grass: GrassIcon,
      ground: GroundIcon,
      ice: IceIcon,
      normal: NormalIcon,
      poison: PoisonIcon,
      psychic: PsychicIcon,
      rock: RockIcon,
      steel: SteelIcon,
      water: WaterIcon,
    };

    return <img src={typeIcons[type]} alt={type} />;
  };

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

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleType1Change = (event) => {
    setSelectedType1(event.target.value);
  };

  const handleType2Change = (event) => {
    setSelectedType2(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const clearSearchText = () => {
    setSearchText('');
  };

  const filterPokemon = (pokemon) => {
    const matchesType1 =
      selectedType1 === 'All' || pokemon.types.some((type) => type.type.name === selectedType1);
    const matchesType2 =
      selectedType2 === 'All' || pokemon.types.some((type) => type.type.name === selectedType2);
    const matchesSearchText = pokemon.name.includes(searchText.toLowerCase());
    return matchesType1 && matchesType2 && matchesSearchText;
  };

  let sortedPokemonData = [...pokemonData];

  switch (selectedSort) {
    case 'idAscending':
      sortedPokemonData.sort((a, b) => a.id - b.id);
      break;
    case 'idDescending':
      sortedPokemonData.sort((a, b) => b.id - a.id);
      break;
    case 'nameAscending':
      sortedPokemonData.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameDescending':
      sortedPokemonData.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      // Handle the default case here
      break;
  }

  const filteredPokemonData = sortedPokemonData.filter(filterPokemon);

  const style = {
    pokemonContainer: {
      padding: '16px'
    },
    filterContainer: {
      mb: 3,
    },
    searchFilter: {
      maxWidth: { xs: '170px', sm: '170px', md: '170px', lg: '260px', xl: '260px' }
    },
    closeIcon: {
      cursor: 'pointer'
    },
    select: {
      minWidth: '125px'
    },
    menuItemIcon: {
      width: '20px',
      height: '20px',
      color: mode === 'dark' ? grey[200] : grey[600]
    },
    menuItemText: {
      fontSize: '14px'
    },
    sort: {
      minWidth: '110px'
    },
    sortIcon: {
      fontSize: '1em',
      color: mode === 'dark' ? grey[200] : grey[600]
    },
    imgContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    cardMedia: {
      maxWidth: 150
    },
    pokemonIconPlaceholder: {
      fontSize: '8em',
      color: mode === 'dark' ? grey[200] : grey[600]
    },
    pokemonImgPlaceholder: {
      fontSize: '11.25em',
      color: mode === 'dark' ? grey[200] : grey[600],
      maxWidth: 150
    },
    pokemonName: {
      lineHeight: 1.2,
      maxHeight: '2.4em',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    pokemonTypeContainer: {
      marginTop: '8px'
    },
    pokemonTypeChip: {
      cursor: 'pointer'
    },
    noDataPlaceholder: {
      ml: 2
    },
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
    pokeballIcon: {
      width: '20px',
      height: '20px'
    }
  };

  return (
    <FadeIn>
      <Box sx={style.pokemonContainer}>
        <Grid container sx={style.filterContainer} spacing={1}>
          <Grid item>
            <TextField
              sx={style.searchFilter}
              id='outlined-basic'
              label='Search'
              variant='outlined'
              value={searchText}
              onChange={handleSearchTextChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    {searchText && (
                      <CloseIcon
                        onClick={clearSearchText}
                        sx={style.closeIcon}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <Select
              id='outlined-select-sort'
              value={selectedSort}
              onChange={handleSortChange}
              label='Sort By'
              variant='outlined'
              sx={style.sort}
            >
              <MenuItem value='idAscending'>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <ArrowUpwardIcon sx={style.sortIcon} />
                  <Typography variant='body2' sx={style.menuItemText}>
                    ID
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value='idDescending'>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <ArrowDownwardIcon sx={style.sortIcon} />
                  <Typography variant='body2' sx={style.menuItemText}>
                    ID
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value='nameAscending'>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <ArrowUpwardIcon sx={style.sortIcon} />
                  <Typography variant='body2' sx={style.menuItemText}>
                    Name
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value='nameDescending'>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <ArrowDownwardIcon sx={style.sortIcon} />
                  <Typography variant='body2' sx={style.menuItemText}>
                    Name
                  </Typography>
                </Stack>
              </MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Select
              id='outlined-select-type1'
              value={selectedType1}
              onChange={handleType1Change}
              label='Type 1'
              variant='outlined'
              sx={style.select}
            >
              <MenuItem value='All'>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <CatchingPokemon
                    sx={style.menuItemIcon}
                  />
                  <Typography variant='body2' sx={style.menuItemText}>
                    Any
                  </Typography>
                </Stack>
              </MenuItem>
              {pokemonType.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Box sx={style.menuItemIcon}>
                      {getTypeIcon(type.value)}
                    </Box>
                    <Typography variant='body2' sx={style.menuItemText}>
                      {type.name}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Select
              id='outlined-select-type2'
              value={selectedType2}
              onChange={handleType2Change}
              label='Type 2'
              variant='outlined'
              sx={style.select}
            >
              <MenuItem value='All'>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <CatchingPokemon
                    sx={style.menuItemIcon}
                  />
                  <Typography variant='body2' sx={style.menuItemText}>
                    Any
                  </Typography>
                </Stack>
              </MenuItem>
              {pokemonType.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Box sx={style.menuItemIcon}>
                      {getTypeIcon(type.value)}
                    </Box>
                    <Typography variant='body2' sx={style.menuItemText}>
                      {type.name}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
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
            <Fragment>
              {filteredPokemonData.length > 0 ? (
                <Grid container spacing={2}>
                  {filteredPokemonData.map((pokemon, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                      <Scale key={index}>
                        <Card>
                          <CardActionArea>
                            <Box key={pokemon.id} sx={[style.imgContainer, { backgroundImage: `linear-gradient(180deg, ${getColor(pokemon.color)})` }]}>
                              {
                                pokemon.sprites.front_default ?
                                  <CardMedia component='img' sx={style.cardMedia} image={pokemon.sprites.front_default} />
                                  : <CatchingPokemon sx={style.pokemonImgPlaceholder} />
                              }
                            </Box>
                            <CardContent>
                              <Stack direction='row' spacing={1} alignItems='center'>
                                <img
                                  src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'}
                                  alt='Pokeball'
                                  style={style.pokeballIcon}
                                />
                                <Typography
                                  gutterBottom
                                  variant='body2'
                                  component='div'
                                  color='text.secondary'
                                >
                                  #{pokemon.id.toString().padStart(3, '0')}
                                </Typography>
                              </Stack>
                              <Typography variant='h6' noWrap sx={style.pokemonName}>
                                {formatPokemonName(pokemon.name)}
                              </Typography>
                              <Stack direction='row' spacing={1} sx={style.pokemonTypeContainer}>
                                {pokemon.types.map((type, index) => (
                                  <Chip
                                    key={index}
                                    avatar={getTypeIcon(type.type.name)}
                                    label={capitalizeFirstLetter(type.type.name)}
                                    size='small'
                                    variant='outlined'
                                    sx={style.pokemonTypeChip}
                                  />
                                ))}
                              </Stack>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Scale>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '50vh' }}>
                  <Grid item style={{ textAlign: 'center' }}>
                    <CatchingPokemon sx={style.pokemonIconPlaceholder} />
                    <Typography variant="body1" component="div" color="text.secondary">
                      No Pokemon Found
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Fragment>
        }
      </Box>
    </FadeIn>
  );
}

export default Pokemon;
