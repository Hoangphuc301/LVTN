export interface CheckoutItem {
  maCtsp: number;
  maSp: number;
  tenSp: string;
  hinhAnh: string;
  mau: string;
  size: string;
  donGia: number;
  soLuong: number;
}

export interface Province {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
}

export interface Ward {
  code: number;
  name: string;
}