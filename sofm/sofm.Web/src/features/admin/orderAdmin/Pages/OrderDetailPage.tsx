import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetail, getOrderHistory } from "../components/OrderAdminService";
import type { OrderHistory } from "../components/OrderTypes";

interface OrderDetailItem {
    maCTSP: number; tenSP: string; mau: string; size: string; soLuong: number; donGia: number; thanhTien: number;
}
interface OrderDetail {
    maDH: number; tenKhach: string; sdt: string; diaChi: string; tongTien: number; phiShip: number; tongTienCuoi: number; trangThai: string; ngayDat: string; items: OrderDetailItem[];
}

export const OrderDetailAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [history, setHistory] = useState<OrderHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [detailRes, historyRes] = await Promise.all([getOrderDetail(Number(id)), getOrderHistory(Number(id))]);
                setOrder(detailRes.data);
                setHistory(historyRes.data);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchData();
    }, [id]);

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            "Chờ xác nhận": "bg-yellow-500/20 text-yellow-400",
            "Đã xác nhận": "bg-blue-500/20 text-blue-400",
            "Đang giao": "bg-indigo-500/20 text-indigo-400",
            "Đã giao": "bg-green-500/20 text-green-400",
            "Đã hủy": "bg-red-500/20 text-red-400",
        };
        return colors[status] || "bg-gray-500/20 text-gray-400";
    };

    if (loading) return <div className="p-10 text-white">Đang tải...</div>;
    if (!order) return <div className="p-10 text-white">Không tìm thấy đơn hàng</div>;

    return (
        <div className="p-8 text-white">
            <div className="flex gap-3 mb-6">
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Quay lại</button>
                <button onClick={() => navigate(`/admin/orders/${order.maDH}/edit`)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">Cập nhật trạng thái</button>
            </div>

            <div className="bg-[#1f2120] p-6 rounded-xl border border-[#4a463d]">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Chi tiết đơn hàng #{order.maDH}</h1>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.trangThai)}`}>{order.trangThai}</span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    {[ { label: "Khách hàng", val: order.tenKhach }, { label: "Số điện thoại", val: order.sdt }, 
                       { label: "Địa chỉ giao hàng", val: order.diaChi }, { label: "Ngày đặt", val: new Date(order.ngayDat).toLocaleString("vi-VN") }
                    ].map(item => (
                        <div key={item.label} className="bg-[#2a2c2b] p-4 rounded-lg">
                            <p className="text-gray-400 text-sm">{item.label}</p>
                            <p className="font-semibold">{item.val}</p>
                        </div>
                    ))}
                </div>

                {/* Price Summary */}
                <div className="bg-[#2a2c2b] p-5 rounded-xl mb-8 space-y-2">
                    <div className="flex justify-between"><span>Tạm tính</span> <span>{order.tongTien.toLocaleString()} đ</span></div>
                    <div className="flex justify-between"><span>Phí vận chuyển</span> <span>{order.phiShip.toLocaleString()} đ</span></div>
                    <div className="border-t border-[#4a463d] pt-3 flex justify-between font-bold text-lg">
                        <span>Tổng thanh toán</span> <span className="text-green-400">{order.tongTienCuoi.toLocaleString()} đ</span>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>
                <div className="overflow-x-auto mb-10">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#4a463d] text-left">
                                {["Sản phẩm", "Màu", "Size", "SL", "Đơn giá", "Thành tiền"].map(h => <th key={h} className="p-3">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map(item => (
                                <tr key={item.maCTSP} className="border-b border-[#333]">
                                    <td className="p-3">{item.tenSP}</td>
                                    <td className="p-3 text-center">{item.mau}</td>
                                    <td className="p-3 text-center">{item.size}</td>
                                    <td className="p-3 text-center">{item.soLuong}</td>
                                    <td className="p-3 text-center">{item.donGia.toLocaleString()} đ</td>
                                    <td className="p-3 text-center">{item.thanhTien.toLocaleString()} đ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2 className="text-xl font-bold mb-6">Lịch sử đơn hàng</h2>
                <div className="relative">
                    {history.length === 0 ? <div className="text-gray-400">Chưa có lịch sử đơn hàng</div> :
                        history.map((item, index) => (
                            <div key={index} className="relative pl-10 pb-8">
                                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-500" />
                                {index !== history.length - 1 && <div className="absolute left-[7px] top-5 w-[2px] h-full bg-[#4a463d]" />}
                                <div className="bg-[#2a2c2b] p-4 rounded-lg">
                                    <div className="font-semibold text-blue-400">{item.trangThai}</div>
                                    <div className="text-gray-300 mt-1">{item.moTa}</div>
                                    <div className="text-xs text-gray-500 mt-2">{new Date(item.thoiGian).toLocaleString("vi-VN")}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};