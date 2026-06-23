import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetail, updateOrderStatus } from "../components/OrderAdminService";
import type { OrderDetail } from "../components/OrderTypes";

export const UpdateOrderStatusAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");
    const [shipper, setShipper] = useState("");

    const statusFlow = ["Chờ xác nhận", "Đã xác nhận", "Đang giao", "Đã giao"];
    const shipperList = [
        { id: 1, tenNV: "Nguyễn Văn A", khuVuc: "Quận 1" },
        { id: 2, tenNV: "Trần Văn B", khuVuc: "Quận 7" },
        { id: 3, tenNV: "Lê Văn C", khuVuc: "Thủ Đức" }
    ];

    useEffect(() => {
        getOrderDetail(Number(id)).then(res => {
            setOrder(res.data);
            setStatus(res.data.trangThai);
        }).catch(console.error);
    }, [id]);

    if (!order) return <div className="p-10 text-white">Đang tải...</div>;

    const isStatusChanged = status !== order.trangThai;
    const currentStatusIndex = statusFlow.indexOf(order.trangThai);

    const handleUpdate = async () => {
        if (!isStatusChanged) return alert("Bạn chưa thay đổi trạng thái");
        
        const newIndex = statusFlow.indexOf(status);
        if (newIndex !== -1 && newIndex < currentStatusIndex) return alert("Không thể chuyển trạng thái ngược lại");
        if (status === "Đã hủy" && order.trangThai !== "Chờ xác nhận") return alert("Chỉ được hủy đơn khi đang ở trạng thái Chờ xác nhận");
        if (status === "Đang giao" && !shipper) return alert("Vui lòng chọn nhân viên giao hàng");

        let finalNote = note;
        if (status === "Đang giao") {
            const s = shipperList.find(x => x.id.toString() === shipper);
            if (s) finalNote = `${note}\nNhân viên giao hàng: ${s.tenNV}`;
        }

        try {
            await updateOrderStatus(Number(id), status, finalNote);
            alert("Cập nhật thành công");
            navigate(`/admin/orders/${id}`);
        } catch { alert("Cập nhật thất bại"); }
    };

    const orderInfo = [
        { label: "Khách hàng", val: order.tenKhach },
        { label: "SĐT", val: order.sdt },
        { label: "Địa chỉ", val: order.diaChi },
        { label: "Ngày đặt", val: new Date(order.ngayDat).toLocaleString("vi-VN") },
        { label: "Tổng tiền", val: `${order.tongTienCuoi.toLocaleString()} đ` },
        { label: "Trạng thái hiện tại", val: order.trangThai, className: "font-semibold text-yellow-400" }
    ];

    return (
        <div className="p-8 text-white">
            <div className="bg-[#1f2120] p-6 rounded-xl border border-[#4a463d]">
                <h1 className="text-2xl font-bold mb-8">Cập nhật đơn hàng #{order.maDH}</h1>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                    {orderInfo.map(item => (
                        <div key={item.label}>
                            <p className="text-gray-400">{item.label}</p>
                            <p className={item.className}>{item.val}</p>
                        </div>
                    ))}
                </div>

                {/* Status Selection */}
                <div className="mb-6">
                    <label className="block mb-2 font-semibold">Trạng thái mới</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-3 rounded bg-[#2f3130]">
                        {statusFlow.map((s, index) => (
                            <option key={s} value={s} disabled={index < currentStatusIndex}>{s}</option>
                        ))}
                        <option value="Đã hủy" disabled={order.trangThai !== "Chờ xác nhận"}>Đã hủy</option>
                    </select>
                </div>

                {status === "Đang giao" && (
                    <div className="mb-6">
                        <label className="block mb-2 font-semibold">Nhân viên giao hàng</label>
                        <select value={shipper} onChange={e => setShipper(e.target.value)} className="w-full p-3 rounded bg-[#2f3130]">
                            <option value="">Chọn nhân viên</option>
                            {shipperList.map(nv => <option key={nv.id} value={nv.id}>{nv.tenNV} - {nv.khuVuc}</option>)}
                        </select>
                    </div>
                )}

                <div className="mb-6">
                    <label className="block mb-2 font-semibold">Ghi chú</label>
                    <textarea rows={4} value={note} disabled={!isStatusChanged} onChange={e => setNote(e.target.value)} 
                        className="w-full p-3 rounded bg-[#2f3130] disabled:opacity-50" />
                </div>

                <div className="flex gap-4">
                    <button onClick={handleUpdate} disabled={!isStatusChanged} 
                        className={`px-4 py-2 rounded ${isStatusChanged ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"}`}>
                        Lưu cập nhật
                    </button>
                    <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700">Quay lại</button>
                </div>
            </div>
        </div>
    );
};