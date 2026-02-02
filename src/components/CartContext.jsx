import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

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

    const [toast, setToast] = useState({ open: false, name: '' });
    const toastTimerRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        }
    }, [cart]);

    useEffect(() => {
        return () => {
            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
            }
        };
    }, []);

    const getItemKey = (id, variant) => {
        return variant ? `${id}-${JSON.stringify(variant)}` : id;
    };

    const showAddedToast = (name) => {
        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
        }
        setToast({ open: true, name });
        toastTimerRef.current = setTimeout(() => {
            setToast((t) => ({ ...t, open: false }));
        }, 1800);
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
        showAddedToast(name);
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
            {/* Add-to-cart toast */}
            <div className="pointer-events-none fixed bottom-4 right-4 z-100">
                <div
                    className={`pointer-events-auto min-w-[260px] max-w-[320px] rounded-lg border border-[#7A4B2A]/20 bg-white shadow-lg transition-all duration-200 ${
                        toast.open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                    role="status"
                    aria-live="polite"
                >
                    <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="font-medium text-[#5A2D0C]">Added to cart</p>
                                {toast.name ? (
                                    <p className="text-sm text-[#7A4B2A]/70 truncate">{toast.name}</p>
                                ) : null}
                            </div>
                            <button
                                type="button"
                                onClick={() => setToast((t) => ({ ...t, open: false }))}
                                className="text-[#7A4B2A]/60 hover:text-[#5A2D0C] transition-colors"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mt-3">
                            <a
                                href="/cart"
                                className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white text-sm font-medium transition-colors"
                            >
                                View cart
                            </a>
                        </div>
                    </div>
                </div>
            </div>
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
