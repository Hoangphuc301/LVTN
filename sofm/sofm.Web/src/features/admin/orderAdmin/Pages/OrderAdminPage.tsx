import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Order {
    maDH: number;
    tenKhach: string;
    sdt: string;
    tongTienCuoi: number;
    trangThai: string;
    ngayDat: string;
}

export const OrderAdmin = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("https://localhost:7167/api/Order");
                setOrders(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusOrder = (status: string) => {
        const styles: Record<string, string> = {
            "Chờ xác nhận": "bg-yellow-500/20 text-yellow-500",
            "Đã xác nhận": "bg-blue-500/20 text-blue-500",
            "Đang giao": "bg-indigo-500/20 text-indigo-500",
            "Đã giao": "bg-green-500/20 text-green-500",
            "Đã hủy": "bg-red-500/20 text-red-500",
        };
        return styles[status] || "bg-gray-500/20 text-gray-500";
    };

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchSearch = order.maDH.toString().includes(search) || 
                                order.tenKhach.toLowerCase().includes(search.toLowerCase());
            const matchStatus = !statusFilter || order.trangThai === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [orders, search, statusFilter]);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#e5e2e1]">Quản lý đơn hàng</h1>
            </div>

            <div className="bg-[#1f2120] p-4 rounded-xl border border-[#4a463d] flex gap-4 mb-6">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
                    className="flex-1 bg-transparent p-2 text-white outline-none"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#2f3130] p-2 rounded text-white"
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Đã xác nhận">Đã xác nhận</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Đã hủy">Đã hủy</option>
                </select>
            </div>

            <div className="bg-[#1f2120] rounded-xl border border-[#4a463d] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#2f3130] text-[#a0a09e] text-sm uppercase">
                        <tr>
                            <th className="p-4">Mã đơn hàng</th>
                            <th className="p-4">Khách hàng</th>
                            <th className="p-4">Số điện thoại</th>
                            <th className="p-4">Ngày đặt</th>
                            <th className="p-4">Tổng tiền</th>
                            <th className="p-4">Trạng thái</th>
                            <th className="p-4">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#4a463d]">
                        {loading ? (
                            <tr><td colSpan={7} className="p-8 text-center text-white">Đang tải...</td></tr>
                        ) : filteredOrders.length === 0 ? (
                            <tr><td colSpan={7} className="p-8 text-center text-white">Không có dữ liệu</td></tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order.maDH} className="hover:bg-[#2a2c2b] text-white">
                                    <td className="p-4 font-bold">#{order.maDH}</td>
                                    <td className="p-4">{order.tenKhach}</td>
                                    <td className="p-4">{order.sdt}</td>
                                    <td className="p-4">{new Date(order.ngayDat).toLocaleString("vi-VN")}</td>
                                    <td className="p-4 font-semibold">{order.tongTienCuoi.toLocaleString()} đ</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusOrder(order.trangThai)}`}>
                                            {order.trangThai}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-3">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/admin/orders/${order.maDH}`
                                                )
                                            }
                                            className="text-blue-400"
                                        >
                                            Xem chi tiết
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/admin/orders/${order.maDH}/edit`
                                                )
                                            }
                                            className="text-yellow-400"
                                        >
                                            Sửa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};