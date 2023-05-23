import * as React from 'react';
import axios from 'axios';
import {
  Chip,
  Stack,
  Typography,
  Box,
  IconButton,
  TextField
} from '@mui/material';
import {
  CardActionArea,
  CardMedia,
  CardContent,
  Card
} from '@mui/material';
import Grid from '@mui/material/Grid';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
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

function App() {
  const [pokemonData, setPokemonData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${(currentPage - 1) * 12}`
        );
        const results = response.data.results;
        const pokemon = await Promise.all(
          results.map(async (result) => {
            const response = await axios.get(result.url);
            return response.data;
          })
        );
        setPokemonData(pokemon);
        setTotalPages(Math.ceil(response.data.count / 12));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonData();
  }, [currentPage]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

  const handlePageChange = (event) => {
    const newPage = parseInt(event.target.value, 10);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Grid container justifyContent="center" spacing={2}>
        {pokemonData.map((pokemon, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={2} xl={2}>
            <Card>
              <CardActionArea>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ maxWidth: 150 }}
                    image={pokemon.sprites.front_default}
                    alt={pokemon.name}
                  />
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
                  <Typography variant="h6" noWrap sx={{ lineHeight: 1.2, maxHeight: '2.4em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {capitalizeFirstLetter(pokemon.name)}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ marginTop: '8px' }}>
                    {pokemon.types.map((type, index) => (
                      <Chip
                        key={index}
                        avatar={getTypeIcon(type.type.name)}
                        label={capitalizeFirstLetter(type.type.name)}
                        variant="outlined"
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack sx={{ mt: 2 }} direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <IconButton
          aria-label="first page"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          aria-label="previous page"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <TextField
          id="outlined-basic"
          type="number"
          variant="outlined"
          value={currentPage}
          onChange={handlePageChange}
          sx={{ width: 70 }}
        />
        <Typography gutterBottom variant="body1" component="div">
          of {totalPages}
        </Typography>
        <IconButton
          aria-label="next page"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          aria-label="last page"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          <LastPageIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default App;
