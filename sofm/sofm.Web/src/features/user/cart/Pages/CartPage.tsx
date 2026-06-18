import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/useCart";

export const CartPage = () => {
    const { cart, updateQuantity, removeItem } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const navigate = useNavigate();
    const availableVouchers = [
        { code: "SOFM10", label: "Giảm 10%" },
        { code: "FREESHIP", label: "Miễn phí vận chuyển" },
    ];
    const handleSelectItem = (maCtsp: number) => {
        setSelectedItems((prev) => prev.includes(maCtsp) ? prev.filter((id) => id !== maCtsp) : [...prev, maCtsp]);
    };
    const selectedCartItems = cart?.items.filter((item) => selectedItems.includes(item.maCtsp)) || [];
    const selectedTotal = selectedCartItems.reduce((sum, item) => sum + item.donGia * item.soLuong, 0);
    const shippingFee = selectedTotal > 0 ? 30000 : 0;
    const finalTotal = selectedTotal + shippingFee;
    const handleCheckout = () => {
        if (selectedCartItems.length === 0) {
            alert("Vui lòng chọn sản phẩm cần thanh toán");
            return;
        }
        localStorage.setItem("checkout_items", JSON.stringify(selectedCartItems));
        navigate("/checkout");
    };
    return (
        <main className="min-h-screen pt-20 px-20 pb-20 bg-[#f9f9f7]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 border-b pb-8">
                    <h1 className="text-4xl font-serif font-bold mb-2">Giỏ hàng</h1>
                    <p className="text-gray-500">{cart?.items?.length ?? 0} sản phẩm</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        {cart?.items?.map((item) => (
                            <div key={item.maCtsp} className="flex gap-4 border-b pb-8 relative">
                                <input type="checkbox" checked={selectedItems.includes(item.maCtsp)} onChange={() => handleSelectItem(item.maCtsp)} className="w-5 h-5 mt-2 cursor-pointer" />
                                <button onClick={() => removeItem(item.maCtsp)} className="absolute top-0 right-0 text-gray-400">
                                    <X size={18} />
                                </button>
                                <img src={`/${item.hinhAnh}`} className="w-24 h-32 object-cover rounded" />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium">{item.tenSp}</h3>
                                        <p className="text-sm text-gray-500">Màu: {item.mau} | Size: {item.size}</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="border px-3 py-1 flex items-center gap-3">
                                            <button onClick={() => updateQuantity(item.maCtsp, item.soLuong - 1)}>-</button>
                                            <span>{item.soLuong}</span>
                                            <button onClick={() => updateQuantity(item.maCtsp, item.soLuong + 1)}>+</button>
                                        </div>
                                        <p className="font-semibold text-lg">{item.donGia.toLocaleString()} ₫</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 border border-gray-100 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-6">Tổng đơn hàng</h2>
                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tạm tính</span>
                                    <span className="font-medium">{selectedTotal.toLocaleString()} ₫</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Phí vận chuyển</span>
                                    <span className="text-green-600 font-medium">{shippingFee.toLocaleString()} ₫</span>
                                </div>
                                {selectedVoucher && (
                                    <div className="flex justify-between text-red-500">
                                        <span>Giảm giá ({selectedVoucher})</span>
                                        <span>- 0 ₫</span>
                                    </div>
                                )}
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between font-bold text-lg mb-6">
                                <span>Tổng cộng</span>
                                <span>{finalTotal.toLocaleString()} ₫</span>
                            </div>
                            <div className="relative mb-4">
                                <button onClick={() => setIsOpen(!isOpen)} className="w-full border p-3 text-sm text-left flex justify-between items-center bg-white hover:border-black transition-colors">
                                    <span className={selectedVoucher ? "text-black" : "text-gray-400"}>
                                        {selectedVoucher ? `Đã chọn: ${selectedVoucher}` : "Chọn mã giảm giá"}
                                    </span>
                                    <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                </button>
                                {isOpen && (
                                    <div className="absolute w-full mt-1 border bg-white shadow-lg z-10 max-h-40 overflow-y-auto">
                                        {availableVouchers.map((v) => (
                                            <div key={v.code} onClick={() => { setSelectedVoucher(v.code); setIsOpen(false); }} className="p-3 hover:bg-gray-100 cursor-pointer text-sm flex justify-between">
                                                <span className="font-medium">{v.code}</span>
                                                <span className="text-gray-500">{v.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button onClick={handleCheckout} className="w-full bg-black text-white py-4 font-bold tracking-widest hover:bg-gray-800 transition-all border-2 border-black active:translate-y-1">
                                TIẾN HÀNH THANH TOÁN
                            </button>
                            <p className="text-[10px] text-gray-400 text-center mt-4">Đã bao gồm thuế VAT (nếu có)</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
