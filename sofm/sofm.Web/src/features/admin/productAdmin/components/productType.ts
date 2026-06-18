export interface Product {
    maSp: number;
    
    tenSp: string;
    gia: number;
    giaGiam?: number | null;
    moTa?: string;
    trangThai?: boolean | null;

    hinhAnh: string[];

    maDm?: number;
    maTh?: number;
    
    tenDanhMuc?: string;
    maDmCha: number,
    tenDanhMucCha?: string;

    variants?: {
        maCtsp: number;
        maMau: number;
        tenMau: string;
        maSize: number;
        tenSize: string;
        soLuongTon: number;
    }[];
}   