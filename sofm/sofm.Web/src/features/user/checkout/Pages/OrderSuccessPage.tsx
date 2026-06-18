import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface OrderInfo {
    maDH: number;
    tongTien: number;
    phiShip: number;
    tongTienCuoi: number;
    trangThai: string;
}

export const OrderSuccessPage = () => {
    const navigate = useNavigate();

    const [order] = useState<OrderInfo | null>(() => {
    const data = localStorage.getItem("last_order");
        return data
            ? JSON.parse(data)
            : null;
    });

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#f9f9f7] px-4">
            <div className="bg-white p-12 rounded-xl shadow-md w-full max-w-xl text-center">
                
                <CheckCircle size={90}className="mx-auto text-green-500 mb-6"/>
                
                <h1 className="text-3xl font-bold mb-3">
                    Đặt hàng thành công
                </h1>

                <p className="text-gray-500 mb-8">
                    Cảm ơn bạn đã mua sắm tại SOFM.
                    Đơn hàng của bạn đã được ghi nhận và đang chờ xác nhận.
                </p>
                {order && (
                    <div className="bg-gray-50 border rounded-lg p-5 text-left mb-8">
                        <h3 className="font-bold text-lg mb-4">
                            Thông tin đơn hàng
                        </h3>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Mã đơn hàng</span>
                                <span className="font-semibold">
                                    #{order.maDH}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Trạng thái</span>
                                <span className="text-orange-500 font-semibold">
                                    {order.trangThai}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tạm tính</span>
                                <span>
                                    {order.tongTien.toLocaleString()} ₫
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Phí vận chuyển</span>
                                <span>
                                    {order.phiShip.toLocaleString()} ₫
                                </span>
                            </div>

                            <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                <span>Tổng cộng</span>
                                <span>
                                    {order.tongTienCuoi.toLocaleString()} ₫
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button onClick={() => navigate("/")}
                        className="bg-black text-white py-3 rounded hover:bg-gray-800" >
                        Trang chủ
                    </button>

                    <button onClick={() => navigate("/orders")}
                        className="border py-3 rounded hover:bg-gray-100" >
                        Đơn hàng
                    </button>

                    <button onClick={() => navigate("/shop")}
                        className="border py-3 rounded hover:bg-gray-100" >
                        Mua tiếp
                    </button>
                </div>
            </div>
        </main>
    );
};