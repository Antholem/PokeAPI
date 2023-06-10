import React from 'react';
import useStore from '../Store';
import { Box, CircularProgress } from '@mui/material';

function Loading() {
    const { themeColor } = useStore(); // Accessing from the useStore hook

    // Inline styles for components
    const style = {
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
        }
    }

    return (
        <Box sx={style.loadingContainer}>
            <CircularProgress size={60} color={themeColor} />
        </Box>
    );
}

export default Loading;
