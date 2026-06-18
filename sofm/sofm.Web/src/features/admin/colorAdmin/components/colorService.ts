import axios from "axios";
import { type ColorDto } from "../components/ColorTypes";

const API_URL = "https://localhost:7167/api/Color";

export const colorService = {
    getAll: async () => {
        const res = await axios.get<ColorDto[]>(API_URL);
        return res.data;
    },

    getById: async (id: number) => {
        const res = await axios.get<ColorDto>(
            `${API_URL}/${id}`
        );

        return res.data;
    },

    create: async (data: ColorDto) => {
        const res = await axios.post<ColorDto>(
            API_URL,
            data
        );

        return res.data;
    },

    update: async (
        id: number,
        data: ColorDto
    ) => {
        const res = await axios.put<ColorDto>(
            `${API_URL}/${id}`,
            data
        );

        return res.data;
    },

    delete: async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
    },
};