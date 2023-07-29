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
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import api from '../../helper/api';

const theme = createTheme();

export default function Signup() {

    const navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const obj = {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            confirmpassword: data.get('confirmpassword')
        }
        if (obj.username === '' || obj.email === '' || obj.password === '' || obj.confirmpassword === '') {
            alert("Error Empty Field !")
            return
        }
        if (obj.password !== obj.confirmpassword) {
            alert("Password and ConfirmPassword doesn't match")
            return
        }
        
        
        try {
            let resp=await axios.post(`${api}/user/signup`, obj);
            resp = resp.data;
            console.log(resp);
            if (resp.successfull) {
                alert("user created !")
                navigate('/signin')
            }
        } catch (error) {
            alert(`Error ${error.response.data.message}`)
        }
    };

    return (
        <div className='grid place-items-center p-2'>
            <div className='bg-[#1E2021] rounded-lg'>
                <ThemeProvider theme={darkTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            name='username'
                                            label="User Name"
                                            type="name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            type='email'
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="confirmpassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmpassword"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="Accept cookies"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => handleSubmit}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/signin" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        {/* <Copyright sx={{ mt: 5 }} /> */}
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    );
}