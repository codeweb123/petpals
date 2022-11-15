import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
    }

const removeCartItem = (cartItems, cartItemToRemove) => {
        const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

        if(existingCartItem.quantity === 1) {
            return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
        }

        return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem )
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    clearItemFromCart: () => {},
    carttotal: 0
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'ADD_TO_CART':
            return {
                ...state, cartItems: addCartItem(state.cartItems, payload)
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }
}
const AddToCartAction = (itemToAdd) => {
    dispatchEvent({type: 'ADD_TO_CART', payload: itemToAdd})
}

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0); setCartCount(newCartCount)}, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0); setCartTotal(newCartTotal)}, [cartItems])    

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, cartItems, cartCount, cartTotal, clearItemFromCart }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

