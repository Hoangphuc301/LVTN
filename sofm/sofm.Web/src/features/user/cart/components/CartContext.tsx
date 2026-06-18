import { createContext, useEffect, useState, type ReactNode } from "react";
import { type Cart, type GuestCartItem } from "./cartService";
export interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    loadCart: () => Promise<void>;
    addToCart: (item: GuestCartItem) => Promise<void>;
    updateQuantity: (maCtsp: number, soLuong: number) => Promise<void>;
    removeItem: (maCtsp: number) => Promise<void>;
    clearAll: () => Promise<void>;
}
/* eslint-disable-next-line react-refresh/only-export-components */
export const CartContext = createContext<CartContextType | undefined>(undefined);
interface CartProviderProps {
    children: ReactNode;
}
export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const loadCart = async () => {
        try {
            setLoading(true);
            const guestCart: GuestCartItem[] = JSON.parse(localStorage.getItem("guest_cart") || "[]");
            const validItems = guestCart.filter((item) => {
                if (!item.createdAt) return true;
                const createdTime = new Date(item.createdAt).getTime();
                return Date.now() - createdTime < 30 * 60 * 1000;
            });
            localStorage.setItem("guest_cart", JSON.stringify(validItems));
            const tongTien = validItems.reduce((sum, item) => sum + item.donGia * item.soLuong, 0);
            setCart({
                maGh: 0,
                items: validItems,
                tongTien,
            });
        } catch (error) {
            console.error("Load cart error:", error);
        } finally {
            setLoading(false);
        }
    };
    const addToCart = async (item: GuestCartItem) => {
        const guestCart: GuestCartItem[] = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        const existing = guestCart.find((x) => x.maCtsp === item.maCtsp);
        if (existing) {
            existing.soLuong += item.soLuong;
        } else {
            guestCart.push({
                ...item,
                createdAt: new Date().toISOString(),
            });
        }
        localStorage.setItem("guest_cart", JSON.stringify(guestCart));
        await loadCart();
    };
    const updateQuantity = async (maCtsp: number, soLuong: number) => {
        const guestCart: GuestCartItem[] = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        const item = guestCart.find((x) => x.maCtsp === maCtsp);
        if (!item) return;
        if (soLuong <= 0) {
            const newCart = guestCart.filter((x) => x.maCtsp !== maCtsp);
            localStorage.setItem("guest_cart", JSON.stringify(newCart));
        } else {
            item.soLuong = soLuong;
            localStorage.setItem("guest_cart", JSON.stringify(guestCart));
        }
        await loadCart();
    };
    const removeItem = async (maCtsp: number) => {
        const guestCart: GuestCartItem[] = JSON.parse(localStorage.getItem("guest_cart") || "[]");
        const newCart = guestCart.filter((x) => x.maCtsp !== maCtsp);
        localStorage.setItem("guest_cart", JSON.stringify(newCart));
        await loadCart();
    };
    const clearAll = async () => {
        localStorage.removeItem("guest_cart");
        await loadCart();
    };
    useEffect(() => {
        const init = async () => {
            await loadCart();
        };
        void init();
    }, []);
    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                loadCart,
                addToCart,
                updateQuantity,
                removeItem,
                clearAll,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};