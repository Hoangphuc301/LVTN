export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyForgotOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}