import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../components/OrderAdminService";
import type { Order } from "../components/OrderTypes";

export const OrderAdmin = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrders();
                setOrders(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Xử lý hủy đơn
    const handleCancelOrder = async (maDH: number) => {
        if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;

        try {
            await updateOrderStatus(maDH, "Đã hủy", "Hủy từ trang quản trị");
            setOrders((prev) =>
                prev.map((order) =>
                    order.maDH === maDH ? { ...order, trangThai: "Đã hủy" } : order
                )
            );
            alert("Hủy đơn thành công");
        } catch (error) {
            console.error(error);
            alert("Hủy đơn thất bại");
        }
    };

    const getStatusOrder = (status: string) => {
        const styles: Record<string, string> = {
            "Chờ xác nhận": "bg-yellow-500/20 text-yellow-400",
            "Đã xác nhận": "bg-blue-500/20 text-blue-400",
            "Đang giao": "bg-indigo-500/20 text-indigo-400",
            "Đã giao": "bg-green-500/20 text-green-400",
            "Đã hủy": "bg-red-500/20 text-red-400",
        };
        return styles[status] || "bg-gray-500/20 text-gray-400";
    };

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchSearch =
                order.maDH.toString().includes(search) ||
                order.tenKhach.toLowerCase().includes(search.toLowerCase());
            const matchStatus = !statusFilter || order.trangThai === statusFilter;
            const orderDate = new Date(order.ngayDat);
            const matchFromDate = !fromDate || orderDate >= new Date(fromDate);
            const matchToDate = !toDate || orderDate <= new Date(toDate + "T23:59:59");
            return matchSearch && matchStatus && matchFromDate && matchToDate;
        });
    }, [orders, search, statusFilter, fromDate, toDate]);

    const stats = useMemo(() => ({
        total: orders.length,
        pending: orders.filter((x) => x.trangThai === "Chờ xác nhận").length,
        shipping: orders.filter((x) => x.trangThai === "Đang giao").length,
        delivered: orders.filter((x) => x.trangThai === "Đã giao").length,
        revenue: orders
            .filter((x) => x.trangThai === "Đã giao")
            .reduce((sum, x) => sum + x.tongTienCuoi, 0),
    }), [orders]);

    const totalPages = Math.ceil(filteredOrders.length / pageSize);
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

        useEffect(() => {
            const timer = setTimeout(() => {
                setCurrentPage(1);
            }, 0);
            return () => clearTimeout(timer);
        }, [search, statusFilter, fromDate, toDate]);

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-8">Quản lý đơn hàng</h1>

            {/* Statistics */}
            <div className="grid grid-cols-5 gap-4 mb-8">
                {[
                    { label: "Tổng đơn", value: stats.total, color: "text-gray-400" },
                    { label: "Chờ xác nhận", value: stats.pending, color: "text-yellow-400" },
                    { label: "Đang giao", value: stats.shipping, color: "text-indigo-400" },
                    { label: "Đã giao", value: stats.delivered, color: "text-green-400" },
                    { label: "Doanh thu", value: `${stats.revenue.toLocaleString()} đ`, color: "text-blue-400" },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#1f2120] p-5 rounded-xl border border-[#4a463d]">
                        <p className={stat.color}>{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div className="bg-[#1f2120] p-4 rounded-xl border border-[#4a463d] flex flex-wrap gap-4 mb-6">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm kiếm..." className="flex-1 min-w-[200px] bg-[#2f3130] p-3 rounded" />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-[#2f3130] p-3 rounded">
                    <option value="">Tất cả trạng thái</option>
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Đã xác nhận">Đã xác nhận</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao">Đã giao</option>
                    <option value="Đã hủy">Đã hủy</option>
                </select>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="bg-[#2f3130] p-3 rounded" />
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="bg-[#2f3130] p-3 rounded" />
                <button onClick={() => { setFromDate(""); setToDate(""); }} className="px-4 bg-red-600 rounded hover:bg-red-500">Xóa lọc ngày</button>
            </div>

            {/* Table */}
            <div className="bg-[#1f2120] rounded-xl border border-[#4a463d] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#2f3130]">
                        <tr>
                            {[
                                "Mã đơn", 
                                "Khách hàng", 
                                "SĐT", 
                                "Ngày đặt", 
                                "Tổng tiền", 
                                "Trạng thái", 
                                "Hành động"].map((h) => <th key={h} className="p-4">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan={7} className="p-8 text-center">Đang tải...</td></tr> : 
                         paginatedOrders.length === 0 ? <tr><td colSpan={7} className="p-8 text-center">Không có dữ liệu</td></tr> :
                         paginatedOrders.map((order) => (
                            <tr key={order.maDH} className="border-t border-[#333]">
                                <td className="p-4 font-bold">#{order.maDH}</td>
                                <td className="p-4">{order.tenKhach}</td>
                                <td className="p-4">{order.sdt}</td>
                                <td className="p-4">{new Date(order.ngayDat).toLocaleString("vi-VN")}</td>
                                <td className="p-4">{order.tongTienCuoi.toLocaleString()} đ</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusOrder(order.trangThai)}`}>
                                        {order.trangThai}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-3">
                                    <button onClick={() => navigate(`/admin/orders/${order.maDH}`)} className="text-blue-400">Chi tiết</button>
                                    <button onClick={() => navigate(`/admin/orders/${order.maDH}/edit`)} className="text-yellow-400">Cập nhật</button>
                                    <button 
                                        disabled={order.trangThai !== "Chờ xác nhận"}
                                        onClick={() => handleCancelOrder(order.maDH)}
                                        className={`${order.trangThai === "Chờ xác nhận" ? "text-red-400" : "text-gray-500 cursor-not-allowed"}`}
                                    >
                                        Hủy đơn
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded ${currentPage === page ? "bg-blue-600" : "bg-[#2f3130]"}`}>
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};