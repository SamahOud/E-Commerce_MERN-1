import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find()
}

export const seedInitalProducts = async () => {
    try {
        const products = [
            { title: "Laptop 1", image: "https://picsum.photos/200/300", price: 10, stock: 100 },
            { title: "Mouse 2", image: "https://picsum.photos/200/300", price: 20, stock: 80 },
            { title: "Keyboard 3", image: "https://picsum.photos/200/300", price: 15, stock: 50 },
            { title: "Laptop 4", image: "https://picsum.photos/200/300", price: 25, stock: 70 },
            { title: "Mouse 5", image: "https://picsum.photos/200/300", price: 5, stock: 90 },
            { title: "Keyboard 6", image: "https://picsum.photos/200/300", price: 30, stock: 60 },
            { title: "Laptop 7", image: "https://picsum.photos/200/300", price: 35, stock: 40 },
            { title: "Mouse 8", image: "https://picsum.photos/200/300", price: 40, stock: 30 },
            { title: "Keyboard 9", image: "https://picsum.photos/200/300", price: 45, stock: 20 },
            { title: "Keyboard 10", image: "https://picsum.photos/200/300", price: 50, stock: 10 },
        ]

        const existingProducts = await getAllProducts()
        if (existingProducts.length === 0) {
            return await productModel.insertMany(products)
        }
    } catch (err) {
        console.log("Connot seed database", err)
    }
}