import React from 'react';
import useStore from '../Store';
import { CatchingPokemon } from '@mui/icons-material';
import { Select, MenuItem, Stack, Typography, Box, CardMedia } from '@mui/material';
import { grey, red, blue } from '@mui/material/colors';

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

const getClassIcon = (type) => {
    const classIcons = {
        physical: PhysicalIcon,
        status: StatusIcon,
        special: SpecialIcon,
    };

    return <img src={classIcons[type]} style={{width: '17px'}} alt={type} />;
};

function SelectType(props) {
    const { mode, themeColor } = useStore();

    const style = {
        selectContainer: {
            minWidth: '125px'
        },
        typeIcon: {
            width: '20px',
            height: '20px',
            color: mode === 'dark' ? grey[200] : grey[600]
        },
        pokeballText: {
            fontSize: '14px'
        }
    }

    return (
        <Select sx={style.selectContainer} color={themeColor} id='outlined-select-type' value={props.value} onChange={props.onChange} label='Pokemon Type Filter' variant='outlined'>
            <MenuItem value='Any'>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <CatchingPokemon sx={style.typeIcon} />
                    <Typography sx={style.pokeballText} variant='body2'>
                        Any
                    </Typography>
                </Stack>
            </MenuItem>
            {props.map.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Box sx={style.typeIcon}>
                            {getTypeIcon(type.value)}
                        </Box>
                        <Typography sx={style.pokeballText} variant='body2'>
                            {type.name}
                        </Typography>
                    </Stack>
                </MenuItem>
            ))}
        </Select>
    );
}

function SelectGenaration(props) {
    const { mode, themeColor } = useStore();

    const style = {
        selectContainer: {
            minWidth: '125px'
        },
        typeIcon: {
            width: '50px',
            height: '20px',
            ml: -2,
            mr: -1.9
        },
        placeholderIcon: {
            width: '20px',
            height: '20px',
            color: mode === 'dark' ? grey[200] : grey[600]
        },
        generationText: {
            fontSize: '14px',
            ml: -2
        },
    }

    return(
        <Select sx={style.selectContainer} color={themeColor} id='outlined-select-gen' value={props.value} onChange={props.onChange} label='Generation' variant='outlined'>
            {props.map.map((gen, index) => (
                <MenuItem value={gen.value} key={gen.value}>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        {
                            index === 0 ? (
                                <CatchingPokemon sx={style.placeholderIcon} />
                            ) : (
                                <CardMedia sx={style.typeIcon} component='img' image={gen.icon}/>
                            )
                        }
                        <Typography variant='body2' sx={style.generationText}>
                            {gen.name}
                        </Typography>
                    </Stack>
                </MenuItem>
            ))}
        </Select>
    );
}

function SelectStat(props) {
    const { mode, themeColor } = useStore();

    const style = {
        selectContainer: {
            minWidth: '125px'
        },
    }

    return (
        <Select
            sx={style.selectContainer}
            color={themeColor}
            id='outlined-select-stat'
            value={props.value}
            onChange={props.onChange}
            label='Stat'
            variant='outlined'
        >
            {props.map.map((type) => (
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
    );
}

function SelectDamageClass(props) {
    const { mode, themeColor } = useStore();

    const getClassIconColor = (type) => {
        const classIconColors = {
            physical: red[900],
            status: blue[900],
            special: grey[600],
        };

        return classIconColors[type];
    };

    const style = {
        selectContainer: {
            minWidth: '130px'
        },
        typeIcon: {
            width: '20px',
            height: '20px',
            color: mode === 'dark' ? grey[200] : grey[600],
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        pokeballText: {
            fontSize: '14px'
        }
    }

    return (
        <Select sx={style.selectContainer} color={themeColor} id='outlined-select-type' value={props.value} onChange={props.onChange} label='Pokemon Type Filter' variant='outlined'>
            <MenuItem value='Any'>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <CatchingPokemon sx={style.typeIcon} />
                    <Typography sx={style.pokeballText} variant='body2'>
                        Any
                    </Typography>
                </Stack>
            </MenuItem>
            {props.map.map((type) => (
                <MenuItem value={type.value} key={type.value}>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Box sx={[style.typeIcon, { backgroundColor: getClassIconColor(type.value) }]}>
                            {getClassIcon(type.value)}
                        </Box>
                        <Typography sx={style.pokeballText} variant='body2'>
                            {type.name}
                        </Typography>
                    </Stack>
                </MenuItem>
            ))}
        </Select>
    );
}

export default { SelectType, SelectGenaration, SelectStat, SelectDamageClass };
