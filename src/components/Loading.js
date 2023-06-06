import React, { useEffect, useState, Fragment } from 'react';
import useStore from '../Store';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';

function Loading() {
    const { themeColor } = useStore();

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
