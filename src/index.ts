import dotenv from "dotenv"

import express from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute"
import cartRoute from "./routes/cartRoute"
import { seedInitalProducts } from "./services/productService"

dotenv.config()
const app = express()
const port = 3001

app.use(express.json())

console.log(process.env.DATABASE_URL);

mongoose.connect(process.env.DATABASE_URL || "")
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("Failed to Connect!", err))

// Seed the products to database
seedInitalProducts()

app.use("/user", userRoute)
app.use("/product", productRoute)
app.use("/cart", cartRoute)

app.listen(port, () => {
    console.log(`Server is running at: http://localhost${port}`)
})