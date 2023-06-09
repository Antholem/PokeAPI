import React, { Fragment } from 'react';
import useStore from '../Store';
import { Card, Stack, Typography, Grid, Box, LinearProgress, CardActionArea, Button, DialogTitle } from '@mui/material';
import { Dialog, DialogActions, DialogContent } from '@mui/material/';

function MoveModal(props) {
    const { mode, themeColor, powColor, ppColor, accColor } = useStore();
    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const style = {
        moveName: {
            textAlign: 'center'
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
        infoCardName: {
            py: 0.3,
            px: 0.3,
            textAlign: 'center'
        },
        infoCardValue: {
            py: 0.3,
            px: 0.3,
            textAlign: 'center'
        },
    }

    const stats = [
        { name: 'POW', current: props.movePower, total: 250, color: powColor },
        { name: 'PP', current: props.movePp, total: 40, color: ppColor },
        { name: 'ACC', current: props.moveAccuracy, total: 100, color: accColor },
    ]

    const info = [
        { name: 'Ailment', value: props.moveAilment },
        { name: 'Target', value: props.moveTarget },
        { name: 'Category', value: props.moveCategory },
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
                <DialogTitle>
                    #{props.moveId} {props.moveName}
                </DialogTitle>
                <DialogContent>
                    <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Typography sx={style.moveName} variant="body1" component="div">
                                {props.moveName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Stack direction='row' justifyContent="center" alignItems="center" spacing={1}>
                                <Box>
                                    {props.moveType}
                                </Box>
                                <Box>
                                    {props.moveDamageClass}
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card sx={style.infoCardName}>
                                <Typography variant='body2'>
                                    {props.moveEffect}
                                </Typography>
                            </Card>
                        </Grid>
                        {info.map((info) => (
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent='center' alignItems='flex-start' spacing={1}>
                                <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
                                    <Card sx={style.infoCardName}>
                                        <Typography variant='body2'>
                                            {info.name}
                                        </Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={8} sm={8} md={9} lg={9} xl={9}>
                                    <Card sx={style.infoCardValue}>
                                        <Typography variant='body2'>
                                            {info.value}
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
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

export default MoveModal;