import axios from "axios";

const API_URL = "https://localhost:7167/api/Order";

export interface CreateOrderRequest {
    maKH: number;
    maPTTT: number;
    sdtGiao: string;
    diaChiGiao: string;

    items: {
        maCTSP: number;
        soLuong: number;
        donGia: number;
    }[];
}

export const createOrder = (
    data: CreateOrderRequest
) => {
    return axios.post(
        API_URL,
        data
    );
};