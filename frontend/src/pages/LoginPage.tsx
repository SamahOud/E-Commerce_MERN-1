import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { BASE_URI } from "../constants/baseUrl"
import { useAuth } from "../context/Auth/AuthContext"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const [error, setError] = useState("")
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const { login } = useAuth()

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

    return (
        <Container>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 4 }}>
                <Typography variant="h5">Login to Your Acount</Typography>

                <Box
                    sx={{
                        display: "flex", flexDirection: "column",
                        gap: 2, mt: 4, border: 1, borderColor: "#f5f5f5", p: 2
                    }}>
                    <TextField inputRef={emailRef} label="Email" name="email" />
                    <TextField inputRef={passwordRef} type="password" label="Password" name="password" />

                    <Button onClick={onSubmit} variant="contained">Login</Button>
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                </Box>
            </Box>
        </Container>
    )
}

export default LoginPage
