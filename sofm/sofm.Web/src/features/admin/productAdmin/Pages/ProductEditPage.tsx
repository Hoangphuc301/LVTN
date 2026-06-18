import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "../components/ProductForm";
import { getProductById, updateProduct } from "../components/productService";
import { type ProductFormModel, type VariantModel } from "../components/ProductFormModel";

export const ProductEditAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const [formData, setFormData] = useState<ProductFormModel>({
        tenSp: "", gia: 0, giaGiam: null, trangThai: true, 
        maDm: undefined, maDmCha: undefined, moTa: "", 
        maTh: null, variants: [], hinhAnh: []
    });

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const res = await getProductById(Number(id));
                const data = res.data;
                setFormData({
                    maSp: data.maSp,
                    tenSp: data.tenSp,
                    gia: data.gia,
                    giaGiam: data.giaGiam,
                    moTa: data.moTa,
                    maTh: data.maTh,
                    trangThai: data.trangThai ?? true,
                    maDm: data.maDm,
                    maDmCha: data.maDmCha,
                    hinhAnh: Array.isArray(data.hinhAnh) ? data.hinhAnh : [],

                    variants: (data.variants as VariantModel[] ?? []).map((v: VariantModel) => ({ 
                        maCtsp: v.maCtsp, 
                        maMau: v.maMau, 
                        maSize: v.maSize, 
                        soLuongTon: v.soLuongTon 
                    })),
                });
            } catch (error) {
                console.error(error);
                navigate("/admin/products");
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            hinhAnhUrls: formData.hinhAnh,
        };
        
        try {
            await updateProduct(Number(id), payload);
            alert("Cập nhật thành công");
            navigate("/admin/products");
        } catch {
            alert("Cập nhật thất bại");
        }
    };

    if (loading) return <div className="text-white">Đang tải...</div>;

    return (
        <ProductForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} buttonText="Cập nhật" />
    );
};