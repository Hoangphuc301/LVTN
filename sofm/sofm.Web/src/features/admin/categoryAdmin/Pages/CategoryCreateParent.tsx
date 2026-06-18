import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryForm } from "../components/CategoryForm";
import { categoryService } from "../components/categoryService";
import { type CategoryDto } from "../components/CategoryTypes";

export const CategoryCreateParent = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CategoryDto>({
        maDM: 0,
        tenDM: "",
        moTa: "",
        MaDmCha: null,
        trangThai: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await categoryService.create(formData);
            navigate("/admin/categories");
        } catch (error) {
            console.error("Lỗi tạo danh mục cha:", error);
            alert("Có lỗi xảy ra khi thêm danh mục!");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Thêm danh mục cha</h1>
            <CategoryForm 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleSubmit} 
                buttonText="Tạo danh mục" 
            />
        </div>
    );
};