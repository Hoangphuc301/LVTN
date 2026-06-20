import axios from "axios";
import type { Order } from "./OrderTypes";

const API_URL = "https://localhost:7167/api/Order";

export const getOrders = async () => {
    return await axios.get<Order[]>(API_URL);
};

export const getOrderDetail = async (
    maDH: number
) => {
    return await axios.get(
        `${API_URL}/${maDH}`
    );
};

export const updateOrderStatus = async (
    maDH: number,
    trangThai: string,
    moTa?: string
) => {
    return await axios.put(
        `${API_URL}/status`,
        {
            maDH,
            trangThai,
            moTa,
        }
    );
};