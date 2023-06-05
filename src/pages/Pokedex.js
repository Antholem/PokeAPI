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
  MenuItem,
  Select,
  Avatar,
  LinearProgress,
} from '@mui/material';
import Scale from '../animations/Scale';
import { grey, green, yellow, blue, brown, orange, teal, pink, purple, red, blueGrey, lightBlue, lightGreen, indigo, deepOrange, deepPurple, cyan, amber, lime } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HeightIcon from '@mui/icons-material/Height';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

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

import Sort from '../components/SortButton';
import NoItem from '../components/Placeholder';
import SearchBar from '../components/Textfield';

// Modal
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function PokeModal(props) {
  const { mode, themeColor, hpColor, atkColor, defColor, sAtkColor, sDefColor, speedColor, totalColor } = useStore();
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = React.useState('summary');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 'summary':
        return <>
          <Grid container direction="row" justifyContent='center' alignItems='center' spacing={1}>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <Stack direction='column'>
                <Box>
                  <Stack direction='row' justifyContent='center' alignItems='center'>
                    <Box>
                      {props.pokeball}
                    </Box>
                    <Box>
                      <Typography sx={{ textAlign: 'center' }} color='text.secondary' variant='body2'>
                        #{props.pokemonNumber}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box>
                  {props.pokeImage}
                </Box>
                {
                  props.pokemonLegendary ? (
                    <Box sx={{
                      cursor: 'default',
                      mx: 'auto',
                      textAlign: 'center',
                      borderRadius: '20px',
                      color: 'white',
                      background: 'linear-gradient(219deg, rgba(255,0,121,1) 0%, rgba(209,0,255,1) 38%, rgba(124,0,255,1) 65%, rgba(0,26,255,1) 100%)',
                      width: '90px',
                      mb: 1
                    }}>
                      <Typography sx={{ fontSize: '0.6em' }} variant='body2'>
                        Legendary
                      </Typography>
                    </Box>
                  ) :
                  props.pokemonMythical ? (
                      <Box sx={{
                        cursor: 'default',
                        mx: 'auto',
                        textAlign: 'center',
                        borderRadius: '20px',
                        color: 'white',
                        background: 'linear-gradient(219deg, rgba(255,0,0,1) 0%, rgba(255,68,0,1) 38%, rgba(255,132,0,1) 65%, rgba(255,214,0,1) 100%)',
                        width: '90px',
                        mb: 1
                      }}>
                        <Typography sx={{ fontSize: '0.6em' }} variant='body2'>
                          Mythical
                        </Typography>
                      </Box>
                  ) :
                  (null)
                }
                <Box>
                  <Typography sx={{ textAlign: 'center' }} variant='body1'>
                    {props.pokemonName}
                  </Typography>
                </Box>
                <Box>
                  {props.pokemonType}
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
              <Grid item sx={{mb: 1, px: 4}} xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent="center" alignItems='center' spacing={1}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card sx={{ py: 0.3, textAlign: 'center' }}>
                    <Stack direction='row' justifyContent="center" alignItems='center' spacing={1}>
                      <Box>
                        <HeightIcon sx={{fontSize: '0.7em'}} />
                      </Box>
                      <Box>
                        <Typography variant='body2'>
                          {props.pokemonHeight}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Card sx={{ py: 0.3, textAlign: 'center' }}>
                    <Stack direction='row' justifyContent="center" alignItems='center' spacing={1}>
                      <Box>
                        <FitnessCenterIcon sx={{ fontSize: '0.7em' }} />
                      </Box>
                      <Box>
                        <Typography variant='body2'>
                          {props.pokemonWeight}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              </Grid> 
              {stats.map((stats) => (
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ minWidth: 55, textAlign: 'right', mr: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {stats.name}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress
                        color={stats.color}
                        variant="determinate"
                        value={(stats.current / stats.total) * 100}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">
                        {stats.current}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </>;
      case 'stats':
        return <Grid container sx={{textAlign: 'center'}} direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {info.map((info) => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent="center" alignItems='flex-start' spacing={1}>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Card sx={{ py: 0.3 }}>
                  <Typography variant='body2'>
                    {info.name}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                <Card sx={{ py: 0.3 }}>
                  <Typography variant='body2'>
                    {info.value}
                  </Typography>
                </Card>
              </Grid>
            </Grid>   
          ))}
        </Grid>;
      default:
        return null;
    }
  };

  const color = themeColor === 'cherry' ? (mode === 'dark' ? red[400] : red[800]) :
    themeColor === 'rose' ? (mode === 'dark' ? pink[200] : pink[600]) :
      themeColor === 'lavender' ? (mode === 'dark' ? purple[300] : purple[700]) :
        themeColor === 'teal' ? (mode === 'dark' ? teal[200] : teal[700]) :
          themeColor === 'emerald' ? (mode === 'dark' ? green[400] : green[800]) :
            themeColor === 'amber' ? (mode === 'dark' ? yellow[400] : yellow[800]) :
              themeColor === 'apricot' ? (mode === 'dark' ? orange[300] : orange[800]) :
                (mode === 'dark' ? blue[300] : blue[800])
    ;

  const stats = [
    { name: "HP", current: props.pokemonHp, total: 255, color: hpColor },
    { name: "ATK", current: props.pokemonAtk, total: 181, color: atkColor },
    { name: "DEF", current: props.pokemonDef, total: 230, color: defColor },
    { name: "S.ATK", current: props.pokemonSatk, total: 173, color: sAtkColor },
    { name: "S.DEF", current: props.pokemonSdef, total: 230, color: sDefColor },
    { name: "SPEED", current: props.pokemonSpeed, total: 200, color: speedColor },
    { name: "TOTAL", current: props.pokemonTotal, total: 720, color: totalColor },
  ]

  const info = [
    { name: "Color", value: props.pokemonColor },
    { name: "Shape", value: props.pokemonShape },
    { name: "Ability", value: props.pokemonAbilities },
    { name: "Group", value: props.pokemonEggGroup },
    { name: "Growth", value: props.pokemonGrowthRate },
    { name: "Habitat", value: props.pokemonHabitat },
  ]

  return (
    <Fragment>
      <CardActionArea onClick={handleOpenModal}>
        {props.children}
      </CardActionArea>
      <Dialog
        maxWidth='sm'
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogContent sx={{ minHeight: { xs: 515, sm: 515, md: 330, lg: 330, xl: 330 } }}>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="secondary tabs example"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: color,
                },
                '& .Mui-selected': {
                  color: color,
                },
              }}
            >
              <Tab value="summary" label="Stats" />
              <Tab value="stats" label="Info" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {renderTabContent()}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color={themeColor} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

