import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductVariantForm } from "../components/ProductVariantForm";
import { createVariant } from "../components/productVariantService";
import type { ProductVariant } from "../components/productVariantType";

export const ProductVariantCreate = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProductVariant>({
        maCtsp: 0,
        maSp: Number(productId),
        maMau: 0,
        maSize: 0,
        soLuongTon: 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createVariant(formData);
            alert("Thêm biến thể thành công");
            navigate(`/admin/products/${productId}/variants`);
        } catch (err) {
            console.error(err);
            alert("Thêm thất bại");
        }
    };

    return (
        <div className="space-y-6">
            <button onClick={() => navigate(`/admin/products/${productId}/variants`)} className="px-6 py-2 bg-[#3e403f] border border-[#4a463d] text-white rounded-lg">
                Quay lại
            </button>
            <ProductVariantForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} buttonText="Thêm biến thể" />
        </div>
    );
};