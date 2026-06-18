import axios from "axios";
import type { Product } from "./productType";

const API_URL = "https://localhost:7167/api/Product";

export const getProducts = async () => {
    return axios.get<Product[]>(API_URL);
};

export const getProductById = async (id: number) => {
    return axios.get<Product>(`${API_URL}/${id}`);
};