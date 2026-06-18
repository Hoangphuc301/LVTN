import axios from "axios";

import type { Product } from "./productType";
import type { ProductFormModel } from "./ProductFormModel";

const API_URL = "https://localhost:7167/api/Product";

export const getProducts = async () => {
    return await axios.get<Product[]>(API_URL);
};

export const getProductById = async (id: number) => {
    return await axios.get<Product>(`${API_URL}/${id}`);
};

export const createProduct = async (
    data: ProductFormModel
) => {
    return await axios.post(API_URL, data);
};

export const updateProduct = async (
    id: number,
    data: ProductFormModel
) => {
    return await axios.put(
        `${API_URL}/${id}`,
        data
    );
};

export const deleteProduct = async (id: number) => {
    return await axios.delete(
        `${API_URL}/${id}`
    );
};