import React, { Fragment } from 'react';
import useStore from '../Store';
import { Avatar, Box, CardMedia, Chip, Stack } from '@mui/material';
import { CatchingPokemon } from '@mui/icons-material';
import { grey, blue, brown, pink, purple, blueGrey, lightBlue, lightGreen, indigo, deepOrange, deepPurple, cyan, amber, lime, red } from '@mui/material/colors';
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
import StatusIcon from '../images/Pokemon_Status.png'
import PhysicalIcon from '../images/Pokemon_Physical.png'
import SpecialIcon from '../images/Pokemon_Special.png'

// Capitalize every first letter
function capitalizeFirstLetter(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Ellipsis for long text
const truncatePokemonName = (name, maxLength) => {
    if (name.length <= maxLength) {
        return name;
    }
    return `${name.slice(0, maxLength)}...`;
};

// Replacing the '-' into white space
const formattedPokemonName = (name) => {
    return name.replace(/-/g, ' ');
};


// Formatted Pokémon name
function Name(props) {
    return (
        <Fragment>
            {truncatePokemonName(capitalizeFirstLetter(formattedPokemonName(props.name)), 15)}
        </Fragment>
    );
}

// Formatted Pokémon moves
function MoveName(props) {
    return (
        <Fragment>
            {capitalizeFirstLetter(formattedPokemonName(props.name))}
        </Fragment>
    );
}

// Formatted move's statistics name
function StatName(props) {
    return (
        <Fragment>
            {capitalizeFirstLetter(formattedPokemonName(props.name))}
        </Fragment>
    );
}

// Formatted ID
function ID(props) {
    return (
        <Fragment>
            {`#${props.id.toString().padStart(3, '0')}`}
        </Fragment>
    );
}

// Conditional rendering for pokéball sprites
function Pokeball(props) {
    // Sprites
    const primary = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    const secondary = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png';
    const tertiary = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png';
    const mythical = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png';
    const legendary = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png';

    // Inline styles for components
    const style = {
        img: {
            width: 25,
            ml: -0.7
        }
    }

    return (
        <Fragment>
            <CardMedia
                sx={style.img}
                component='img'
                image={
                    props.legendary ? legendary :
                    props.mythical ? mythical :
                    props.total <= 365 ? primary :
                    props.total >= 366 && props.total <= 469 ? secondary :
                    props.total >= 479 ? tertiary :
                    primary
                }
            />
        </Fragment>
    );
}

// Pokémon sprites
function Sprites(props) {
    const { mode } = useStore(); // Accessing from the useStore hook

    // Inline styles for components
    const style = {
        img: {
            maxWidth: 145
        },
        placeholder: {
            fontSize: '11.25em',
            color: mode === 'dark' ? grey[200] : grey[600],
            maxWidth: 150
        }
    }

    return (
        <Fragment>
            {
                props.sprites ?
                    <CardMedia sx={style.img} component='img' image={props.sprites} alt={props.name} />
                    : <CatchingPokemon sx={style.placeholder} />
            }
        </Fragment>
    );
}

// Item sprites
function ItemSprites(props) {
    // Inline styles for components
    const style = {
        cardMedia: {
            maxWidth: props.maxWidth,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mx: 'auto',
            my: 'auto',
        }
    }

    return (
        <CardMedia
            sx={style.cardMedia}
            component='img'
            alt={props.alt}
            src={props.src}
        />
    );
}

// Pokémon Type icon and theme color
function Type(props) {
    const { mode } = useStore(); // Accessing from the useStore hook

    // Pokémon types icon
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

        return typeIcons[type];
    };

    // Pokémon types icon theme color
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

    // Inline styles for components
    const style = {
        chipContainer: {
            marginTop: '8px'
        },
        placeholder: {
            fontSize: '11.25em',
            color: mode === 'dark' ? grey[200] : grey[600],
            maxWidth: 150
        },
        chip: {
            color: grey[50]
        }
    }

    return (
        <Stack sx={style.chipContainer} direction='row' justifyContent='center' spacing={1}>
            {props.map.map((type, index) => (
                <Chip
                    key={index}
                    label={capitalizeFirstLetter(type.type.name)}
                    avatar={<Avatar alt={type.type.name} src={getTypeIcon(type.type.name)} />}
                    variant='contained'
                    size='small'
                    sx={[style.chip, { backgroundColor: getTypeIconColor(type.type.name) }]}
                />
            ))}
        </Stack>
    );
}

