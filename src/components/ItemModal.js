import React, { useState, useEffect, Fragment } from 'react';
import { Stack } from '@mui/material';
import { Dialog, DialogActions, DialogContent, Button, DialogTitle, Card, CardActionArea, Typography, Grid, Box } from '@mui/material/';
import Pokemon from '../components/Other';
import useStore from '../Store';

function ItemModal(props) {
    const { themeColor } = useStore(); // Accessing from the useStore hook
    const [openModal, setOpenModal] = React.useState(false); // State variables

    // Open the modal
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Array containing item information
    const info = [
        { name: 'Effect', value: props.itemEffect },
        { name: 'Category', value: props.itemCategory },
        { name: 'Attribute', value: props.itemAttribrute },
    ]; 

    // Inline styles for components
    const style = {
        dialogTitle: {
            textAlign: 'center'
        },
        cardInfo: {
            textAlign: 'center',
            py: 0.5,
            px: 0.3
        },
        valueContainer: {
            mb: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 }
        }
    };

    return (
        <Fragment>
            {/* CardActionArea triggers the modal */}
            <CardActionArea onClick={handleOpenModal}>
                {props.children}
            </CardActionArea>
            {/* Dialog component for the modal */}
            <Dialog
                maxWidth='md'
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
            >
                <DialogTitle>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Box>
                            <Pokemon.ItemSprites
                                alt={props.itemName}
                                src={props.itemImage}
                                maxWidth={70}
                            />
                        </Box>
                        <Box>
                            <Typography sx={style.dialogTitle} variant='h6'>
                                #{props.itemId} {props.itemName}
                            </Typography>
                        </Box>
                    </Stack>
                </DialogTitle>
                {/* Modal content */}
                <DialogContent>
                    {/* Grid container for displaying Pokémon items */}
                    <Grid container direction='row' alignItems='center' justifyContent='center' spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent='center' alignItems='flex-start' spacing={1}>
                            {info.map((info) => (
                                <Fragment key={info.name}>
                                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                        <Card>
                                            <Typography sx={style.cardInfo} variant='body2'>
                                                {info.name}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                    <Grid sx={style.valueContainer} item xs={12} sm={12} md={9} lg={9} xl={9}>
                                        <Card>
                                            <Typography sx={style.cardInfo} variant='body2' >
                                                {info.value}
                                            </Typography>
                                        </Card>
                                    </Grid>
                                </Fragment>
                            ))}
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* Dialog actions */}
                <DialogActions>
                    <Button onClick={handleCloseModal} color={themeColor} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default ItemModal;