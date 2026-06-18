export interface VariantModel {
    maCtsp?: number;
    maMau: number;
    maSize: number;
    soLuongTon: number;
}

export interface ProductFormModel {
    maSp?: number;
    tenSp: string;
    gia: number;
    giaGiam?: number | null;
    trangThai?: boolean | null;
    hinhAnh: string[]; 
    maDm?: number;
    maDmCha?: number;
    moTa?: string;
    maTh?: number | null;
    variants: VariantModel[];
}