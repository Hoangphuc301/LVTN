export interface Order {
    maDH: number;
    tenKhach: string;
    sdt: string;
    tongTienCuoi: number;
    trangThai: string;
    ngayDat: string;
}

export interface OrderDetail {
    maDH: number;
    tenKhach: string;
    sdt: string;
    diaChi: string;
    tongTien: number;
    phiShip: number;
    tongTienCuoi: number;
    trangThai: string;
    ngayDat: string;

    items: OrderItem[];
}

export interface OrderItem {
    maCTSP: number;
    tenSP: string;
    mau: string;
    size: string;
    soLuong: number;
    donGia: number;
    thanhTien: number;
}