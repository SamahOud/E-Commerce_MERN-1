import { Box, Container, Typography } from "@mui/material"
import { useCart } from "../context/Cart/CartContext"

const CartPage = () => {
    const { cartItems } = useCart()

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
