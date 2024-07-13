import express from "express"
import { addItemToCart, checkout, clearCart, deleteItemInCart, getActiveCartForUser, updateItemInCart } from "../services/cartService"
import validateJWT from "../middlewares/validateJWT"
import { ExtendRequest } from "../types/extendedRequest"

const router = express.Router()

router.get('/', validateJWT, async (req: ExtendRequest, res) => {
    try {
        // TODO: get the userId from the jwt, after validating from middleware
        const userId = req?.user?._id
        // Get active cart for user
        const cart = await getActiveCartForUser({ userId, populateProduct: true })
        res.status(200).send(cart)
    } catch (err) {
        res.status(500).send("Something went wrong!")
    }
})

router.delete('/', validateJWT, async (req: ExtendRequest, res) => {
    try {
        // TODO: get the userId from the jwt, after validating from middleware
        const userId = req?.user?._id
        // Get active cart for user
        const cart = await getActiveCartForUser({ userId })
        res.status(200).send(cart)
    } catch (err) {
        res.status(500).send("Something went wrong!")
    }
})

router.post('/items', validateJWT, async (req: ExtendRequest, res) => {
    try {
        // Get the userId from the jwt, after validating from middleware
        const userId = req?.user?._id
        const { productId, quantity } = req.body
        const response = await addItemToCart({ userId, productId, quantity })
        res.status(response.statusCode).send(response.data)
    } catch (err) {
        res.status(500).send("Something went wrong!")
    }
})

router.put('/items', validateJWT, async (req: ExtendRequest, res) => {
    try {
        // Get the userId from the jwt, after validating from middleware
        const userId = req?.user?._id
        const { productId, quantity } = req.body
        const response = await updateItemInCart({ userId, productId, quantity })
        res.status(response.statusCode).send(response.data)
    } catch (err) {
        res.status(500).send("Something went wrong!")
    }
})

router.delete('/items/:productId', validateJWT, async (req: ExtendRequest, res) => {
    try {
        // Get the userId from the jwt, after validating from middleware
        const userId = req?.user?._id
        const { productId } = req.params
        const response = await deleteItemInCart({ userId, productId })
        res.status(response.statusCode).send(response.data)
    } catch (err) {
        res.status(500).send("Something went wrong!")
    }
})

router.post('/checkout', validateJWT, async (req: ExtendRequest, res) => {
    try {
        // Get the userId from the jwt, after validating from middleware
        const userId = req?.user?._id
        const { address } = req.body
        const response = await checkout({ userId, address })
        res.status(response.statusCode).send(response.data)
    } catch (err) {
        res.status(500).send("Something went wrong!")
    }
})

export default router