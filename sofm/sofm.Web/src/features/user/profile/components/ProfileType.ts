import type {
  AddressResponse,
} from "./AddressType";

export interface ProfileResponse {
  maKH: number;
  maTK: number;
  tenKH: string;
  email: string;
  sdt: string;
  gioiTinh: boolean;

  diaChis: AddressResponse[];
}

export interface UpdateProfileRequest {
  maTK: number;
  tenKH: string;
  sdt: string;
  gioiTinh: boolean;
}