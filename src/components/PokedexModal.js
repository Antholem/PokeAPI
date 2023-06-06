import React, { Fragment } from 'react';
import useStore from '../Store';
import { Card, Stack, Typography, Grid, Box, LinearProgress, CardActionArea, Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, Tabs, Tab } from '@mui/material/';
import { green, yellow, blue, orange, teal, pink, purple, red } from '@mui/material/colors';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HeightIcon from '@mui/icons-material/Height';

function PokeModal(props) {
    const { mode, themeColor, hpColor, atkColor, defColor, sAtkColor, sDefColor, speedColor, totalColor } = useStore();
    const [openModal, setOpenModal] = React.useState(false);
    const [value, setValue] = React.useState('summary');

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        pokemonID: {
            textAlign: 'center'
        },
        pokemonImg: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        pokemonName: {
            textAlign: 'center'
        },
        measureContainer: {
            mb: 1,
            px: 4
        },
        measureCard: {
            py: 0.3,
            textAlign: 'center'
        },
        measureIcon: {
            fontSize: '0.7em'
        },
        statsContainer: {
            width: '100%'
        },
        statsCentered: {
            display: 'flex',
            alignItems: 'center'
        },
        statsName: {
            minWidth: 55,
            textAlign: 'right',
            mr: 1
        },
        statsColor: {
            width: '100%',
            mr: 1
        },
        statsCurrent: {
            minWidth: 35
        },
        infoContainer: {
            textAlign: 'center'
        },
        infoCardName: {
            py: 0.3
        },
        infoCardValue: {
            py: 0.3
        },
        dialogContent: {
            minHeight: { xs: 515, sm: 515, md: 330, lg: 330, xl: 330 }
        },
        tabContainer: {
            width: '100%'
        },
        tabRenderContent: {
            mt: 2
        }
    }

    const renderTabContent = () => {
        switch (value) {
            case 'summary':
                return <>
                    <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1}>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                            <Stack direction='column'>
                                <Box>
                                    <Stack direction='row' justifyContent='center' alignItems='center'>
                                        <Box>
                                            {props.pokeball}
                                        </Box>
                                        <Box>
                                            <Typography sx={style.pokemonID} color='text.secondary' variant='body2'>
                                                {props.pokemonNumber}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                                <Box sx={style.pokemonImg}>
                                    {props.pokeImage}
                                </Box>

                                <Box>
                                    <Typography sx={style.pokemonName} variant='body1'>
                                        {props.pokemonName}
                                    </Typography>
                                </Box>
                                <Box>
                                    {props.pokemonType}
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                            <Grid item sx={style.measureContainer} xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent='center' alignItems='center' spacing={1}>
                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Card sx={style.measureCard}>
                                        <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                                            <Box>
                                                <HeightIcon sx={style.measureIcon} />
                                            </Box>
                                            <Box>
                                                <Typography variant='body2'>
                                                    {props.pokemonHeight}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Card>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Card sx={style.measureCard}>
                                        <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                                            <Box>
                                                <FitnessCenterIcon sx={style.measureIcon} />
                                            </Box>
                                            <Box>
                                                <Typography variant='body2'>
                                                    {props.pokemonWeight}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Card>
                                </Grid>
                            </Grid>
                            {stats.map((stats) => (
                                <Box sx={style.statsContainer}>
                                    <Box sx={style.statsCentered}>
                                        <Box sx={style.statsName}>
                                            <Typography variant='body2' color='text.secondary'>
                                                {stats.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={style.statsColor}>
                                            <LinearProgress
                                                color={stats.color}
                                                variant='determinate'
                                                value={(stats.current / stats.total) * 100}
                                            />
                                        </Box>
                                        <Box sx={style.statsCurrent}>
                                            <Typography variant='body2' color='text.secondary'>
                                                {stats.current}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                </>;
            case 'info':
                return <Grid container sx={style.infoContainer} direction='row' justifyContent='center' alignItems='center' spacing={1}>
                    {info.map((info) => (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent='center' alignItems='flex-start' spacing={1}>
                            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                <Card sx={style.infoCardName}>
                                    <Typography variant='body2'>
                                        {info.name}
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                                <Card sx={style.infoCardValue}>
                                    <Typography variant='body2'>
                                        {info.value}
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>;
            default:
                return null;
        }
    };

    const color = themeColor === 'cherry' ? (mode === 'dark' ? red[400] : red[800]) :
        themeColor === 'rose' ? (mode === 'dark' ? pink[200] : pink[600]) :
            themeColor === 'lavender' ? (mode === 'dark' ? purple[300] : purple[700]) :
                themeColor === 'teal' ? (mode === 'dark' ? teal[200] : teal[700]) :
                    themeColor === 'emerald' ? (mode === 'dark' ? green[400] : green[800]) :
                        themeColor === 'amber' ? (mode === 'dark' ? yellow[400] : yellow[800]) :
                            themeColor === 'apricot' ? (mode === 'dark' ? orange[300] : orange[800]) :
                                (mode === 'dark' ? blue[300] : blue[800])
        ;

    const stats = [
        { name: 'HP', current: props.pokemonHp, total: 255, color: hpColor },
        { name: 'ATK', current: props.pokemonAtk, total: 181, color: atkColor },
        { name: 'DEF', current: props.pokemonDef, total: 230, color: defColor },
        { name: 'S.ATK', current: props.pokemonSatk, total: 173, color: sAtkColor },
        { name: 'S.DEF', current: props.pokemonSdef, total: 230, color: sDefColor },
        { name: 'SPEED', current: props.pokemonSpeed, total: 200, color: speedColor },
        { name: 'TOTAL', current: props.pokemonTotal, total: 720, color: totalColor },
    ]

    const info = [
        { name: 'Color', value: props.pokemonColor },
        { name: 'Shape', value: props.pokemonShape },
        { name: 'Ability', value: props.pokemonAbilities },
        { name: 'Group', value: props.pokemonEggGroup },
        { name: 'Growth', value: props.pokemonGrowthRate },
        { name: 'Habitat', value: props.pokemonHabitat },
    ]

    return (
        <Fragment>
            <CardActionArea onClick={handleOpenModal}>
                {props.children}
            </CardActionArea>
            <Dialog
                maxWidth='sm'
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                fullWidth
            >
                <DialogContent sx={style.dialogContent}>
                    <Box sx={style.tabContainer}>
                        <Tabs sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: color,
                            },
                            '& .Mui-selected': {
                                color: color,
                            }
                        }}
                            value={value}
                            onChange={handleChange}
                            aria-label='secondary tabs example'
                            variant='scrollable'
                            scrollButtons='auto'
                        >
                            <Tab value='summary' label='Stats' />
                            <Tab value='info' label='Info' />
                        </Tabs>
                        <Box sx={style.tabRenderContent}>
                            {renderTabContent()}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color={themeColor} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default PokeModal;