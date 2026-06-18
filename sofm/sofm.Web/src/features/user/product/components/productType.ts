export interface ProductVariant { 
    maCtsp: number; 
    maMau: number; 
    tenMau: string; 
    maSize: number; 
    tenSize: string; soLuongTon: number; 
} 
    
export interface Product { 
    maSp: number; tenSp: string; gia: number; 
    giaGiam: number | null; moTa?: string | null; trangThai?: boolean | null; 
    maDm?: number; tenDanhMuc?: string; maDmCha: number; 
    tenDanhMucCha?: string; maTh?: number | null; 
    hinhAnh: string[]; 
    variants: ProductVariant[]; 
}