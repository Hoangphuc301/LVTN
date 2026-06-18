import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorForm } from "../components/ColorForm";
import { type ColorDto } from "../components/ColorTypes";
import { colorService } from "../components/colorService";

export const CreateColorAdmin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ColorDto>({
        maMau: 0,
        tenMau: "",
        maHex: "#000000",
        trangThai: true,
        soLuongSuDung: 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await colorService.create(formData);

            alert("Thêm màu thành công");
            navigate("/admin/colors");
        } catch (error) {
            console.error(error);
            alert("Thêm thất bại");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-[#e5e2e1]">
                    Thêm màu mới
                </h1>

                <p className="text-[#babfc7] mt-2">
                    Tạo màu sắc cho sản phẩm
                </p>
            </div>

            <ColorForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                buttonText="THÊM MÀU"/>
        </div>
    );
};