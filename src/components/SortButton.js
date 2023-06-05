import React from 'react';
import useStore from '../Store';
import StraightIcon from '@mui/icons-material/Straight';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { ToggleButton } from '@mui/material';

function Sort(props) {
    const { mode, themeColor } = useStore();

    const theme = useTheme();

    const style = {
        toggleButton: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette[themeColor].main,
            '&:hover': {
                backgroundColor: theme.palette[themeColor].dark,
                transition: '0.3s'
            },
        },
        toggleIcon: {
            transform: `rotate(${props.sortOrder === 'desc' ? '180deg' : '0deg'})`,
            transition: 'transform 0.3s ease',
            color: mode === 'dark' ? grey[900] : grey[50]
        }
    }

    return (
        <ToggleButton onClick={props.onClick} value="check" sx={style.toggleButton}>
            <StraightIcon sx={style.toggleIcon} />
        </ToggleButton>
    );
}

export default Sort;
