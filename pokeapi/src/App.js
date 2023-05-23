import * as React from 'react';
import {
  CardActionArea,
  Chip,
  Stack,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Box
} from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';

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

function App() {
  const [pokemonData, setPokemonData] = React.useState([]);

  React.useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=12');
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

  const getTypeIcon = (type) => {
    // Define the type icons
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

  return (
    <Box sx={{ padding: '16px' }}>
      <Grid container justifyContent="center" spacing={2}>
        {pokemonData.map((pokemon, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={2} xl={2}>
            <Card>
              <CardActionArea>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150, height: 130 }}
                    image={pokemon.sprites.front_default}
                    alt={pokemon.name}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="body2" component="div" color="text.secondary">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </Typography>
                  <Typography variant="h6">{capitalizeFirstLetter(pokemon.name)}</Typography>
                  <Stack direction="row" spacing={1} sx={{ marginTop: '8px' }}>
                    {pokemon.types.map((type, index) => (
                      <Chip
                        key={index}
                        avatar={getTypeIcon(type.type.name)}
                        label={capitalizeFirstLetter(type.type.name)}
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
