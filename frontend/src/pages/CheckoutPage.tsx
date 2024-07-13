import { Box, Container, TextField, Typography } from "@mui/material"
import { useCart } from "../context/Cart/CartContext"
import Button from '@mui/material/Button';
import { useRef } from "react";

const CheckoutPage = () => {
    const { cartItems, totalAmount } = useCart()
    const addressRef = useRef<HTMLInputElement>(null)

    const renderCartItems = () => (
        <Box display="flex" flexDirection="column" gap={2}
            sx={{ border: 1, borderColor: "#f2f2f2", borderRadius: 3, p: 1 }}
        >
            {cartItems.map((item) => (
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Box display="flex" flexDirection="row" alignItems="center" gap={1} width="100%">
                        <img src={item.image} width={50} style={{ borderRadius: 3 }} />
                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography>{item.quantity} x {item.unitPrice}</Typography>
                        </Box>
                    </Box>
                </Box>
            ))}

            <Box>
                <Typography variant="body2" sx={{ textAlign: "right"}}>Totla Amount: {totalAmount.toFixed(2)} $</Typography>
            </Box>
        </Box>
    )

    return (
        <Container fixed sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ mb: 4 }}>
                <Typography variant="h4">Checkout</Typography>
            </Box>
            <TextField inputRef={addressRef} label="Delivery Address" name="address" fullWidth />
            {renderCartItems()}
            <Button variant="contained" fullWidth>Pay Now</Button>
        </Container >
    )
}

export default CheckoutPage
