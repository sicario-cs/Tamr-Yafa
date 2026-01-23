import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

const STORAGE_KEY = 'tamrYafaCart';

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                return saved ? JSON.parse(saved) : [];
            } catch {
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        }
    }, [cart]);

    const getItemKey = (id, variant) => {
        return variant ? `${id}-${JSON.stringify(variant)}` : id;
    };

    const addToCart = (item) => {
        const { id, name, price, image, variant } = item;
        setCart((prev) => {
            const key = getItemKey(id, variant);
            const existing = prev.find((i) => getItemKey(i.id, i.variant) === key);
            if (existing) {
                return prev.map((i) =>
                    getItemKey(i.id, i.variant) === key
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { id, name, price, image, variant, quantity: 1 }];
        });
    };

    const removeFromCart = (id, variant) => {
        const key = getItemKey(id, variant);
        setCart((prev) => prev.filter((i) => getItemKey(i.id, i.variant) !== key));
    };

    const updateQuantity = (id, quantity, variant) => {
        const key = getItemKey(id, variant);
        if (quantity <= 0) {
            removeFromCart(id, variant);
            return;
        }
        setCart((prev) =>
            prev.map((i) =>
                getItemKey(i.id, i.variant) === key ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () =>
        cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const getCartCount = () =>
        cart.reduce((sum, i) => sum + i.quantity, 0);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return ctx;
}
