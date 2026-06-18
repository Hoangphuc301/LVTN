import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ColorForm } from "../components/ColorForm";
import { type ColorDto } from "../components/ColorTypes";
import { colorService } from "../components/colorService";

export const EditColorAdmin = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<ColorDto>({
        maMau: 0,
        tenMau: "",
        maHex: "#000000",
        trangThai: true,
        soLuongSuDung: 0,
    });

    useEffect(() => {
        const fetchColor = async () => {
            try {
                const data = await colorService.getById(Number(id));

                setFormData(data);
            } catch (error) {
                console.error(error);
                alert("Không tìm thấy màu!");
            } finally {
                setLoading(false);
            }
        };

        fetchColor();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await colorService.update(Number(id), formData);

            alert("Cập nhật thành công");
            navigate("/admin/colors");
        } catch (error) {
            console.error(error);
            alert("Cập nhật thất bại");
        }
    };

    if (loading) {
        return (
            <div className="text-center text-white py-20">
                Đang tải...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-[#e5e2e1]">
                    Chỉnh sửa màu sắc
                </h1>

                <p className="text-[#babfc7] mt-2">
                    Cập nhật thông tin màu
                </p>
            </div>

            <ColorForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                buttonText="CẬP NHẬT"
            />
        </div>
    );
};