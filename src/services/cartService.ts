import { cartModel } from "../models/cartModel";
import { productModel } from "../models/productModel";

// ******************** Create Cart For User ********************
interface CreateCartForUser {
    userId: string;
}
const createCartForUser = async ({ userId }: CreateCartForUser) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 })
    await cart.save()
    return cart
}

// ******************** Get Active Cart For User ********************
interface GetActiveCartForUser {
    userId: string
}

export const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "active" })

    if (!cart) {
        cart = await createCartForUser({ userId })
    }
    return cart
}

// ******************** Add Item To Cart ********************
interface AddItemToCart {
    userId: string;
    productId: any;
    quantity: number;
}

export const addItemToCart = async ({ userId, productId, quantity }: AddItemToCart) => {
    const cart = await getActiveCartForUser({ userId })
    // Does the item exist in the cart ?
    const existInCart = cart.items.find((p) => p.product.toString() === productId)
    if (existInCart) {
        return { data: "Item already exists in cart!", statusCode: 400 }
    }

    // Fetch the product
    const product = await productModel.findById(productId)
    if (!product) {
        return { data: "Product not found!", statusCode: 404 }
    }

    if (product.stock < quantity) {
        return { data: "Low stock for item", statusCode: 400 }
    }

    cart.items.push({
        product: productId,
        unitPrice: product.price,
        quantity: quantity
    })

    // Update the totalAmount for the cart
    cart.totalAmount += product.price * quantity

    const updatedCart = await cart.save()
    return { data: updatedCart, statusCode: 200 }
}