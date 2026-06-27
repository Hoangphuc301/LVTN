export interface AddressResponse {
  maDiaChi: number;
  diaChiChiTiet: string;
  laDiaChiMacDinh: boolean;
}

export interface AddAddressRequest {
  maKH: number;
  diaChiChiTiet: string;
}

export interface UpdateAddressRequest {
  maDiaChi: number;
  diaChiChiTiet: string;
}

export interface SetDefaultAddressRequest {
  maKH: number;
  maDiaChi: number;
}