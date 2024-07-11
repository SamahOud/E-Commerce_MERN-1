import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find()
}

export const seedInitalProducts = async () => {
    try {
        const products = [
            { title: "Laptop 1", image: "https://picsum.photos/200/300", price: 15000, stock: 100 },
            { title: "Mouse 2", image: "https://picsum.photos/200/300", price: 25000, stock: 80 },
            { title: "Keyboard 3", image: "https://picsum.photos/200/300", price: 40000, stock: 50 }
        ]

        const existingProducts = await getAllProducts()
        if (existingProducts.length === 0) {
            return await productModel.insertMany(products)
        }
    } catch (err) {
        console.log("Connot seed database", err)
    }
}