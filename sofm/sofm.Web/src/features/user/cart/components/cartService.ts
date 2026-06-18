import axios from "axios";

const API = "https://localhost:7167/api/Cart";

export interface CartItem {
    maCtsp: number;
    maSp: number;
    tenSp: string;
    hinhAnh: string;
    mau: string;
    size: string;
    donGia: number;
    soLuong: number;
}

export interface GuestCartItem {
    maCtsp: number;
    maSp: number;
    tenSp: string;
    hinhAnh: string;
    mau: string;
    size: string;
    donGia: number;
    soLuong: number;
    createdAt?: string;
}

export interface Cart {
    maGh: number;
    items: CartItem[];
    tongTien: number;
}

export const getCart = (maKh: number) => {
    return axios.get<Cart>(`${API}/${maKh}`);
};

export const addToCart = (
    maKh: number,
    maCtsp: number,
    soLuong: number
) => {
    return axios.post(API, {
        maKh,
        maCtsp,
        soLuong,
    });
};

export const updateCartQuantity = (
    maKh: number,
    maCtsp: number,
    soLuong: number
) => {
    return axios.put(API, {
        maKh,
        maCtsp,
        soLuong,
    });
};

export const removeCartItem = (
    maKh: number,
    maCtsp: number
) => {
    return axios.delete(`${API}/${maKh}/${maCtsp}`);
};

export const clearCart = (maKh: number) => {
    return axios.delete(`${API}/${maKh}`);
};