import axios from "axios";
import type {
  AddressResponse,
  AddAddressRequest,
  UpdateAddressRequest,
  SetDefaultAddressRequest,
} from "./AddressType";

const ADDRESS_API = "https://localhost:7167/api/Address";

const getToken = () => localStorage.getItem("token");

const getAuthConfig = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getAddresses = async (maKH: number): Promise<AddressResponse[]> => {
  const response = await axios.get<AddressResponse[]>(`${ADDRESS_API}/${maKH}`, getAuthConfig());
  return response.data;
};

export const addAddress = async (data: AddAddressRequest) => {
  const response = await axios.post(ADDRESS_API, data, getAuthConfig());
  return response.data;
};

export const updateAddress = async (data: UpdateAddressRequest) => {
  const response = await axios.put(ADDRESS_API, data, getAuthConfig());
  return response.data;
};

export const deleteAddress = async (maDiaChi: number) => {
  const response = await axios.delete(`${ADDRESS_API}/${maDiaChi}`, getAuthConfig());
  return response.data;
};

export const setDefaultAddress = async (data: SetDefaultAddressRequest) => {
  const response = await axios.put(`${ADDRESS_API}/default`, data, getAuthConfig());
  return response.data;
};