import { Box, Container, Grid, Paper, TextField, Typography } from "@mui/material"
import { useCart } from "../context/Cart/CartContext"
import Button from '@mui/material/Button';
import { useRef } from "react";
import { BASE_URI } from "../constants/baseUrl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const CheckoutPage = () => {
    const { cartItems, totalAmount } = useCart()
    const { token } = useAuth()

    const addressRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    const handleConfirmOrder = async () => {
        const address = addressRef.current?.value

        if (!address) {
            return
        }

        const response = await fetch(`${BASE_URI}/cart/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ address })
        })
        if (!response.ok) {
            return
        }
        navigate("/order-success")
    }

    const renderCartItems = () => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                {cartItems.map((item) => (
                    <Paper key={item.productId} sx={{ marginBottom: 2, padding: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={4} md={3}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: "100%", objectFit: "cover", borderRadius: "4px" }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={8} md={9}>
                                <Typography variant="h6">{item.title}</Typography>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    justifyContent: "space-between",
                                }}

                                >
                                    <Box
                                        display="flex"
                                        flexDirection={{ xs: "row", sm: "column", md: "row" }}
                                        justifyContent={{ xs: "space-between", sm: "center" }}
                                        alignItems="center"
                                        gap="10px"
                                    >
                                        <Typography variant="body1" color="textSecondary">
                                            ${item.unitPrice * item.quantity}
                                        </Typography>
                                    </Box>

                                    <Box display="flex"
                                        flexDirection={{ xs: "row", sm: "column", md: "row" }}
                                        justifyContent={{ xs: "space-between", sm: "center" }}
                                        alignItems="center"
                                        gap="10px"
                                    >
                                        <Typography variant="body1" color="textSecondary" sx={{ mt: { xs: 2, sm: 0 } }}>
                                            <Typography>{item.quantity} x {item.unitPrice}</Typography>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Grid>

            <Grid item xs={12} md={4}>
                <Paper sx={{ padding: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>

                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography>Subtotal:</Typography>
                        <Typography>${totalAmount.toFixed(2)}</Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography>Shipping:</Typography>
                        <Typography>Free</Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" mb={2} fontWeight="bold">
                        <Typography>Total:</Typography>
                        <Typography>${totalAmount.toFixed(2)}</Typography>
                    </Box>

                    <Button onClick={handleConfirmOrder} variant="contained" color="primary" fullWidth>
                        Pay Now
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    )

    return (
        <Container fixed sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ mb: 4 }}>
                <Typography variant="h4">Checkout</Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item margin="6px" alignItems="center" justifyContent="center">
                    <TextField inputRef={addressRef} label="Delivery Address" name="address"
                        variant="standard"
                        color="warning"
                        focused
                    />
                </Grid>
            </Grid>

            {renderCartItems()}
        </Container >
    )
}

export default CheckoutPage
