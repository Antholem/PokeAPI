import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../Store';
import { Button } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const Home = () => {
    const navigate = useNavigate();
    const { mode } = useStore();

    const img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/172.png';

    return (
        <div className="container">
            <div className="left-section">
                <div className="content">
                    <h1>POKEAPI</h1>
                    <p>Explore Pokedex, items, moves, etc. and customize your personal using settings.</p>
                    <Button variant="contained" onClick={() => navigate('/pokedex')}>
                        Start
                    </Button>
                </div>
            </div>
            <div className="right-section">
                <img src={img} alt="Pikachu" />
            </div>
            <div className="social-icons">
                <Facebook />
                <Instagram />
                <Twitter />
            </div>
        </div>
    );
};

export default Home;
