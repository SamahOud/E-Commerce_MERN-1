import express from "express"
import { getActiveCartForUser } from "../services/cartService"
import validateJWT, { ExtendRequest } from "../middlewares/validateJWT"

const router = express.Router()

router.get('/', validateJWT, async (req: ExtendRequest, res) => {
    // TODO: get the userId from the jwt, after validating from middleware
    const userId = req.user._id
    
    // Get active cart for user
    const cart = await getActiveCartForUser({ userId })
    res.status(200).send(cart)
})

export default router