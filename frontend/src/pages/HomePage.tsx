import { Box, Container, Grid } from "@mui/material"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { Product } from "../types/Product"
import { BASE_URI } from "../constants/baseUrl"


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
        return <Box>Something went wronh, please try again!</Box>
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Grid container spacing={2}>
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
