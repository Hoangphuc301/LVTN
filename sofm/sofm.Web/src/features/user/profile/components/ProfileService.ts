import axios from "axios";
import type { ProfileResponse, UpdateProfileRequest } from "./ProfileType";

const PROFILE_API = "https://localhost:7167/api/Profile";

const getToken = () => localStorage.getItem("token");

export const getProfile = async (maTK: number): Promise<ProfileResponse> => {
  const response = await axios.get<ProfileResponse>(`${PROFILE_API}/${maTK}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const updateProfile = async (data: UpdateProfileRequest) => {
  const response = await axios.put(PROFILE_API, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};