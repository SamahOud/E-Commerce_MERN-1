import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { BASE_URI } from "../constants/baseUrl"
import { useAuth } from "../context/Auth/AuthContext"

const RegisterPage = () => {
    const [error, setError] = useState("")
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

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
    }

    return (
        <Container>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 4 }}>
                <Typography variant="h5">Register New Acount</Typography>

                <Box
                    sx={{
                        display: "flex", flexDirection: "column",
                        gap: 2, mt: 4, border: 1, borderColor: "#f5f5f5", p: 2
                    }}>
                    <TextField inputRef={firstNameRef} label="First Name" name="firstName" />
                    <TextField inputRef={lastNameRef} label="Last Name" name="lastName" />
                    <TextField inputRef={emailRef} label="Email" name="email" />
                    <TextField inputRef={passwordRef} type="password" label="Password" name="password" />

                    <Button onClick={onSubmit} variant="contained">Register</Button>
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                </Box>
            </Box>
        </Container>
    )
}

export default RegisterPage
