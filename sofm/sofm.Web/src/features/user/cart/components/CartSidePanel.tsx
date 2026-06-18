import { X } from "lucide-react";
import { useCart } from "./useCart";

interface CartSidePanelProps { isOpen: boolean; onClose: () => void; }

export const CartSidePanel = ({ isOpen, onClose }: CartSidePanelProps) => {
    const { cart, updateQuantity, removeItem } = useCart();
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
            <div className="w-[400px] bg-white h-full shadow-2xl p-8 relative animate-in slide-in-from-right duration-300">
                <button onClick={onClose} className="absolute top-6 right-6"><X /></button>
                <h2 className="text-2xl font-serif font-bold mb-2">Giỏ hàng</h2>
                <p className="text-gray-500 mb-6">{cart?.items?.length ?? 0} sản phẩm</p>
                <div className="space-y-6 overflow-y-auto max-h-[70vh]">
                    {cart?.items?.map((item) => (
                        <div key={item.maCtsp} className="flex gap-4">
                            <img src={`/${item.hinhAnh}`} className="w-20 h-24 object-cover rounded bg-gray-100" />
                            <div className="flex-1">
                                <h4 className="font-medium">{item.tenSp}</h4>
                                <p className="text-sm text-gray-500">Màu: {item.mau} | Size: {item.size}</p>
                                <div className="mt-2 flex justify-between items-center">
                                    <div className="border px-2 py-0.5 flex gap-3 text-sm items-center">
                                        <button onClick={() => updateQuantity(item.maCtsp, item.soLuong - 1)}>-</button>
                                        <span>{item.soLuong}</span>
                                        <button onClick={() => updateQuantity(item.maCtsp, item.soLuong + 1)}>+</button>
                                    </div>
                                    <button onClick={() => removeItem(item.maCtsp)} className="text-red-500">X</button>
                                </div>
                                <p className="font-semibold text-sm mt-1">{item.donGia.toLocaleString()} ₫</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-8 border-t bg-white">
                    <div className="flex justify-between font-bold text-lg mb-6">
                        <span>Tạm tính</span>
                        <span>{cart?.tongTien?.toLocaleString() ?? 0} ₫</span>
                    </div>
                    <a href="/cart" className="block w-full bg-black text-white py-4 text-center hover:opacity-90">Tiến hành thanh toán</a>
                </div>
            </div>
        </div>
    );
};