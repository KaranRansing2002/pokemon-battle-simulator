import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({ title, severity }) => {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" size='small' onClick={handleClick}>
                save
            </Button>
            {title !== '' &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {title}
                    </Alert>
                </Snackbar>
            }
        </div>
    )
}

export default SnackBar
