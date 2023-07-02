import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ListItemButton } from '@mui/material';
import useStore from '../Store';
import { useNavigate } from 'react-router-dom';

function CloseModal(props) {
    // useNavigate for routing
    const navigate = useNavigate();
    // Accessing from the useStore hook
    const { themeColor } = useStore();
    // State variables
    const [open, setOpen] = React.useState(false);

    // Open the modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close the modal
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <ListItemButton onClick={handleClickOpen}>
                {/* Display the children components */}
                {props.children}
            </ListItemButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>
                    Exit Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Are you sure you want to exit the application?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color={themeColor}>
                        Cancel
                    </Button>
                    {/* Redirect to the landing page */}
                    <Button onClick={() => navigate('/')} color={themeColor} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default CloseModal;