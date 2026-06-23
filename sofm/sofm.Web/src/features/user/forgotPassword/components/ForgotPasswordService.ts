import axios from "axios";
import type {
  ForgotPasswordRequest,
  VerifyForgotOtpRequest,
  ResetPasswordRequest,
} from "./ForgotPasswordType";

const API_URL =
  "https://localhost:7167/api/ForgotPassword";

export const sendOtp = async (
  data: ForgotPasswordRequest
) => {
  const response = await axios.post(
    `${API_URL}/send-otp`,
    data
  );

  return response.data;
};

export const verifyOtp = async (
  data: VerifyForgotOtpRequest
) => {
  const response = await axios.post(
    `${API_URL}/verify-otp`,
    data
  );

  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordRequest
) => {
  const response = await axios.post(
    `${API_URL}/reset-password`,
    data
  );

  return response.data;
};