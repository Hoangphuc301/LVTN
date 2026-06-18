import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { categoryService } from "../components/categoryService";
import { CategoryForm } from "../components/CategoryForm";
import { type CategoryDto } from "../components/CategoryTypes";

export const CategoryChildEditAdmin = () => {
    const { childId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<CategoryDto>({
        maDM: 0,
        tenDM: "",
        moTa: "",
        trangThai: true,
        MaDmCha: null
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get<CategoryDto>(
                `https://localhost:7167/api/Category/${childId}`
            );

            setFormData(res.data);
        };

        if (childId) fetchData();
    }, [childId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData) return;

        await categoryService.update(Number(childId), formData);

        // quay lại parent (nếu muốn đẹp hơn thì load maDM_Cha)
        navigate(-1);
    };

    if (!formData) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <h1 className="text-white text-2xl mb-4">
                Sửa danh mục con
            </h1>

            <CategoryForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                buttonText="Cập nhật"
            />
        </div>
    );
};