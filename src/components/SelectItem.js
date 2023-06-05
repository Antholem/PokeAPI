import React, { useEffect, useState, Fragment } from 'react';
import useStore from '../Store';
import axios from 'axios';
import { CatchingPokemon } from '@mui/icons-material';
import { Select, MenuItem, Stack, Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';

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

function SelectType(props) {
    const { mode, themeColor } = useStore();

    const style = {
        selectContainer: {
            minWidth: '125px'
        },
        typeIcon: {
            width: '20px', height: '20px', color: mode === 'dark' ? grey[200] : grey[600]
        },
        pokeballText: {
            fontSize: '14px'
        }
    }

    return (
        <Select
            color={themeColor}
            id='outlined-select-type'
            value={props.value}
            onChange={props.onChange}
            label='Pokemon Type Filter'
            variant='outlined'
            sx={style.selectContainer}
        >
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

export default { SelectType };
