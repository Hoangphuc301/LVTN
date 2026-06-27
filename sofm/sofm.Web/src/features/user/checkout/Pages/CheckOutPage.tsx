import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../cart/components/useCart";
import { createOrder } from "../components/orderService";
import { getProfile } from "../../profile/components/ProfileService";
import { getAddresses, addAddress } from "../../profile/components/AddressService";
import type { ProfileResponse } from "../../profile/components/ProfileType";
import type { AddressResponse } from "../../profile/components/AddressType";
import { AddressModal } from "../components/AddressModal";
import { AddAddressModal } from "../components/AddAddressModal";

interface CheckoutItem {
  maCtsp: number;
  maSp: number;
  tenSp: string;
  hinhAnh: string;
  mau: string;
  size: string;
  donGia: number;
  soLuong: number;
}

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { loadCart } = useCart();
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressResponse | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadCheckoutData = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const user = JSON.parse(storedUser);
      const profileData = await getProfile(user.maTK);
      setProfile(profileData);
      setEmail(profileData.email);
      setPhone(profileData.sdt);
      setFullName(profileData.tenKH);
      const addressData = await getAddresses(profileData.maKH);
      setAddresses(addressData);
      const defaultAddress = addressData.find(x => x.laDiaChiMacDinh);
      if (defaultAddress) setSelectedAddress(defaultAddress);
    } catch {
      alert("Không thể tải dữ liệu thanh toán");
    }
  };

  useEffect(() => {
    const checkoutItems = JSON.parse(localStorage.getItem("checkout_items") || "[]");
    setItems(checkoutItems);
    void loadCheckoutData();
  }, []);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.donGia * item.soLuong, 0), [items]);
  const shippingFee = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shippingFee;

  const handleAddAddress = async (fullAddress: string) => {
    if (!profile) return;
    try {
      await addAddress({ maKH: profile.maKH, diaChiChiTiet: fullAddress });
      await loadCheckoutData();
      setShowAddAddressModal(false);
    } catch {
      alert("Không thể thêm địa chỉ");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (items.length === 0) { alert("Không có sản phẩm để thanh toán"); return; }
      if (!selectedAddress) { alert("Vui lòng chọn địa chỉ giao hàng"); return; }
      setLoading(true);
      const payload = {
        maKH: profile!.maKH,
        maPTTT: paymentMethod,
        sdtGiao: phone,
        diaChiGiao: selectedAddress.diaChiChiTiet,
        items: items.map(item => ({ maCTSP: item.maCtsp, soLuong: item.soLuong, donGia: item.donGia })),
      };
      const response = await createOrder(payload);
      const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
      const checkoutIds = items.map(x => x.maCtsp);
      const newCart = guestCart.filter((x: { maCtsp: number }) => !checkoutIds.includes(x.maCtsp));
      localStorage.setItem("guest_cart", JSON.stringify(newCart));
      localStorage.removeItem("checkout_items");
      localStorage.setItem("last_order", JSON.stringify(response.data));
      await loadCart();
      navigate("/order-success");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { message?: string })?.message;
        alert(message ?? "Đặt hàng thất bại");
      } else {
        alert("Đặt hàng thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f9f9f7] min-h-screen py-20 px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-3xl font-serif font-bold border-b-2 border-black pb-4">Thông tin liên hệ</h2>
          <div className="grid grid-cols-2 gap-4">
            <input value={email} disabled className="w-full bg-gray-100 border p-3" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white border p-3" />
          </div>
          <h2 className="text-3xl font-serif font-bold border-b-2 border-black pb-4">Địa chỉ giao hàng</h2>
          <input value={fullName} disabled className="w-full bg-gray-100 border p-3" />
          <div className="bg-white border p-4">
            {selectedAddress ? (
              <><p className="font-semibold">Địa chỉ đang chọn</p><p className="mt-2 text-gray-600">{selectedAddress.diaChiChiTiet}</p></>
            ) : (<p>Chưa có địa chỉ</p>)}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowAddressModal(true)} className="border px-4 py-2">Chọn địa chỉ khác</button>
            <button onClick={() => setShowAddAddressModal(true)} className="bg-black text-white px-4 py-2">Thêm địa chỉ mới</button>
          </div>
          <h2 className="text-3xl font-serif font-bold border-b-2 border-black pb-4">Phương thức thanh toán</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 bg-white border p-4">
              <input type="radio" checked={paymentMethod === 1} onChange={() => setPaymentMethod(1)} /> COD
            </label>
            <label className="flex items-center gap-3 bg-white border p-4">
              <input type="radio" checked={paymentMethod === 2} onChange={() => setPaymentMethod(2)} /> VNPAY
            </label>
          </div>
        </div>
        <div className="bg-white p-10 border shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-8">Tóm tắt đơn hàng</h2>
          <div className="space-y-6 mb-8 border-b pb-8">
            {items.map(item => (
              <div key={item.maCtsp} className="flex gap-4">
                <img src={`/${item.hinhAnh}`} className="w-20 h-28 object-cover rounded" alt={item.tenSp} />
                <div className="flex-1">
                  <h4 className="font-bold">{item.tenSp}</h4>
                  <p className="text-sm text-gray-500">Size: {item.size} | Màu: {item.mau} | SL: {item.soLuong}</p>
                  <p className="font-bold mt-1">{(item.donGia * item.soLuong).toLocaleString()}₫</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3 mb-8 font-bold">
            <div className="flex justify-between"><span>Tạm tính</span><span>{subtotal.toLocaleString()}₫</span></div>
            <div className="flex justify-between text-green-700"><span>Phí ship</span><span>{shippingFee.toLocaleString()}₫</span></div>
            <div className="flex justify-between text-xl border-t pt-4"><span>TỔNG CỘNG</span><span>{total.toLocaleString()}₫</span></div>
          </div>
          <button onClick={handlePlaceOrder} disabled={loading} className="w-full bg-black text-white py-5 font-bold uppercase">
            {loading ? "Đang xử lý..." : "Hoàn tất đặt hàng"}
          </button>
        </div>
      </div>
      <AddressModal
        open={showAddressModal}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelect={(address) => { setSelectedAddress(address); setShowAddressModal(false); }}
        onClose={() => setShowAddressModal(false)}
        onAdd={() => { setShowAddressModal(false); setShowAddAddressModal(true); }}
      />
      <AddAddressModal open={showAddAddressModal} onClose={() => setShowAddAddressModal(false)} onSave={handleAddAddress} />
    </main>
  );
};