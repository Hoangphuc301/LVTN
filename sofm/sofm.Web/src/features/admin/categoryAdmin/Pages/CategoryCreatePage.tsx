import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryService } from "../components/categoryService";
import { CategoryForm } from "../components/CategoryForm";
import { type CategoryDto } from "../components/CategoryTypes";

export const CategoryChildCreateAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const parentId = id ? Number(id) : null;

    const [formData, setFormData] = useState<CategoryDto>({
        maDM: 0,
        tenDM: "",
        moTa: "",
        trangThai: true,
        MaDmCha: parentId
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (parentId === null) {
            alert("Không tìm thấy danh mục cha");
            return;
        }

        try {
            await categoryService.create({
                ...formData,
                MaDmCha: parentId 
            });

            navigate(`/admin/categories/${parentId}`);
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-white text-3xl font-bold mb-6">
                Thêm danh mục con
            </h1>

            <CategoryForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                buttonText="Tạo mới"
            />
        </div>
    );
};