// Pokémon Type icon and theme color in Pokémon moves
function TypeMove(props) {
    const { mode } = useStore(); // Accessing from the useStore hook

    // Pokémon types icon
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

        return typeIcons[type];
    };

    // Pokémon types icon theme color
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

    // Inline styles for components
    const style = {
        chipContainer: {
            marginTop: '8px'
        },
        placeholder: {
            fontSize: '11.25em',
            color: mode === 'dark' ? grey[200] : grey[600],
            maxWidth: 150
        },
        chip: {
            color: grey[50]
        }
    }

    return (
        <Chip
            label={capitalizeFirstLetter(props.name)}
            avatar={<Avatar alt={props.name} src={getTypeIcon(props.name)} />}
            variant='contained'
            size='small'
            sx={[style.chip, { backgroundColor: getTypeIconColor(props.name) }]}
        />
    );
}

// Pokémon damage class icon and theme color in Pokémon moves
function DamageClass(props) {
    // Pokémon damage class icon
    const getClassIcon = (type) => {
        const classIcons = {
            physical: PhysicalIcon,
            status: StatusIcon,
            special: SpecialIcon,
        };

        return classIcons[type];
    };

    // Pokémon damage class icon theme color
    const getClassIconColor = (type) => {
        const classIconColors = {
            physical: red[900],
            status: blue[900],
            special: grey[600],
        };

        return classIconColors[type];
    };

    // Inline styles for components
    const style = {
        chip: {
            color: grey[50]
        }
    }

    return (
        <Chip
            label={capitalizeFirstLetter(props.name)}
            avatar={<Avatar alt={props.name} src={getClassIcon(props.name)} />}
            variant='contained'
            size='small'
            sx={[style.chip, { backgroundColor: getClassIconColor(props.name) }]}
        />
    );
}

// Conditional rendering for Pokémon stats
function SelectedStat(props) {
    return (
        <Fragment>
            {
                props.selectedStat === 'id' ? <ID id={props.id} /> :
                props.selectedStat === 'hp' ? `${props.hp} HP` :
                props.selectedStat === 'atk' ? `${props.atk}` :
                props.selectedStat === 'def' ? `${props.def}` :
                props.selectedStat === 'specialAttack' ? `${props.satk}` :
                props.selectedStat === 'specialDefense' ? `${props.sdef}` :
                props.selectedStat === 'speed' ? `${props.spd}` :
                props.selectedStat === 'total' ? `${props.total}` :
                props.selectedStat === 'height' ? `${props.ht / 10} m` :
                props.selectedStat === 'weight' ? `${props.wt / 10} kg` :
                <ID id={props.id} />
            }
        </Fragment>
    );
}

// Pokémon color icon
function ColorSquare(props) {
    // Inline styles for components
    const style = {
        icon: {
            color: props.color,
            fontSize: '0.6em'
        }
    }

    return (
        <Fragment>
            <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                <Box>
                    <SquareRoundedIcon sx={style.icon} />
                </Box>
                <Box>
                    {capitalizeFirstLetter(formattedPokemonName(props.name))}
                </Box>
            </Stack>
        </Fragment>
    );
}

// Pokémon ability effect
function AbilityDesc(props) {
    return (
        <Fragment>
            {truncatePokemonName(props.name)}
        </Fragment>
    );
}

export default { Pokeball, Sprites, Type, TypeMove, DamageClass, Name, MoveName, StatName, ID, SelectedStat, ColorSquare, AbilityDesc, ItemSprites };
