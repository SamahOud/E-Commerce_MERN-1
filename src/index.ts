import express from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute"
import { seedInitalProducts } from "./services/productService"

const app = express()
const port = 3001

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("Failed to Connect!", err))

// Seed the products to database
seedInitalProducts()

app.use("/user", userRoute)
app.use("/product", productRoute)

app.listen(port, () => {
    console.log(`Server is running at: http://localhost${port}`)
})