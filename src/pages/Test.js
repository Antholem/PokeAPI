import React, { useState, useEffect, Fragment } from 'react';

function Test() {
    const [moveAilments, setMoveAilments] = useState([]);
    const [moveBattleStyles, setMoveBattleStyles] = useState([]);
    const [moveCategories, setMoveCategories] = useState([]);
    const [moveDamageClasses, setMoveDamageClasses] = useState([]);
    const [moveLearnMethods, setMoveLearnMethods] = useState([]);
    const [moveTargets, setMoveTargets] = useState([]);

    useEffect(() => {
        fetchMoveAilments();
        fetchMoveBattleStyles();
        fetchMoveCategories();
        fetchMoveDamageClasses();
        fetchMoveLearnMethods();
        fetchMoveTargets();
    }, []);

    const fetchMoveAilments = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/move-ailment?limit=100&offset=0');
            const data = await response.json();
            setMoveAilments(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoveBattleStyles = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/move-battle-style?limit=100&offset=0');
            const data = await response.json();
            setMoveBattleStyles(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoveCategories = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/move-category?limit=100&offset=0');
            const data = await response.json();
            setMoveCategories(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoveDamageClasses = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/move-damage-class?limit=100&offset=0');
            const data = await response.json();
            setMoveDamageClasses(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoveLearnMethods = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/move-learn-method?limit=100&offset=0');
            const data = await response.json();
            setMoveLearnMethods(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoveTargets = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/move-target?limit=100&offset=0');
            const data = await response.json();
            setMoveTargets(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <h1>Move Ailments</h1>
            <ul>
                {moveAilments.map((ailment) => (
                    <li key={ailment.name}>{ailment.name}</li>
                ))}
            </ul>

            <h1>Move Battle Styles</h1>
            <ul>
                {moveBattleStyles.map((battleStyle) => (
                    <li key={battleStyle.name}>{battleStyle.name}</li>
                ))}
            </ul>

            <h1>Move Categories</h1>
            <ul>
                {moveCategories.map((category) => (
                    <li key={category.name}>{category.name}</li>
                ))}
            </ul>

            <h1>Move Damage Classes</h1>
            <ul>
                {moveDamageClasses.map((damageClass) => (
                    <li key={damageClass.name}>{damageClass.name}</li>
                ))}
            </ul>

            <h1>Move Learn Methods</h1>
            <ul>
                {moveLearnMethods.map((learnMethod) => (
                    <li key={learnMethod.name}>{learnMethod.name}</li>
                ))}
            </ul>

            <h1>Move Targets</h1>
            <ul>
                {moveTargets.map((target) => (
                    <li key={target.name}>{target.name}</li>
                ))}
            </ul>
        </Fragment>
    );
}

export default Test;
