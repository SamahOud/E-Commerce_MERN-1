import { Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, Stack, Link, TextField, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { BASE_URI } from "../constants/baseUrl"
import { useAuth } from "../context/Auth/AuthContext"
import { useNavigate } from "react-router-dom"
import { Facebook, Google, Apple, Visibility, VisibilityOff } from "@mui/icons-material"

const LoginPage = () => {
    const [error, setError] = useState("")
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const { login } = useAuth()

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    }

    const onSubmit = async () => {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        // Validate the form data
        if (!email || !password) {
            setError("Check submitted data.")
            return
        }

        // Make the call to API to create the user  
        const response = await fetch(`${BASE_URI}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
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

    const handleSignup: () => void = () => {
        navigate("/register")
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Container maxWidth="md" sx={{ display: 'flex', boxShadow: 3, borderRadius: 2 }}>
                <Grid container sx={{ paddingRight: 0, paddingLeft: 0 }}>
                    <Grid item xs={12} md={6} sx={{ padding: 4 }}>
                        <Box>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                E-Commerce for Computer Shops
                            </Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                                Welcome back! Please login to your account.
                            </Typography>

                            <TextField fullWidth inputRef={emailRef} label="Email" type="email" name="email" margin="normal" />

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

                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 1 }}>
                                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                                <Link href="#" underline="hover">
                                    Forgot Password?
                                </Link>
                            </Box>

                            <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
                                <Button onClick={onSubmit} variant="contained" color="primary" fullWidth>Login</Button>
                                <Button onClick={() => handleSignup()} variant="outlined" color="primary" fullWidth>Sign Up</Button>
                            </Stack>
                            {error && <Typography variant="body2" color="error">{error}</Typography>}

                            <Typography align="center" sx={{ marginTop: 2 }}>
                                Or login with
                            </Typography>

                            <Stack direction="row" justifyContent="center" spacing={2} sx={{ marginTop: 2 }}>
                                <IconButton color="primary"><Facebook /></IconButton>
                                <IconButton color="primary"><Google /></IconButton>
                                <IconButton color="primary"><Apple /></IconButton>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}
                        sx={{
                            backgroundImage: 'url("/assets/waterdesign.png")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>
            </Container>
        </Box>
    )
}

export default LoginPage
