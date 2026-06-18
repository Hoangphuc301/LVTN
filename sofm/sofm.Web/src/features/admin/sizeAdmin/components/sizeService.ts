import axios from 'axios';
import { type SizeDto } from "./SizeTypes";

const API_URL = 'https://localhost:7167/api/Size';

export const getAllSizes = () => axios.get<SizeDto[]>(API_URL);
export const getSizeById = (id: number) => axios.get<SizeDto>(`${API_URL}/${id}`);
export const createSize = (data: SizeDto) => axios.post(API_URL, data);
export const updateSize = (id: number, data: SizeDto) => axios.put(`${API_URL}/${id}`, data);
export const deleteSize = (id: number) => axios.delete(`${API_URL}/${id}`);