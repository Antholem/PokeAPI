import React, { useState, useEffect, Fragment } from 'react';
import useStore from '../Store';
import axios from 'axios';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Stack,
  Typography,
  Chip,
  Grid,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Button,
  ToggleButton
} from '@mui/material';
import { grey } from '@mui/material/colors';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import StraightIcon from '@mui/icons-material/Straight';

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

function capitalizeFirstLetter(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Test() {
  const { mode, shiny } = useStore();
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [selectedType1, setSelectedType1] = useState('Any');
  const [selectedType2, setSelectedType2] = useState('Any');
  const [selectedGen, setSelectedGen] = useState('generation-i');
  const [selectedStat, setSelectedStat] = useState('id'); 

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const data = response.data.results;

        const formattedPokemonList = await Promise.all(
          data.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            const pokemonData = res.data;

            // Fetching generation information
            const speciesResponse = await axios.get(pokemonData.species.url);
            const generationUrl = speciesResponse.data.generation.url;
            const generationResponse = await axios.get(generationUrl);
            const generation = generationResponse.data.name;

            const formattedPokemonData = {
              sprites: {
                front_default: shiny ? pokemonData.sprites.front_shiny : pokemonData.sprites.front_default,
              },
              id: pokemonData.id,
              name: pokemonData.name,
              types: pokemonData.types,
              generation: generation,
              hp: pokemonData.stats.find((stat) => stat.stat.name === 'hp').base_stat,
              atk: pokemonData.stats.find((stat) => stat.stat.name === 'attack').base_stat,
              def: pokemonData.stats.find((stat) => stat.stat.name === 'defense').base_stat,
              specialAttack: pokemonData.stats.find((stat) => stat.stat.name === 'special-attack').base_stat,
              specialDefense: pokemonData.stats.find((stat) => stat.stat.name === 'special-defense').base_stat,
              speed: pokemonData.stats.find((stat) => stat.stat.name === 'speed').base_stat,
              total: pokemonData.stats.reduce((total, stat) => total + stat.base_stat, 0),
              weight: pokemonData.weight,
              height: pokemonData.height,
            };
            return formattedPokemonData;
          })
        );

        // Sort the list based on the selected stat
        const sortedList = [...formattedPokemonList].sort((a, b) => {
          if (sortOrder === 'asc') {
            return a[selectedStat] - b[selectedStat]; // Ascending order
          } else {
            return b[selectedStat] - a[selectedStat]; // Descending order
          }
        });

        setPokemonList(sortedList);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonData();
  }, [selectedStat]);

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

  const defaultSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  const shinySprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/';

  const pokemonGen = [
    { name: 'All Gen', value: 'All' },
    { name: 'Gen I', value: 'generation-i', icon: shiny ? `${shinySprite}1.png` : `${defaultSprite}1.png` },
    { name: 'Gen II', value: 'generation-ii', icon: shiny ? `${shinySprite}155.png` : `${defaultSprite}155.png` },
    { name: 'Gen III', value: 'generation-iii', icon: shiny ? `${shinySprite}255.png` : `${defaultSprite}255.png` },
    { name: 'Gen IV', value: 'generation-iv', icon: shiny ? `${shinySprite}387.png` : `${defaultSprite}387.png` },
    { name: 'Gen V', value: 'generation-v', icon: shiny ? `${shinySprite}501.png` : `${defaultSprite}501.png` },
    { name: 'Gen VI', value: 'generation-vi', icon: shiny ? `${shinySprite}656.png` : `${defaultSprite}656.png` },
    { name: 'Gen VII', value: 'generation-vii', icon: shiny ? `${shinySprite}728.png` : `${defaultSprite}728.png` },
    { name: 'Gen VIII', value: 'generation-viii', icon: shiny ? `${shinySprite}816.png` : `${defaultSprite}816.png` },
    { name: 'Gen IX', value: 'generation-ix', icon: shiny ? `${shinySprite}172.png` : `${defaultSprite}172.png` },
  ];

  const pokemonStat = [
    { name: 'ID', value: 'id' },
    { name: 'HP', value: 'hp' },
    { name: 'ATK', value: 'atk' },
    { name: 'DEF', value: 'def' },
    { name: 'S.ATK', value: 'specialAttack' },
    { name: 'S.DEF', value: 'specialDefense' },
    { name: 'SPEED', value: 'speed' },
    { name: 'TOTAL', value: 'total' },
    { name: 'HT', value: 'height' },
    { name: 'WGT', value: 'weight' }
  ];

  const sortPokemonList = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder); // Update sortOrder state

    const sortedList = [...pokemonList].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a[selectedStat] - b[selectedStat]; // Ascending order
      } else {
        return b[selectedStat] - a[selectedStat]; // Descending order
      }
    });
    setPokemonList(sortedList);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleType1Change = (event) => {
    setSelectedType1(event.target.value);
  };

  const handleType2Change = (event) => {
    setSelectedType2(event.target.value);
  };

  const handleGenChange = (event) => {
    setSelectedGen(event.target.value);
  };

  const clearSearchText = () => {
    setSearchText('');
  };

  const truncatePokemonName = (name, maxLength) => {
    if (name.length <= maxLength) {
      return name;
    }
    return `${name.slice(0, maxLength)}...`;
  };

  const formattedPokemonName = (name) => {
    return name.replace(/-/g, ' ');
  };

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    // Filter based on search text
    if (searchText !== '' && !pokemon.name.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }

    // Filter based on type 1
    if (selectedType1 !== 'Any' && !pokemon.types.find((type) => type.type.name === selectedType1)) {
      return false;
    }

    // Filter based on type 2
    if (selectedType2 !== 'Any' && !pokemon.types.find((type) => type.type.name === selectedType2)) {
      return false;
    }

    // Filter based on generation
    if (selectedGen !== 'All' && pokemon.generation !== selectedGen) {
      return false;
    }

    return true;
  });

  return (
    <Fragment>
      <Box sx={{ padding: '16px' }}>
        <Grid container sx={{ marginBottom: '16px' }} spacing={1}>
          <Grid item>
            <ToggleButton
              onClick={sortPokemonList}
              value="check"
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StraightIcon
                sx={{
                  transform: `rotate(${sortOrder === 'desc' ? '180deg' : '0deg'})`,
                  transition: 'transform 0.3s ease',
                }}
              />
            </ToggleButton>
          </Grid>
          <Grid item>
            <TextField
              sx={{ maxWidth: { xs: '220px', sm: '290px', md: '290px', lg: '290px', xl: '290px' } }}
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
                      <CloseIcon onClick={clearSearchText} sx={{ cursor: 'pointer' }} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <Select
              id='outlined-select-type1'
              value={selectedType1}
              onChange={handleType1Change}
              label='Type 1'
              variant='outlined'
              sx={{ minWidth: '125px' }}
            >
              <MenuItem value='Any'>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <CatchingPokemon
                    sx={{ width: '20px', height: '20px', color: mode === 'dark' ? grey[200] : grey[600] }}
                  />
                  <Typography variant='body2' sx={{ fontSize: '14px' }}>
                    Any
                  </Typography>
                </Stack>
              </MenuItem>
              {pokemonType.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Box sx={{ width: '20px', height: '20px', color: mode === 'dark' ? grey[200] : grey[600] }}>
                      {getTypeIcon(type.value)}
                    </Box>
                    <Typography variant='body2' sx={{ fontSize: '14px' }}>
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
              sx={{ minWidth: '125px' }}
            >
              <MenuItem value='Any'>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <CatchingPokemon
                    sx={{ width: '20px', height: '20px', color: mode === 'dark' ? grey[200] : grey[600] }}
                  />
                  <Typography variant='body2' sx={{ fontSize: '14px' }}>
                    Any
                  </Typography>
                </Stack>
              </MenuItem>
              {pokemonType.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Box sx={{ width: '20px', height: '20px', color: mode === 'dark' ? grey[200] : grey[600] }}>
                      {getTypeIcon(type.value)}
                    </Box>
                    <Typography variant='body2' sx={{ fontSize: '14px' }}>
                      {type.name}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Select
              id='outlined-select-gen'
              value={selectedGen}
              onChange={handleGenChange}
              label='Generation'
              variant='outlined'
              sx={{ minWidth: '135px' }}
            >
              {pokemonGen.map((gen, index) => (
                <MenuItem value={gen.value} key={gen.value}>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    {
                      index === 0 ? (
                        <CatchingPokemon
                          sx={{ width: '20px', height: '20px', color: mode === 'dark' ? grey[200] : grey[600] }}
                        />
                      ) : (
                        <CardMedia
                          sx={{ width: '50px', height: '20px', ml: -2, mr: -1.9 }}
                          component='img'
                          image={gen.icon}
                        />
                      )
                    }
                    <Typography variant='body2' sx={{ fontSize: '14px', ml: -2 }}>
                      {gen.name}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Select
              id='outlined-select-stat'
              value={selectedStat}
              onChange={(event) => setSelectedStat(event.target.value)}
              label='Stat'
              variant='outlined'
              sx={{ minWidth: '125px' }}
            >
              {pokemonStat.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <CatchingPokemon
                      sx={{ width: '20px', height: '20px', color: mode === 'dark' ? grey[200] : grey[600] }}
                    />
                    <Typography variant='body2' sx={{ fontSize: '14px' }}>
                      {type.name}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredPokemonList.map((pokemon, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                <Card>
                  <CardActionArea>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {
                        pokemon.sprites.front_default ?
                          <CardMedia
                            sx={{ maxWidth: 150 }}
                            component='img'
                            image={pokemon.sprites.front_default}
                            alt={pokemon.name}
                          />
                          : <CatchingPokemon sx={{ fontSize: '11.25em', color: mode === 'dark' ? grey[200] : grey[600], maxWidth: 150 }} />
                      }
                    </Box>
                    <CardContent>
                      <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography gutterBottom variant='body2' component='div' color='text.secondary'>
                        {selectedStat === 'id'
                          ? `#${pokemon.id.toString().padStart(3, '0')}`
                          : selectedStat === 'hp'
                          ? `${pokemon.hp} HP`
                          : selectedStat === 'atk'
                          ? `${pokemon.atk}`
                          : selectedStat === 'def'
                          ? `${pokemon.def}`
                          : selectedStat === 'specialAttack'
                          ? `${pokemon.specialAttack}`
                          : selectedStat === 'specialDefense'
                          ? `${pokemon.specialDefense}`
                          : selectedStat === 'speed'
                          ? `${pokemon.speed}`
                          : selectedStat === 'total'
                          ? `${pokemon.total}`
                          : selectedStat === 'height'
                          ? `${pokemon.height} m`
                          : selectedStat === 'weight'
                          ? `${pokemon.total} kg`
                          : `#${pokemon.id.toString().padStart(3, '0')}`}
                      </Typography>
                      </Stack>
                      <Typography
                        sx={{ lineHeight: 1.2, maxHeight: '2.4em', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        variant='h6'
                        component='div'
                      >
                        {truncatePokemonName(capitalizeFirstLetter(formattedPokemonName(pokemon.name)), 15)}
                      </Typography>
                      <Stack sx={{ marginTop: '8px' }} direction='row' spacing={1}>
                        {pokemon.types.map((type, index) => (
                          <Chip
                            key={index}
                            label={capitalizeFirstLetter(type.type.name)}
                            variant='outlined'
                            size='small'
                          />
                        ))}
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Fragment>
  );
}

export default Test;
