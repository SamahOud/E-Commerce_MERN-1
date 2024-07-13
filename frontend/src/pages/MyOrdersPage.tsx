import { Box, Container, Typography } from "@mui/material"
import { useAuth } from "../context/Auth/AuthContext"
import { useEffect } from "react"

const MyOrdersPage = () => {
    const { getMyOrders, myOrders } = useAuth()

    useEffect(() => {
        getMyOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <Typography variant="h3">My Orders</Typography>
            {myOrders.map(({ address, orderItems, total }) => (
                <Box sx={{ border: 1, borderColor: " gray", borderRadius: 2, p: 1 }}>
                    <Typography>Address: {address}</Typography>
                    <Typography>Items: {orderItems.length}</Typography>
                    <Typography>Total: {total}</Typography>
                </Box>
            ))}
        </Container >
    )
}

export default MyOrdersPage
