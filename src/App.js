import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {
  Chip,
  Stack,
  Typography,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
} from '@mui/material';
import {
  CardActionArea,
  CardMedia,
  CardContent,
  Card
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import BugIcon from './images/Pokemon_Type_Icon_Bug.svg';
import DarkIcon from './images/Pokemon_Type_Icon_Dark.svg';
import DragonIcon from './images/Pokemon_Type_Icon_Dragon.svg';
import ElectricIcon from './images/Pokemon_Type_Icon_Electric.svg';
import FairyIcon from './images/Pokemon_Type_Icon_Fairy.svg';
import FightingIcon from './images/Pokemon_Type_Icon_Fighting.svg';
import FireIcon from './images/Pokemon_Type_Icon_Fire.svg';
import FlyingIcon from './images/Pokemon_Type_Icon_Flying.svg';
import GhostIcon from './images/Pokemon_Type_Icon_Ghost.svg';
import GrassIcon from './images/Pokemon_Type_Icon_Grass.svg';
import GroundIcon from './images/Pokemon_Type_Icon_Ground.svg';
import IceIcon from './images/Pokemon_Type_Icon_Ice.svg';
import NormalIcon from './images/Pokemon_Type_Icon_Normal.svg';
import PoisonIcon from './images/Pokemon_Type_Icon_Poison.svg';
import PsychicIcon from './images/Pokemon_Type_Icon_Psychic.svg';
import RockIcon from './images/Pokemon_Type_Icon_Rock.svg';
import SteelIcon from './images/Pokemon_Type_Icon_Steel.svg';
import WaterIcon from './images/Pokemon_Type_Icon_Water.svg';
import PokeballIcon from './images/Pokemon_Type_Icon_Pokeball.png';
import Placeholder from './images/Pokemon_Icon_Placeholder.png';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedType1, setSelectedType1] = useState('All');
  const [selectedType2, setSelectedType2] = useState('All');
  const [selectedSort, setSelectedSort] = useState('idAscending');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'
        );
        const results = response.data.results;
        const pokemon = await Promise.all(
          results.map(async (result) => {
            const response = await axios.get(result.url);
            return response.data;
          })
        );
        setPokemonData(pokemon);
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
  }

  const filteredPokemonData = sortedPokemonData.filter(filterPokemon);

  const style = {
    pokemonContainer: {
      padding: '16px',
    },
    filterContainer: {
      mb: 3,
    },
    searchFilter: {
      maxWidth: '200px'
    },
    closeIcon: {
      cursor: 'pointer',
    },
    select: {
      minWidth: '120px',
    },
    menuItemIcon: {
      width: '17px',
      height: '17px',
    },
    menuItemText: {
      fontSize: '14px',
    },
    sortIcon: {
      fontSize: '1em',
    },
    imgContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardMedia: {
      maxWidth: 150,
    },
    pokeballIcon: {
      width: '13px',
      height: '13px',
    },
    pokemonName: {
      lineHeight: 1.2,
      maxHeight: '2.4em',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    pokemonTypeContainer: {
      marginTop: '8px',
    },
    pokemonTypeChip: {
      cursor: 'pointer',
    },
    noDataPlaceholder: {
      ml: 2,
    },
  };

  return (
    <Fragment>
      <Box sx={style.pokemonContainer}>
        <Grid container sx={style.filterContainer} spacing={2}>
          <Grid item>
            <TextField
              sx={style.searchFilter}
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={handleSearchTextChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
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
              id="outlined-select-sort"
              value={selectedSort}
              onChange={handleSortChange}
              label="Sort By"
              variant="outlined"
              sx={style.select}
            >
              <MenuItem value='idAscending'>
                <Stack direction="row" spacing={1} alignItems="center">
                  <ArrowUpwardIcon sx={style.sortIcon} />
                  <Typography variant="body2" sx={style.menuItemText}>
                    ID
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value='idDescending'>
                <Stack direction="row" spacing={1} alignItems="center">
                  <ArrowDownwardIcon sx={style.sortIcon} />
                  <Typography variant="body2" sx={style.menuItemText}>
                    ID
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value='nameAscending'>
                <Stack direction="row" spacing={1} alignItems="center">
                  <ArrowUpwardIcon sx={style.sortIcon} />
                  <Typography variant="body2" sx={style.menuItemText}>
                    Name
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value='nameDescending'>
                <Stack direction="row" spacing={1} alignItems="center">
                  <ArrowDownwardIcon sx={style.sortIcon} />
                  <Typography variant="body2" sx={style.menuItemText}>
                    Name
                  </Typography>
                </Stack>
              </MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Select
              id="outlined-select-type1"
              value={selectedType1}
              onChange={handleType1Change}
              label="Type 1"
              variant="outlined"
              sx={style.select}
            >
              <MenuItem value='All'>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CardMedia
                    component="img"
                    sx={style.menuItemIcon}
                    image={PokeballIcon}
                  />
                  <Typography variant="body2" sx={style.menuItemText}>
                    All
                  </Typography>
                </Stack>
              </MenuItem>
              {pokemonType.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={style.menuItemIcon}>
                      {getTypeIcon(type.value)}
                    </Box>
                    <Typography variant="body2" sx={style.menuItemText}>
                      {type.name}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Select
              id="outlined-select-type2"
              value={selectedType2}
              onChange={handleType2Change}
              label="Type 2"
              variant="outlined"
              sx={style.select}
            >
              <MenuItem value='All'>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CardMedia
                    component="img"
                    sx={style.menuItemIcon}
                    image={PokeballIcon}
                  />
                  <Typography variant="body2" sx={style.menuItemText}>
                    All
                  </Typography>
                </Stack>
              </MenuItem>
              {pokemonType.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={style.menuItemIcon}>
                      {getTypeIcon(type.value)}
                    </Box>
                    <Typography variant="body2" sx={style.menuItemText}>
                      {type.name}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {filteredPokemonData.length > 0 ? (
            filteredPokemonData.map((pokemon, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={2} xl={2}>
                <Card>
                  <CardActionArea>
                    <Box sx={style.imgContainer}>
                      <CardMedia component="img" sx={style.cardMedia} image={pokemon.sprites.front_default || Placeholder} />
                    </Box>
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <img
                          src={PokeballIcon}
                          alt="Pokeball"
                          style={{ width: '13px', height: '13px' }}
                        />
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          color="text.secondary"
                        >
                          #{pokemon.id.toString().padStart(3, '0')}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" noWrap sx={style.pokemonName}>
                        {formatPokemonName(pokemon.name)}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={style.pokemonTypeContainer}>
                        {pokemon.types.map((type, index) => (
                          <Chip
                            key={index}
                            avatar={getTypeIcon(type.type.name)}
                            label={capitalizeFirstLetter(type.type.name)}
                            size="small"
                            variant="outlined"
                            sx={style.pokemonTypeChip}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography sx={style.noDataPlaceholder} variant="body1">Not found</Typography>
          )}
        </Grid>
      </Box>
    </Fragment>
  );
}

export default App;
