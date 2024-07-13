import { Box, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { BASE_URI } from "../constants/baseUrl"
import { useAuth } from "../context/Auth/AuthContext"
import { useCart } from "../context/Cart/CartContext"


const CartPage = () => {
    const { token } = useAuth()
    const { cartItems, totalAmount } = useCart()
    const [error, setError] = useState('')

    // useEffect(() => {
    //     if (!token) {
    //         console.log(error);
    //         return
    //     }

    //     const fetchCart = async () => {
    //         const response = await fetch(`${BASE_URI}/cart`, {
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }

    //         })
    //         if (!response.ok) {
    //             setError("Failed to fetch user cart. Please try again")
    //             return
    //         }
    //         const data = await response.json()
    //         setCart(data)
    //     }
    //     fetchCart()
    // }, [token])

    if (error) {
        return <Box>Something went wrong, please try again!</Box>
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4">My Cart</Typography>
            {cartItems.map((item) => (
                <Box>{item.title}</Box>
            ))}
        </Container>
    )
}

export default CartPage
