import { Box, Card, CardMedia, Container, Grid, Paper, Typography } from "@mui/material"
import { useAuth } from "../context/Auth/AuthContext"
import { useEffect } from "react"

interface OrderItem {
    productId: string;
    productImage: string;
    title: string;
    unitPrice: number;
    quantity: number;
}

const MyOrdersPage = () => {
    const { getMyOrders, myOrders } = useAuth()

    useEffect(() => {
        getMyOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderOrders = () => (
        <Grid item>
            <Paper sx={{ p: 3, }}>
                <Typography variant="h3">My Orders</Typography>

                {myOrders.map(({ address, orderItems, total }, index) => (
                    <Box key={index} sx={{ border: 1, borderColor: "gray", borderRadius: 2, p: 1, mb: 2 }}>
                        <Paper sx={{ p: 2, m: 1, display: "felx", flexDirection: "column" }}>
                            <Typography>Address: {address}</Typography>
                            <Typography>Total Items: {orderItems.length}</Typography>
                            <Typography>Total: {total}</Typography>
                        </Paper>

                        <Card
                            sx={{
                                margin: '0 auto',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                display: "flex",
                            }}
                        >
                            {orderItems.map((item: OrderItem) => (
                                <Paper sx={{ padding: 2, margin: 1, }}>
                                    <CardMedia
                                        sx={{ height: 200, minWidth: 235, backgroundSize: 'contain' }}
                                        image={item.productImage}
                                    />
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                                            <Typography variant="h6">{item.title}</Typography>
                                            <Typography variant="body1">
                                                ${item.unitPrice} x {item.quantity}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                                            <Typography variant="body1">
                                                Total: ${item.unitPrice * item.quantity}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            ))}
                        </Card>
                    </Box >
                ))}
            </Paper >
        </Grid >
    )

    return (
        <Container fixed
            sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1
            }}
        >
            {renderOrders()}
        </Container >
    )
}

export default MyOrdersPage
