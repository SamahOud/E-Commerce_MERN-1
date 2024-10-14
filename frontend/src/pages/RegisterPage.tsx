import { Box, Button, Container, Grid, TextField, Typography, IconButton, Stack } from "@mui/material"
import { useRef, useState } from "react"
import { BASE_URI } from "../constants/baseUrl"
import { useAuth } from "../context/Auth/AuthContext"
import { useNavigate } from "react-router-dom"
import { Facebook, Google, Apple, Visibility, VisibilityOff } from '@mui/icons-material'

const RegisterPage = () => {
    const [error, setError] = useState("")
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    }

    const navigate = useNavigate()

    const { login } = useAuth()

    const onSubmit = async () => {
        const firstName = firstNameRef.current?.value
        const lastName = lastNameRef.current?.value
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        if (!firstName || !lastName || !email || !password) {
            setError("All fields are required!")
            return
        }

        // Make the call to API to create the user  
        const response = await fetch(`${BASE_URI}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        })
        if (!response.ok) {
            setError("Unable to register user, please try different credintials!")
            return
        }
        const token = await response.json()
        if (!token) {
            setError("Incorrect token")
            return
        }
        login(email, token)
        navigate("/")
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <Container maxWidth="md" sx={{ display: 'flex', paddingRight: 0, paddingLeft: 0, boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                <Grid container sx={{ paddingRight: 0, paddingLeft: 0 }}>
                    <Grid item xs={12} md={6} sx={{ padding: 4, }}>
                        <Box>
                            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                                Sign Up to Tech Hub
                            </Typography>
                            <TextField inputRef={firstNameRef} fullWidth label="First Name" name="firstName" margin="normal" />
                            <TextField inputRef={lastNameRef} fullWidth label="Last Name" name="lastName" margin="normal" />
                            <TextField inputRef={emailRef} fullWidth label="Email" name="email" margin="normal" />

                            <TextField fullWidth inputRef={passwordRef} label="Password" name="password"
                                type={showPassword ? 'text' : 'password'}
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={togglePasswordVisibility}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />

                            <Button onClick={onSubmit} fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
                                Sign up
                            </Button>
                            {error && <Typography variant="body2" color="error">{error}</Typography>}

                            <Typography align="center" sx={{ marginTop: 2 }}>
                                or sign up with
                            </Typography>
                            <Stack direction="row" justifyContent="center" spacing={2} sx={{ marginTop: 2 }}>
                                <IconButton color="primary"><Facebook /></IconButton>
                                <IconButton color="primary"><Google /></IconButton>
                                <IconButton color="primary"><Apple /></IconButton>
                            </Stack>

                            <Typography align="center" sx={{ marginTop: 4 }}>
                                Have an account? <a href="/login">Sign In</a>
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}
                        sx={{
                            backgroundImage: 'url("/assets/waterdesign.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                </Grid>
            </Container>
        </Box>
    )
}

export default RegisterPage
