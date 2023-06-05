import React from 'react';
import useStore from '../Store';
import axios from 'axios';
import { TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {
    const { themeColor } = useStore();

    const style = {
        textField: {
            maxWidth: '220px'
        },
        closeIcon: {
            cursor: 'pointer'
        }
    }

    return (
        <TextField
            color={themeColor}
            sx={style.textField}
            id='outlined-basic'
            label='Search'
            variant='outlined'
            value={props.value}
            onChange={props.onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position='end'>
                        {props.searchText && (<CloseIcon sx={style.closeIcon} onClick={props.onClick} /> )}
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default SearchBar;
