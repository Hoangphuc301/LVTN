import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getOrderDetail } from "../components/orderAdminService";

export const UpdateOrderStatusAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            const res = await getOrderDetail(Number(id));
            setStatus(res.data.trangThai);
        };
        fetchOrder();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.put(
                `https://localhost:7167/api/Order/${id}/status`,
                {
                    maDH: Number(id),
                    trangThai: status,
                    moTa: "Cập nhật từ admin"
                }
            );

            alert("Cập nhật thành công");
            navigate("/admin/orders");
        }
        catch (err) {
            console.error(err);
            alert("Cập nhật thất bại");
        }
    };

    const statusOptions = ["Chờ xác nhận", "Đã xác nhận", "Đang giao", "Đã giao", "Đã hủy"];

    return (
        <div className="p-8">
            <div className="bg-[#1f2120] p-6 rounded-xl border border-[#4a463d] text-white max-w-xl">
                <h1 className="text-2xl font-bold mb-6">Cập nhật trạng thái đơn hàng</h1>

                <select
                    value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-3 rounded bg-[#2f3130]">
                    {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                <div className="mt-6 flex gap-4">
                    <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 rounded">
                        Lưu
                    </button>
                    <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-600 rounded">
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};