import axios from "axios";
import { type CategoryDto } from "./CategoryTypes";

const API = "https://localhost:7167/api/Category";

export const categoryService = {
    getParents: async () => {
        const res = await axios.get<CategoryDto[]>(`${API}/parents`);
        return res.data;
    },

    getChildren: async (parentId: number) => {
        const res = await axios.get<CategoryDto[]>(
            `${API}/${parentId}/children`
        );

        console.log("API RESPONSE:", res.data);

        return Array.isArray(res.data) ? res.data : [];
    },

    delete: async (id: number) => {
        await axios.delete(`${API}/${id}`);
    },

    getById: async (id: number) => {
        const res = await axios.get(`${API}/${id}`);
        return res.data;
    },

    create: async (data: CategoryDto) => {
        return await axios.post(`${API}`, data);
    },
    
    update: async (id: number, data: CategoryDto) => {
        return await axios.put(`${API}/${id}`, data);
    }
};