import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../cart/components/useCart";

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

const locations = {
  provinces: ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng"],
  districts: ["Quận 1", "Quận 3", "TP. Thủ Đức"],
  wards: ["Phường Bến Nghé", "Phường Bến Thành", "Phường Võ Thị Sáu"],
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [loading, setLoading] = useState(false);
  const { loadCart } = useCart();
/* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const checkoutItems = JSON.parse(localStorage.getItem("checkout_items") || "[]");
    setItems(checkoutItems);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.donGia * item.soLuong, 0),
    [items]
  );

  const shippingFee = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shippingFee;

  const handlePlaceOrder = async () => {
    try {
      if (items.length === 0) {
        alert("Không có sản phẩm để thanh toán");
        return;
      }
      if (!phone || !address || !province || !district || !ward) {
        alert("Vui lòng nhập đầy đủ thông tin giao hàng");
        return;
      }

      setLoading(true);
      const payload = {
        maKH: 1,
        maPTTT: paymentMethod,
        sdtGiao: phone,
        diaChiGiao: `${address}, ${ward}, ${district}, ${province}`,
        items: items.map((item) => ({
          maCTSP: item.maCtsp,
          soLuong: item.soLuong,
          donGia: item.donGia,
        })),
      };

      const response = await axios.post("https://localhost:7167/api/Order", payload);
      console.log(response.data);
      const guestCart = JSON.parse(
          localStorage.getItem("guest_cart") || "[]"
      );
      const checkoutIds = items.map(
          (x) => x.maCtsp
      );
      const newCart = guestCart.filter(
          (x: { maCtsp: number }) =>
              !checkoutIds.includes(x.maCtsp)
      );
      localStorage.setItem(
          "guest_cart",
          JSON.stringify(newCart)
      );
      localStorage.removeItem(
          "checkout_items"
      );
      localStorage.setItem(
          "last_order",
          JSON.stringify(response.data)
      );
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

  const inputStyle = "w-full bg-white border border-gray-400 p-3 outline-none font-bold placeholder:text-gray-400 focus:border-black";
  const selectStyle = "w-full bg-white border border-gray-400 p-3 outline-none font-bold";

  return (
    <main className="bg-[#f9f9f7] min-h-screen py-20 px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-3xl font-serif font-bold border-b-2 border-black pb-4">Thông tin liên hệ</h2>
          <div className="grid grid-cols-2 gap-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inputStyle} />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" className={inputStyle} />
          </div>

          <h2 className="text-3xl font-serif font-bold border-b-2 border-black pb-4">Địa chỉ giao hàng</h2>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Họ và tên" className={inputStyle} />
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Số nhà, tên đường" className={inputStyle} />
          <div className="grid grid-cols-3 gap-3">
            <select value={province} onChange={(e) => setProvince(e.target.value)} className={selectStyle}>
              <option value="">Tỉnh/TP</option>
              {locations.provinces.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <select value={district} onChange={(e) => setDistrict(e.target.value)} className={selectStyle}>
              <option value="">Quận/Huyện</option>
              {locations.districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={ward} onChange={(e) => setWard(e.target.value)} className={selectStyle}>
              <option value="">Phường/Xã</option>
              {locations.wards.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>

          <h2 className="text-3xl font-serif font-bold border-b-2 border-black pb-4">Phương thức thanh toán</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 bg-white border p-4">
              <input type="radio" checked={paymentMethod === 1} onChange={() => setPaymentMethod(1)} />
              COD
            </label>
            <label className="flex items-center gap-3 bg-white border p-4">
              <input type="radio" checked={paymentMethod === 2} onChange={() => setPaymentMethod(2)} />
              VNPAY
            </label>
          </div>
        </div>

        <div className="bg-white p-10 border shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-8">Tóm tắt đơn hàng</h2>
          <div className="space-y-6 mb-8 border-b pb-8">
            {items.map((item) => (
              <div key={item.maCtsp} className="flex gap-4">
                <img src={`/${item.hinhAnh}`} className="w-20 h-28 object-cover rounded" alt={item.tenSp} />
                <div className="flex-1">
                  <h4 className="font-bold">{item.tenSp}</h4>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} | Màu: {item.mau} | SL: {item.soLuong}
                  </p>
                  <p className="font-bold mt-1">{(item.donGia * item.soLuong).toLocaleString()}₫</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-8 font-bold">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between text-green-700">
              <span>Phí ship</span>
              <span>{shippingFee.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between text-xl border-t pt-4">
              <span>TỔNG CỘNG</span>
              <span>{total.toLocaleString()}₫</span>
            </div>
          </div>

          <button onClick={handlePlaceOrder} disabled={loading} className="w-full bg-black text-white py-5 font-bold uppercase">
            {loading ? "Đang xử lý..." : "Hoàn tất đặt hàng"}
          </button>
        </div>
      </div>
    </main>
  );
};