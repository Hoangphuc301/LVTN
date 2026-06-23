import axios from "axios";
import type {
  LoginRequest,
  LoginResponse,
} from "./LoginTypes";

const API_URL = "https://localhost:7167/api/Login";

export const login = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/login`,
    data
  );

  return response.data;
};