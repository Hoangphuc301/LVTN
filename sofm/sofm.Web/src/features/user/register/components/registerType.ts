export interface RegisterRequest {
  tenKH: string;
  email: string;
  matKhau: string;
  sdt: string;
  gioiTinh: boolean;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}