function capitalizeFirstLetter(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Pokedex() {
  const { mode, shiny, themeColor, sprites, render } = useStore();
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
  const [searchText, setSearchText] = useState('');
  const [selectedType1, setSelectedType1] = useState(localStorage.getItem('selectedType1') || 'Any');
  const [selectedType2, setSelectedType2] = useState(localStorage.getItem('selectedType2') || 'Any');
  const [selectedGen, setSelectedGen] = useState(localStorage.getItem('selectedGen') || 'generation-i');
  const [selectedStat, setSelectedStat] = useState(localStorage.getItem('selectedStat') || 'id');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${render}&offset=0`);
        const data = response.data.results;

        const formattedPokemonList = await Promise.all(
          data.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            const pokemonData = res.data;

            // Fetching generation information
            const speciesResponse = await axios.get(pokemonData.species.url);
            const speciesData = speciesResponse.data;
            const generationUrl = speciesResponse.data.generation.url;
            const generationResponse = await axios.get(generationUrl);
            const generation = generationResponse.data.name;

            // Fetching color information
            const colorResponse = await axios.get(pokemonData.species.url);
            const color = colorResponse.data.color.name;

            // Fetching abilities information
            const abilities = pokemonData.abilities.map((ability) => ability.ability.name);

            // Fetching growth-rate information
            const fetchGrowthRate = async (speciesData) => {
              const growthRateUrl = speciesData.growth_rate.url;
              const growthRateResponse = await axios.get(growthRateUrl);
              const growthRate = growthRateResponse.data.name;
              return growthRate;
            };

            // Fetching habitat information
            const fetchHabitat = async (speciesData) => {
              const habitatUrl = speciesData.habitat.url;
              const habitatResponse = await axios.get(habitatUrl);
              const habitat = habitatResponse.data.name;
              return habitat;
            };

            // Fetching shape information
            const fetchShape = async (speciesData) => {
              const shapeUrl = speciesData.shape.url;
              const shapeResponse = await axios.get(shapeUrl);
              const shape = shapeResponse.data.name;
              return shape;
            };

            // Fetching legendary status
            const fetchLegendaryStatus = async (speciesData) => {
              const isLegendary = speciesData.is_legendary;
              return isLegendary;
            };

            // Fetching mythical status
            const fetchMythicalStatus = async (speciesData) => {
              const isMythical = speciesData.is_mythical;
              return isMythical;
            };

            const formattedPokemonData = {
              sprites: {
                front_default:
                  shiny ? (
                    sprites === 'home' ? pokemonData.sprites.other['home'].front_shiny :
                      sprites === 'official-artwork' ? pokemonData.sprites.other['official-artwork'].front_shiny :
                        pokemonData.sprites.front_shiny
                  ) : (
                    sprites === 'home' ? pokemonData.sprites.other['home'].front_default :
                      sprites === 'official-artwork' ? pokemonData.sprites.other['official-artwork'].front_default :
                        pokemonData.sprites.front_default
                  ),
              },
              id: pokemonData.id,
              name: pokemonData.name,
              types: pokemonData.types,
              generation: generation,
              color: color,
              hp: pokemonData.stats.find((stat) => stat.stat.name === 'hp').base_stat,
              atk: pokemonData.stats.find((stat) => stat.stat.name === 'attack').base_stat,
              def: pokemonData.stats.find((stat) => stat.stat.name === 'defense').base_stat,
              specialAttack: pokemonData.stats.find((stat) => stat.stat.name === 'special-attack').base_stat,
              specialDefense: pokemonData.stats.find((stat) => stat.stat.name === 'special-defense').base_stat,
              speed: pokemonData.stats.find((stat) => stat.stat.name === 'speed').base_stat,
              total: pokemonData.stats.reduce((total, stat) => total + stat.base_stat, 0),
              weight: pokemonData.weight,
              height: pokemonData.height,
              abilities: abilities,
              growthRate: await fetchGrowthRate(speciesData),
              eggGroups: speciesData.egg_groups,
              habitat: await fetchHabitat(speciesData),
              shape: await fetchShape(speciesData),
              is_legendary: await fetchLegendaryStatus(speciesData),
              is_mythical: await fetchMythicalStatus(speciesData),
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

      // Save state values to localStorage
      localStorage.setItem('sortOrder', sortOrder);
      localStorage.setItem('selectedType1', selectedType1);
      localStorage.setItem('selectedType2', selectedType2);
      localStorage.setItem('selectedGen', selectedGen);
      localStorage.setItem('selectedStat', selectedStat);
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

  const getTypeIcon2 = (type) => {
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

    return typeIcons[type];
  };

  const getTypeIconColor = (type) => {
    const typeIconColors = {
      bug: lime[900],
      dark: grey[900],
      dragon: cyan[700],
      electric: amber[800],
      fairy: purple.A400,
      fighting: pink[900],
      fire: deepOrange[700],
      flying: lightBlue[800],
      ghost: indigo[900],
      grass: lightGreen[800],
      ground: deepOrange.A400,
      ice: lightBlue[600],
      normal: grey[700],
      poison: deepPurple[500],
      psychic: pink.A400,
      rock: brown[600],
      steel: blueGrey[700],
      water: blue.A700,
    };

    return typeIconColors[type];
  };

  const getColor = (color) => {
    const pokemonColorCard = {
      black: mode === 'dark' ? grey[900] : grey[800], ////
      blue: mode === 'dark' ? blue[900] : blue[200], ////
      brown: mode === 'dark' ? brown[900] : brown[200], ////
      gray: mode === 'dark' ? blueGrey[900] : blueGrey[200], ////
      green: mode === 'dark' ? green[900] : green[200], ////
      pink: mode === 'dark' ? pink[400] : pink[100], //
      purple: mode === 'dark' ? purple[900] : purple[200], //
      red: mode === 'dark' ? red[900] : red[200], ////
      white: mode === 'dark' ? grey[300] : grey[50],
      yellow: mode === 'dark' ? yellow[800] : yellow[200], //
    };

    const pokemonColorImage = {
      black: mode === 'dark' ? grey[800] : grey[900], ////
      blue: mode === 'dark' ? blue[300] : blue[500], ////
      brown: mode === 'dark' ? brown[300] : brown[500], ////
      gray: mode === 'dark' ? blueGrey[500] : blueGrey[500], ////
      green: mode === 'dark' ? green[300] : green[500], ////
      pink: mode === 'dark' ? pink[100] : pink[400], //
      purple: mode === 'dark' ? purple[200] : purple[400], //
      red: mode === 'dark' ? red[300] : red[500], ////
      white: mode === 'dark' ? grey[50] : grey[300], //
      yellow: mode === 'dark' ? yellow[200] : yellow[500], //
    };

    return {
      cardBackground: pokemonColorCard[color] || '',
      imageBackground: pokemonColorImage[color] || '',
    };
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

    const sortedList = [...filteredPokemonList].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a[selectedStat] - b[selectedStat]; // Ascending order
      } else {
        return b[selectedStat] - a[selectedStat]; // Descending order
      }
    });
    setPokemonList(sortedList);

    // Save sortOrder to localStorage
    localStorage.setItem('sortOrder', newSortOrder);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleType1Change = (event) => {
    setSelectedType1(event.target.value);

    // Save selectedType1 to localStorage
    localStorage.setItem('selectedType1', event.target.value);
  };

  const handleType2Change = (event) => {
    setSelectedType2(event.target.value);

    // Save selectedType2 to localStorage
    localStorage.setItem('selectedType2', event.target.value);
  };

  const handleGenChange = (event) => {
    setSelectedGen(event.target.value);

    // Save selectedGen to localStorage
    localStorage.setItem('selectedGen', event.target.value);
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

  const primary = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
  const secondary = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png";
  const tertiary = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png";
  const mythical = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png";
  const legendary = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png";

  const theme = useTheme();

  return (
    <Fragment>
      <Box sx={{ padding: '16px' }}>
        <Grid container sx={{ marginBottom: '16px' }} spacing={1}>
          <Grid item>
            <Sort onClick={sortPokemonList} sortOrder={sortOrder}/>
          </Grid>
          <Grid item>
            <SearchBar value={searchText} onChange={handleSearchTextChange} searchText={searchText} onClick={clearSearchText}/>
          </Grid>
          <Grid item>
            <Select
              color={themeColor}
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
              color={themeColor}
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
              color={themeColor}
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
              color={themeColor}
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
            <CircularProgress size={60} color={themeColor} />
          </Box>
        ) : (
              filteredPokemonList.length === 0 ? (
              <Fragment>
                <NoItem text={`Pokémon`} />
              </Fragment>
              ) : (
             <Grid container spacing={2}>
                    {filteredPokemonList.map((pokemon, index) => {
                      const { cardBackground, imageBackground } = getColor(pokemon.color);
                      return (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                          <Scale key={pokemon.id}>
                            <Card key={pokemon.id} sx={{ backgroundColor: cardBackground }}>
                              <PokeModal
                                pokeImage={
                                  pokemon.sprites.front_default ?
                                    <CardMedia
                                      sx={{ width: 120, mx: 'auto' }}
                                      component='img'
                                      image={pokemon.sprites.front_default}
                                      alt={pokemon.name}
                                    />
                                    : <CatchingPokemon sx={{ fontSize: '11.25em', color: mode === 'dark' ? grey[200] : grey[600], maxWidth: 150 }} />
                                }
                                pokemonName={truncatePokemonName(capitalizeFirstLetter(formattedPokemonName(pokemon.name)), 15)}
                                pokemonNumber={`${pokemon.id.toString().padStart(3, '0')}`}
                                pokemonType={
                                  <Stack sx={{ marginTop: '8px' }} direction='row' justifyContent='center' spacing={1}>
                                    {pokemon.types.map((type, index) => (
                                      <Chip
                                        key={index}
                                        label={capitalizeFirstLetter(type.type.name)}
                                        avatar={<Avatar alt={type.type.name} src={getTypeIcon2(type.type.name)} />}
                                        variant='contained'
                                        size='small'
                                        sx={{ color: grey[50], backgroundColor: getTypeIconColor(type.type.name) }}
                                      />
                                    ))}
                                  </Stack>
                                }
                                pokeball={<CardMedia
                                  sx={{ width: 25, ml: -0.7 }}
                                  component='img'
                                  image={pokemon.is_legendary ? (legendary) :
                                    pokemon.is_mythical ? (mythical) :
                                      pokemon.total <= 365 ? primary :
                                        pokemon.total >= 366 && pokemon.total <= 469 ? secondary :
                                          pokemon.total >= 479 ? tertiary :
                                            primary}
                                />}
                                pokemonHp={pokemon.hp}
                                pokemonAtk={pokemon.atk}
                                pokemonDef={pokemon.def}
                                pokemonSatk={pokemon.specialAttack}
                                pokemonSdef={pokemon.specialDefense}
                                pokemonSpeed={pokemon.speed}
                                pokemonTotal={pokemon.total}
                                pokemonHeight={`${pokemon.height / 10} m`}
                                pokemonWeight={`${pokemon.weight / 10} kg`}
                                pokemonAbilities={pokemon.abilities.map((abilities, index) => (
                                  <Fragment key={index}>
                                    {index > 0 && ' / '}
                                    {capitalizeFirstLetter(formattedPokemonName(abilities))}
                                  </Fragment>
                                ))}
                                pokemonEggGroup={pokemon.eggGroups.map((eggGroups, index) => (
                                  <React.Fragment key={index}>
                                    {index > 0 && ' / '}
                                    {capitalizeFirstLetter(formattedPokemonName(eggGroups.name))}
                                  </React.Fragment>
                                ))}
                                pokemonGrowthRate={capitalizeFirstLetter(formattedPokemonName(pokemon.growthRate))}
                                pokemonColor={<Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                                  <Box><SquareRoundedIcon sx={{ color: imageBackground, fontSize: '0.6em' }} /> </Box>
                                  <Box>{capitalizeFirstLetter(formattedPokemonName(pokemon.color))}</Box>
                                </Stack>}
                                pokemonHabitat={capitalizeFirstLetter(formattedPokemonName(pokemon.habitat))}
                                pokemonShape={capitalizeFirstLetter(formattedPokemonName(pokemon.shape))}
                                pokemonGen={pokemon.generation}
                                pokemonLegendary={pokemon.is_legendary}
                                pokemonMythical={pokemon.is_mythical}
                              >
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: imageBackground, m: 0.7, borderRadius: '5px' }}>
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
                                  <Stack direction='row' alignItems="center">
                                    <Box>
                                      <CardMedia
                                        sx={{ width: 25, ml: -0.7 }}
                                        component='img'
                                        image={
                                          pokemon.is_legendary ? (legendary) :
                                            pokemon.is_mythical ? (mythical) :
                                              pokemon.total <= 365 ? primary :
                                                pokemon.total >= 366 && pokemon.total <= 469 ? secondary :
                                                  pokemon.total >= 479 ? tertiary :
                                                    primary}
                                      />
                                    </Box>
                                    <Box>
                                      <Typography variant='body2' color='text.secondary' sx={{ color: pokemon.color === 'black' ? grey[200] : pokemon.color === 'white' ? grey[700] : 'none' }}>
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
                                                          ? `${pokemon.height / 10} m`
                                                          : selectedStat === 'weight'
                                                            ? `${pokemon.weight / 10} kg`
                                                            : `#${pokemon.id.toString().padStart(3, '0')}`}
                                      </Typography>
                                    </Box>
                                  </Stack>
                                  <Typography
                                    sx={{ lineHeight: 1.2, maxHeight: '2.4em', overflow: 'hidden', textOverflow: 'ellipsis', color: pokemon.color === 'black' ? grey[50] : pokemon.color === 'white' ? grey[900] : 'none' }}
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
                                        avatar={<Avatar alt={type.type.name} src={getTypeIcon2(type.type.name)} />}
                                        variant='contained'
                                        size='small'
                                        sx={{ color: grey[50], backgroundColor: getTypeIconColor(type.type.name) }}
                                      />
                                    ))}
                                  </Stack>
                                </CardContent>
                              </PokeModal>
                            </Card>
                          </Scale>
                        </Grid>
                      );
                    })}
              </Grid>
            )
        )}
      </Box>
    </Fragment>
  );
}

export default Pokedex;
