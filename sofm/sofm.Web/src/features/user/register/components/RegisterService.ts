import axios from "axios";

const API_URL = "https://localhost:7167/api/Register";

export const registerAccount = async (data: {
  tenKH: string;
  email: string;
  matKhau: string;
  sdt: string;
  gioiTinh: boolean;
}) => {
  return axios.post(
    `${API_URL}/register`,
    data
  );
};

export const verifyOtp = async (
  email: string,
  otp: string
) => {
  return axios.post(
    `${API_URL}/verify-otp`,
    {
      email,
      otp,
    }
  );
};