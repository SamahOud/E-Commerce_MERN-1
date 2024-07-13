import { cartModel, ICart, ICartItem } from "../models/cartModel";
import { IOrder, IOrderItem, orderModel } from "../models/orderModel";
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
    userId: string;
    populateProduct?: boolean;
}

export const getActiveCartForUser = async ({ userId, populateProduct }: GetActiveCartForUser) => {
    let cart
    if (populateProduct) {
        cart = await cartModel.findOne({ userId, status: "active" }).populate("items.product")
    } else {
        cart = await cartModel.findOne({ userId, status: "active" })
    }

    if (!cart) {
        cart = await createCartForUser({ userId })
    }
    return cart
}

// ******************** Clear Cart ********************
interface ClearCart {
    userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
    const cart = await getActiveCartForUser({ userId })
    cart.items = []
    cart.totalAmount = 0
    await cart.save()
    return { data: await getActiveCartForUser({ userId, populateProduct: true }), statusCode: 200 }
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
    await cart.save()
    return { data: await getActiveCartForUser({ userId, populateProduct: true }), statusCode: 200 }
}

// ******************** Update Item In Cart ********************
interface UpdateItemInCart {
    userId: string;
    productId: any;
    quantity: number;
}

export const updateItemInCart = async ({ userId, productId, quantity }: UpdateItemInCart) => {
    const cart = await getActiveCartForUser({ userId })

    // Does the item exist in the cart ?
    const existInCart = cart.items.find((p) => p.product.toString() === productId)
    if (!existInCart) {
        return { data: "Item does not exist in card!", statusCode: 400 }
    }

    // Fetch the product
    const product = await productModel.findById(productId)
    if (!product) {
        return { data: "Product not found!", statusCode: 404 }
    }

    if (product.stock < quantity) {
        return { data: "Low stock for item", statusCode: 400 }
    }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId)

    // Calculate totla amount for the cart
    let total = calculateCartTotalItems({ cartItems: otherCartItems })

    existInCart.quantity = quantity
    total += existInCart.quantity * existInCart.unitPrice

    cart.totalAmount = total
    await cart.save()
    return { data: await getActiveCartForUser({ userId, populateProduct: true }), statusCode: 200 }
}

// ******************** Delete Item In Cart ********************
interface DeleteItemInCart {
    userId: string;
    productId: any;
}

export const deleteItemInCart = async ({ userId, productId }: DeleteItemInCart) => {
    const cart = await getActiveCartForUser({ userId })

    // Does the item exist in the cart ?
    const existInCart = cart.items.find((p) => p.product.toString() === productId)
    if (!existInCart) {
        return { data: "Item does not exist in card!", statusCode: 400 }
    }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId)

    // Calculate totla amount for the cart
    const total = calculateCartTotalItems({ cartItems: otherCartItems })

    cart.items = otherCartItems
    cart.totalAmount = total
    await cart.save()
    return { data: await getActiveCartForUser({ userId, populateProduct: true }), statusCode: 200 }
}

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
    // Calculate totla amount for the cart
    const total = cartItems.reduce((sum, product) => {
        return sum + (product.quantity * product.unitPrice)
    }, 0)
    return total
}

// ******************** Checkout ********************
interface Checkout {
    userId: string;
    address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {
    if (!address) {
        return { data: "Please add the address", statusCode: 400 }
    }

    const cart = await getActiveCartForUser({ userId })
    const orderItems: IOrderItem[] = []

    // Loop cartItems and create orderItems
    for (const item of cart.items) {
        const product = await productModel.findById(item.product)

        if (!product) {
            return { data: "Product not found", statusCode: 400 }
        }

        const orderItem: IOrderItem = {
            productTitle: product.title,
            productImage: product.image,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
        }
        orderItems.push(orderItem)
    }
    const order = await orderModel.create({
        orderItems,
        total: cart.totalAmount,
        address,
        userId
    })
    await order.save()

    // Update the cart status to be completed
    cart.status = "completed"
    await cart.save()
    return { data: order, statusCode: 200 }
}