import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../helper/api';
import SnackBar from '../../components/SnackBar';
import { useState } from 'react';
import { Alert, Collapse, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { userContext } from '../../App';

const theme = createTheme();

export default function Signin() {
    const { setUserinfo } = React.useContext(userContext);
    const navigate = useNavigate();

    const [severity, setSeverity] = useState('success');
    const [title, setTitle] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const obj = {
            email: data.get('email'),
            password: data.get('password'),
        };

        if (obj.email === '' || obj.password === '') {
            setSeverity('error')
            setAlertMessage('Error: Empty fields');
            setOpenAlert(true);
            return;
        }
        let resp;
        try {
            resp = await axios.post(`${api}/user/signin`, obj, {
                withCredentials: true,
            });
            setSeverity('success')
            setUserinfo(resp.data.data)
            setAlertMessage(resp.data.message);
            setOpenAlert(true);
            // setUserinfo(resp.data.data);
            navigate('/');
        } catch (error) {
            setSeverity('error')
            console.log('here',error)
            setAlertMessage(`Error ${error.response.status}: ${error.response.data.message}`);
            setOpenAlert(true);
        }
        
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <div className="w-full grid place-items-center p-2 gap-2">
            <div className="bg-[#1E2021] pb-8 rounded-lg ">
                <ThemeProvider theme={darkTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address or username"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Sign In
                                </Button>

                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item className="cursor-pointer">
                                        <Link href="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Collapse in={openAlert}>
                    <Alert
                        sx={{backgroundColor : '#90CAF9'}}
                        severity={severity}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleCloseAlert}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {alertMessage}
                    </Alert>
                </Collapse>
            </Snackbar>
        </div>
    );
}
