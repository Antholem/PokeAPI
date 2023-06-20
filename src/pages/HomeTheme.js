import React from 'react'
import { useNavigate } from 'react-router-dom';
import useStore from '../Store';
import { Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { grey, red, orange, yellow, green, teal, indigo, blue, purple, pink } from '@mui/material/colors';

const Home = () => {
    const navigate = useNavigate();
    const { mode, themeColor } = useStore();

    const darkTheme = createTheme({
        palette: {
            mode: mode === 'dark' ? 'dark' : 'light',
            primary: {
                main: themeColor === 'cherry' ? (mode === 'dark' ? red[400] : red[800]) :
                      themeColor === 'rose' ? (mode === 'dark' ? pink[200] : pink[600]) :
                      themeColor === 'lavender' ? (mode === 'dark' ? purple[200] : purple[800]) :
                      themeColor === 'navy' ? (mode === 'dark' ? blue[300] : blue[800]) : 
                      themeColor === 'indigo' ? (mode === 'dark' ? indigo[300] : indigo[800]) :
                      themeColor === 'teal' ? (mode === 'dark' ? teal[200] : teal[700]) :
                      themeColor === 'emerald' ? (mode === 'dark' ? green[400] : green[800]) :
                      themeColor === 'amber' ? (mode === 'dark' ? yellow[400] : yellow[800]) :
                    (mode === 'dark' ? orange[300] : orange[800]) ,
                contrastText: mode === 'dark' ? grey[900] : grey[50],
            },
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div>
                Home
                <Button color='primary' variant='outlined'>
                    Start
                </Button>
                <button onClick={() => navigate('/pokedex')}>
                    Start
                </button>
            </div>
        </ThemeProvider>
    )
}

export default Home