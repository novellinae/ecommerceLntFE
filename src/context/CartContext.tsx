import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getItem, setItem } from '@/utils/localStorages';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string; 
    stock: number;
}
interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    updateQuantity: (id: number, quantity: number) => void;
    totalItems:() => number;
    totalPrice:() => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => getItem('cart') || []);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            const newItem = { ...product, quantity: 1 };
            return [...prevCart, newItem];
        });
        setItem('cart', cart);
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
        setItem('cart', cart);
    };

    const clearCart = () => {
        setCart([]);
        setItem('cart', []);
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
        setItem('cart', cart);
    };

    const totalItems = () => cart.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};