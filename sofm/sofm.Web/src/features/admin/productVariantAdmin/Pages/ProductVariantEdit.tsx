import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVariantById, updateVariant } from "../components/productVariantService";
import { ProductVariantForm } from "../components/ProductVariantForm";
import type { ProductVariant } from "../components/productVariantType";

export const ProductVariantEdit = () => {
    const { productId, maCtsp } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<ProductVariant>({
        maCtsp: 0,
        maSp: Number(productId),
        maMau: 0,
        maSize: 0,
        soLuongTon: 0,
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getVariantById(Number(maCtsp));
                setFormData(res.data);
            } catch (err) {
                console.error(err);
                navigate(`/admin/products/${productId}/variants`);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [maCtsp, productId, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateVariant(Number(maCtsp), formData);
            alert("Cập nhật thành công");
            navigate(`/admin/products/${productId}/variants`);
        } catch (err) {
            console.error(err);
            alert("Cập nhật thất bại");
        }
    };

    if (loading) return <div className="text-white">Đang tải...</div>;

    return (
        <div className="space-y-6">
            <button onClick={() => navigate(`/admin/products/${productId}/variants`)} className="px-6 py-2 bg-[#3e403f] border border-[#4a463d] text-white rounded-lg">
                Quay lại
            </button>
            <ProductVariantForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} buttonText="Cập nhật biến thể" />
        </div>
    );
};