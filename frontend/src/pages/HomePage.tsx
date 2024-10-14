import { Box, Container, Grid } from "@mui/material"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { Product } from "../types/Product"
import { BASE_URI } from "../constants/baseUrl"
import ErrorPage from "./ErrorPage"

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URI}/product`)
                const data = await response.json()
                setProducts(data)
            } catch (err) {
                setError(true)
            }
        }
        fetchData()
    }, [])

    if (error) {
        return (
            <Container sx={{ mt: 2 }}>
                <ErrorPage />
                <Box sx={{ display: "flex", justifyContent: "center", fontWeight: "bold", fontSize: 23 }}>
                    Something went wrong, please try again!
                </Box>
            </Container>
        )
    }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {products.map((p) => (
                    <Grid item md={4}>
                        <ProductCard {...p} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default HomePage
