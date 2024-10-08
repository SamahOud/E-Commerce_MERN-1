import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext"
import { CartItem } from "../../types/CartItem";
import { BASE_URI } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";
import { Typography } from "@mui/material";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const { token } = useAuth()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!token) {
            return
        }

        const fetchCart = async () => {
            const response = await fetch(`${BASE_URI}/cart`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }

            })
            if (!response.ok) {
                setError("Failed to fetch user cart. Please try again")
                return
            }
            const cart = await response.json()
            const cartItemsMapped = cart.items.map(({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                product, quantity, unitPrice }: { product: any; quantity: number; unitPrice: number }) => ({
                    productId: product._id,
                    title: product.title,
                    image: product.image,
                    quantity,
                    unitPrice
                }))

            setCartItems(cartItemsMapped)
            setTotalAmount(cart.totalAmount)
        }
        fetchCart()
    }, [token])

    const addItemToCart = async (productId: string) => {
        try {
            const response = await fetch(`${BASE_URI}/cart/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    quantity: 1
                })
            })
            if (!response.ok) {
                setError('Failed to add to cart')
            }

            const cart = await response.json()
            if (!cart) {
                setError('Failed to parse cart data')
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemsMapped = cart.items.map(({ product, quantity }: { product: any; quantity: number }) => ({
                productId: product._id,
                title: product.title,
                image: product.image,
                quantity,
                unitPrice: product.unitPrice
            }))

            setCartItems([...cartItemsMapped])
            setTotalAmount(cart.totalAmount)
        } catch (err) {
            console.log(err);
        }
    }

    const updateItemInCart = async (productId: string, quantity: number) => {
        try {
            const response = await fetch(`${BASE_URI}/cart/items`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    quantity
                })
            })
            if (!response.ok) {
                setError('Failed to update cart')
            }

            const cart = await response.json()
            if (!cart) {
                setError('Failed to parse cart data')
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemsMapped = cart.items.map(({ product, quantity, unitPrice }: { product: any; quantity: number; unitPrice: number }) => ({
                productId: product._id,
                title: product.title,
                image: product.image,
                quantity,
                unitPrice
            }))

            setCartItems([...cartItemsMapped])
            setTotalAmount(cart.totalAmount)
        } catch (err) {
            console.log(err);
        }
    }

    const removeItemInCart = async (productId: string) => {
        try {
            const response = await fetch(`${BASE_URI}/cart/items/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!response.ok) {
                setError('Failed to delete cart')
            }

            const cart = await response.json()
            if (!cart) {
                setError('Failed to parse cart data')
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemsMapped = cart.items.map(({ product, quantity, unitPrice }: { product: any; quantity: number; unitPrice: number }) => ({
                productId: product._id,
                title: product.title,
                image: product.image,
                quantity,
                unitPrice
            }))

            setCartItems([...cartItemsMapped])
            setTotalAmount(cart.totalAmount)
        } catch (err) {
            console.log(err);
        }
    }

    const clearCart = async () => {
        try {
            const response = await fetch(`${BASE_URI}/cart`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!response.ok) {
                setError('Failed to empty cart')
            }

            const cart = await response.json()
            if (!cart) {
                setError('Failed to parse cart data')
            }

            setCartItems([])
            setTotalAmount(0)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {error && <Typography style={{ color: 'red' }}>{error}</Typography>}
            <CartContext.Provider
                value={{
                    cartItems,
                    totalAmount,
                    addItemToCart,
                    updateItemInCart,
                    removeItemInCart,
                    clearCart
                }}
            >
                {children}
            </CartContext.Provider>
        </>
    )
}

export default CartProvider