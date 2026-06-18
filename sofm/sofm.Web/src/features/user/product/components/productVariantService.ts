import axios from "axios";
import type { ProductVariant } from "./productVariantType";

const API = "https://localhost:7167/api/ProductVariant";

export const getVariantsByProduct = (maSp: number) => {
    return axios.get<ProductVariant[]>(`${API}/product/${maSp}`);
};

export const getVariantById = (maCtsp: number) => {
    return axios.get<ProductVariant>(`${API}/${maCtsp}`);
};