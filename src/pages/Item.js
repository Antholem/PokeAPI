import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import useStore from '../Store';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import Pokemon from '../components/Other';
import Loading from '../components/Loading';
import Scale from '../animations/Scale';
import NoItem from '../components/Placeholder';
import SearchBar from '../components/Textfield';
import Sort from '../components/SortButton';
import SelectItem from '../components/SelectItem';
import ItemModal from '../components/ItemModal';

function Items() {
    // Accessing from the useStore hook
    const { renderItem } = useStore();
    // State variables
    const [itemList, setItemList] = useState([]);
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
    const [filteredItemList, setFilteredItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [selectedStat, setSelectedStat] = useState(localStorage.getItem('selectedStat') || 'id');

    // Fetch item data from PokeAPI
    useEffect(() => {
        const fetchItemData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://pokeapi.co/api/v2/item?limit=${renderItem}`);
                const data = response.data.results;

                // Format the item data
                const formattedItemList = await Promise.all(
                    data.map(async (item) => {
                        const itemDataResponse = await axios.get(item.url);
                        const itemData = itemDataResponse.data;

                        return {
                            name: itemData.name,
                            image: itemData.sprites.default,
                            id: itemData.id,
                            effectEntries: itemData.effect_entries.map((entry) => entry.effect),
                            attributes: itemData.attributes.map((attribute) => attribute.name),
                            categories: itemData.category.name,
                            effects: itemData.effect_entries.map((entry) => entry.short_effect),
                        };
                    })
                );

                // Set the formatted item list and update loading state
                setItemList(formattedItemList);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchItemData();
    }, []);

    // Sort and filter the item list based on selectedStat and sortOrder
    useEffect(() => {
        let sortedList = [...itemList];

        if (sortOrder === 'asc') {
            sortedList.sort((a, b) => (a[selectedStat] > b[selectedStat] ? 1 : -1));
        } else {
            sortedList.sort((a, b) => (a[selectedStat] < b[selectedStat] ? 1 : -1));
        }

        setFilteredItemList(sortedList);
    }, [selectedStat, sortOrder, itemList]);

    // Render the attributes of an item
    const renderAttributes = (item) =>
        item.attributes.map((attribute, attributeIndex) => (
            <Fragment key={attributeIndex}>
                {attribute
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                {attributeIndex !== item.attributes.length - 1 && ', '}
            </Fragment>
        ));

    // Event handler for search text change
    const handleSearchTextChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredItems = itemList.filter((item) => item.name.toLowerCase().includes(searchText));
        setFilteredItemList(filteredItems);
        setSearchText(searchText);
    };

    // Clear the search text
    const clearSearchText = () => {
        setSearchText('');
        setFilteredItemList(itemList);
    };

    // Event handler for stat change
    const handleStatChange = (event) => {
        const stat = event.target.value;
        setSelectedStat(stat);

        // Save selectedStat to localStorage
        localStorage.setItem('selectedStat', stat);
    };

    // Sort the item list
    const sortItemList = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        const sortedList = [...filteredItemList].sort((a, b) => {
            if (selectedStat === 'id') {
                return newSortOrder === 'asc' ? a.id - b.id : b.id - a.id;
            } else if (selectedStat === 'name') {
                return newSortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
        });

        setFilteredItemList(sortedList);

        // Save sortOrder to localStorage
        localStorage.setItem('sortOrder', newSortOrder);
    };

    // Array containing item
    const item = [
        { name: 'ID', value: 'id' },
        { name: 'Name', value: 'name' },
    ];

    // Inline styles for components
    const style = {
        pageContainer: {
            padding: '16px'
        },
        filteringContainer: {
            marginBottom: '16px'
        },
        itemName: {
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            textAlign: 'center',
        },
    };

    return (
        <Fragment>
            <Box sx={style.pageContainer}>
                <Grid container sx={style.filteringContainer} spacing={1}>
                    <Grid item>
                        {/* Sort toggle by ascending/descending */}
                        <Sort onClick={sortItemList} sortOrder={sortOrder} />
                    </Grid>
                    <Grid item>
                        {/* Search item */}
                        <SearchBar value={searchText} onChange={handleSearchTextChange} searchText={searchText} onClick={clearSearchText} />
                    </Grid>
                    <Grid item>
                        {/* Select statistics */}
                        <SelectItem.SelectStat value={selectedStat} onChange={handleStatChange} map={item} />
                    </Grid>
                </Grid>
                {isLoading ? (
                    // display when fetching data
                    <Loading />
                ) : filteredItemList.length === 0 ? (
                    // display when there is no data based on the filter
                    <NoItem text={`Item`} />
                ) : (
                    // Grid container for displaying Pokémon item
                    <Grid container direction='row' spacing={1}>
                        {filteredItemList.map((item, index) => (
                            <Grid item key={index} xs={6} sm={6} md={3} lg={2} xl={2}>
                                <Scale key={item.id}> {/* Scale in/out animation for card */}
                                    <Card key={item.id}>
                                        <ItemModal
                                            itemName={<Pokemon.Name name={item.name} />}
                                            itemId={item.id}
                                            itemEffect={item.effects}
                                            itemImage={item.image}
                                            itemAttribrute={renderAttributes(item)}
                                            itemCategory={<Pokemon.Name name={item.categories} />}
                                        >
                                            <CardContent>
                                                <Pokemon.ItemSprites alt={item.name} src={item.image} maxWidth={40} />
                                                <Typography sx={style.itemName} variant='body2' component='div'>
                                                    <Pokemon.Name name={`#${item.id} ${item.name}`} />
                                                </Typography>
                                            </CardContent>
                                        </ItemModal>
                                    </Card>
                                </Scale>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Fragment>
    );
}

export default Items;
