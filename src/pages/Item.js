import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import Pokemon from '../components/Other';
import Loading from '../components/Loading';
import Scale from '../animations/Scale';
import NoItem from '../components/Placeholder';
import SearchBar from '../components/Textfield';

function Items() {
    const [itemList, setItemList] = useState([]);
    const [filteredItemList, setFilteredItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/item?limit=50');
                const data = response.data.results;

                const formattedItemList = await Promise.all(
                    data.map(async item => {
                        const itemDataResponse = await axios.get(item.url);
                        const itemData = itemDataResponse.data;

                        return {
                            name: itemData.name,
                            image: itemData.sprites.default,
                            id: itemData.id,
                            effectEntries: itemData.effect_entries.map(entry => entry.effect),
                            attributes: itemData.attributes.map(attribute => attribute.name),
                            categories: itemData.category.name,
                            effects: itemData.effect_entries.map(entry => entry.short_effect),
                        };
                    })
                );

                setItemList(formattedItemList);
                setFilteredItemList(formattedItemList);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchItemData();
    }, []);

    const renderEffectEntries = item =>
        item.effectEntries.map((effect, effectIndex) => (
            <Typography key={effectIndex} variant="caption" color="text.secondary">
                {effect}
            </Typography>
        ));

    const renderAttributes = item =>
        item.attributes.map((attribute, attributeIndex) => (
            <Typography key={attributeIndex} variant="caption" color="text.secondary">
                {attribute
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                {attributeIndex !== item.attributes.length - 1 && ', '}
            </Typography>
        ));

    const handleSearchTextChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredItems = itemList.filter(item => item.name.toLowerCase().includes(searchText));
        setFilteredItemList(filteredItems);
        setSearchText(searchText);
    };

    const clearSearchText = () => {
        setSearchText('');
        setFilteredItemList(itemList);
    };

    return (
        <Fragment>
            <Box sx={{ padding: '16px' }}>
                <Grid container sx={{ marginBottom: '16px' }} spacing={1}>
                    <Grid item>
                        <SearchBar value={searchText} onChange={handleSearchTextChange} searchText={searchText} onClick={clearSearchText} />
                    </Grid>
                </Grid>
                {isLoading ? (
                    <Loading />
                ) : (
                    filteredItemList.length === 0 ? (
                        <NoItem text={`Item`} />
                    ) : (
                        <Grid container direction="row" spacing={1}>
                            {filteredItemList.map((item, index) => (
                                <Grid item key={index} xs={6} sm={6} md={3} lg={2} xl={2}>
                                    <Scale key={item.id}>
                                        <Card key={item.id} variant="outlined">
                                            <CardActionArea>
                                                <CardContent>
                                                    <CardMedia
                                                        sx={{
                                                            maxWidth: 40,
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            mx: 'auto',
                                                            my: 'auto',
                                                        }}
                                                        component="img"
                                                        alt={item.name}
                                                        src={item.image}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            display: '-webkit-box',
                                                            overflow: 'hidden',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 1,
                                                            textAlign: 'center',
                                                        }}
                                                        variant="body2"
                                                        component="div"
                                                    >
                                                        <Pokemon.Name name={item.name} />
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Scale>
                                </Grid>
                            ))}
                        </Grid>
                    )
                )}
            </Box>
        </Fragment>
    );
}

export default Items;
