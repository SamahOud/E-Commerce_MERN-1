import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find()
}

export const seedInitalProducts = async () => {
    try {
        const products = [
            { title: "ASUS TUP", image: "https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120814.jpg", price: 15000, stock: 100 },
            { title: "HP Laptop", image: "https://www.hp.com/ca-en/shop/Html/Merch/Images/c06593122_1750x1285.jpg", price: 25000, stock: 80 },
            { title: "Lenovo LEGION", image: "https://m.media-amazon.com/images/I/612UDeR5tzL.jpg", price: 56000, stock: 90 },
            { title: "Logitech G502", image: "https://static.gamesmen.com.au/media/catalog/product/cache/57ddbad6affa8d28869fa47188b75842/l/o/logitech-g502-lightspeed-wireless-gaming-mouse-with-hero-16k-sensor-_1_.jpg", price: 30000, stock: 65 },
            { title: "Gamer Keyboard", image: "https://m.media-amazon.com/images/I/61hIk4gnQAL.jpg", price: 20000, stock: 45 },
            { title: "Dell Laptop", image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/page/franchise/latitude/compact-design/fy25/lati-compact-franchise-1920x1440-hero-perf.png", price: 40000, stock: 50 }
        ]

        const existingProducts = await getAllProducts()
        if (existingProducts.length === 0) {
            return await productModel.insertMany(products)
        }
    } catch (err) {
        console.log("Connot seed database", err)
    }
}