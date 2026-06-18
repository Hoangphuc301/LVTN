import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProductForm } from "../components/ProductForm";
import { createProduct } from "../components/productService";

import type { ProductFormModel } from "../components/ProductFormModel";

export const ProductCreateAdmin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ProductFormModel>({
        tenSp: "",
        gia: 0,
        giaGiam: null,
        trangThai: true,
        maDm: undefined,
        hinhAnh: [],
        variants: []
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = {
            ...formData,
            hinhAnhUrls: formData.hinhAnh,
        };

        console.log("DATA SEND:", payload);

        await createProduct(payload);
            alert("Thêm thành công");
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            alert("Thêm thất bại");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <button onClick={() => navigate("/admin/products")} className="px-6 py-2 bg-[#3e403f] border border-[#4a463d] text-[#e5e2e1] rounded-lg font-medium hover:bg-[#4a463d]">
                    Quay lại
                </button>
            </div>

            <div>
                <h1 className="text-3xl font-medium text-[#e5e2e1]">Thêm sản phẩm</h1>
                <p className="text-[#a0a09e] mt-2">Nhập thông tin sản phẩm mới</p>
            </div>

            <ProductForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                buttonText="Thêm sản phẩm"
            />
        </div>
    );
};