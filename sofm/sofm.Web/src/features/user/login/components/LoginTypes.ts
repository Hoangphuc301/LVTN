export interface LoginRequest {
  email: string;
  matKhau: string;
}

export interface LoginResponse {
  token: string;
  maTK: number;
  email: string;
  tenNguoiDung: string;
  role: string;
}