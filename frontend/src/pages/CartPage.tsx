import { Box, ButtonGroup, Container, Grid, IconButton, Paper, Typography } from "@mui/material"
import { useCart } from "../context/Cart/CartContext"
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";

// extra-small screens (xs)
// small screens (sm)
// medium screens (md)

const CartPage = () => {
    const { cartItems, totalAmount, updateItemInCart, removeItemInCart, clearCart } = useCart()
    const navigate = useNavigate()

    const handleQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            return
        }
        updateItemInCart(productId, quantity)
    }

    const handleRemoveItem = (productId: string) => {
        removeItemInCart(productId)
    }

    const handleCheckout = () => {
        navigate("/checkout")
    }

    const handleReturnToShop = () => {
        navigate("/")
    }

    const renderCartItems = () => (
        <Container>
            <Typography variant="h4" gutterBottom>
                Your Shopping Cart
            </Typography>

            <Grid container spacing={3}>
                {/* Cart Items */}
                <Grid item xs={12} md={8}>
                    {cartItems.map((item) => (
                        <Paper key={item.productId} sx={{ marginBottom: 2, padding: 2 }}>
                            <Grid container spacing={2} alignItems="center">

                                {/* Product Image */}
                                <Grid item xs={12} sm={4} md={3}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: "100%", objectFit: "cover", borderRadius: "4px" }}
                                    />
                                </Grid>

                                {/* Product Details */}
                                <Grid item xs={12} sm={8} md={9}>
                                    <Typography variant="h6">{item.title}</Typography>

                                    <Box
                                        sx={{
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
                                            {/* Price */}
                                            <Typography variant="body1" color="textSecondary">
                                                ${item.unitPrice}
                                            </Typography>

                                            {/* Quantity Controls */}
                                            <ButtonGroup variant="contained" aria-label="quantity button group" sx={{ mt: { xs: 0, sm: 0 } }}>
                                                <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
                                                <Typography variant="body1" sx={{ display: 'flex', alignItems: "center", margin: "0 10px" }}>{item.quantity}</Typography>
                                                <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
                                            </ButtonGroup>
                                        </Box>

                                        <Box
                                            display="flex"
                                            flexDirection={{ xs: "row", sm: "column", md: "row" }}
                                            justifyContent={{ xs: "space-between", sm: "center" }}
                                            alignItems="center"
                                            gap="10px"
                                        >
                                            {/* Subtotal */}
                                            <Typography variant="body1" color="textSecondary" sx={{ mt: { xs: 2, sm: 0 } }}>
                                                Subtotal: ${item.unitPrice * item.quantity}
                                            </Typography>

                                            {/* Remove Item */}
                                            <IconButton color="primary" onClick={() => handleRemoveItem(item.productId)} sx={{ mt: { xs: 2, sm: 0 } }}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}

                    <Button variant="outlined" sx={{ marginTop: 2, marginBottom: 2, fontWeight: "bold" }} fullWidth onClick={() => handleReturnToShop()}>
                        Return To Shop
                    </Button>
                </Grid>

                {/* Cart Summary */}
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

                        <Button onClick={handleCheckout} variant="contained" color="primary" fullWidth>
                            Proceed to Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container >
    )

    return (
        <Container fixed sx={{ mt: 2 }}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ mb: 4 }}>
                <Typography variant="h4">My Cart</Typography>
                <Button variant="outlined" sx={{ marginTop: 2, fontWeight: "bold" }} onClick={() => clearCart()}>Clear Cart</Button>
            </Box>

            {cartItems.length ? (
                renderCartItems()
            ) : (
                <>
                    <Typography variant="h6" paddingBottom="15px">Cart is empty.Please start shopping and add items first</Typography>

                    <Grid item>
                        <Paper sx={{ padding: 3 }}>
                            <Typography variant="h6" gutterBottom>Cart Total</Typography>

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

                            <Button onClick={handleCheckout} variant="contained" color="primary" fullWidth>
                                Process to Checkout
                            </Button>
                        </Paper>
                    </Grid>
                    <Button variant="outlined" sx={{ marginTop: 2, fontWeight: "bold" }} fullWidth onClick={() => handleReturnToShop()}>
                        Return To Shop
                    </Button>
                </>

            )}
        </Container >
    )
}

export default CartPage
