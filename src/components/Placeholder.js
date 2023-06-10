import React from 'react';
import useStore from '../Store';
import { CatchingPokemon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

function NoItem(props) {
    const { mode } = useStore(); // Accessing from the useStore hook

    // Inline styles for components
    const style = {
        noItemContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            textAlign: 'center'
        },
        noItemIcon: {
            fontSize: '4em',
            color: mode === 'dark' ? grey[200] : grey[600]
        }
    }

    return (
        <Box sx={style.noItemContainer}>
            <Box>
                <CatchingPokemon sx={style.noItemIcon} />
                <Typography variant='body1' color='text.secondary'>
                    No {props.text} Found!
                </Typography>
            </Box>
        </Box>
    );
}

export default NoItem;
