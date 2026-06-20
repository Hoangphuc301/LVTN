import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetail } from "../components/orderAdminService";

interface OrderDetailItem {
    maCTSP: number;
    tenSP: string;
    mau: string;
    size: string;
    soLuong: number;
    donGia: number;
    thanhTien: number;
}

interface OrderDetail {
    maDH: number;
    tenKhach: string;
    sdt: string;
    diaChi: string;
    tongTien: number;
    phiShip: number;
    tongTienCuoi: number;
    trangThai: string;
    ngayDat: string;
    items: OrderDetailItem[];
}

export const OrderDetailAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await getOrderDetail(Number(id));
                setOrder(res.data);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading)
        return <div className="p-10 text-white">Đang tải...</div>;

    if (!order)
        return <div className="p-10 text-white">Không tìm thấy đơn hàng</div>;

    return (
        <div className="p-8 text-white">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-gray-700 rounded"
            >
                Quay lại
            </button>

            <div className="bg-[#1f2120] p-6 rounded-xl border border-[#4a463d]">
                <h1 className="text-2xl font-bold mb-6">
                    Chi tiết đơn hàng #{order.maDH}
                </h1>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <p><b>Khách hàng:</b> {order.tenKhach}</p>
                    <p><b>SĐT:</b> {order.sdt}</p>
                    <p><b>Địa chỉ:</b> {order.diaChi}</p>
                    <p><b>Trạng thái:</b> {order.trangThai}</p>
                    <p><b>Ngày đặt:</b> {new Date(order.ngayDat).toLocaleString("vi-VN")}</p>
                    <p><b>Tổng tiền:</b> {order.tongTienCuoi.toLocaleString()} đ</p>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#4a463d]">
                            <th className="p-3 text-left">Sản phẩm</th>
                            <th className="p-3">Màu</th>
                            <th className="p-3">Size</th>
                            <th className="p-3">SL</th>
                            <th className="p-3">Đơn giá</th>
                            <th className="p-3">Thành tiền</th>
                        </tr>
                    </thead>

                    <tbody>
                        {order.items.map((item) => (
                            <tr
                                key={item.maCTSP}
                                className="border-b border-[#333]"
                            >
                                <td className="p-3">{item.tenSP}</td>
                                <td className="p-3 text-center">{item.mau}</td>
                                <td className="p-3 text-center">{item.size}</td>
                                <td className="p-3 text-center">{item.soLuong}</td>
                                <td className="p-3 text-center">
                                    {item.donGia.toLocaleString()} đ
                                </td>
                                <td className="p-3 text-center">
                                    {item.thanhTien.toLocaleString()} đ
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};