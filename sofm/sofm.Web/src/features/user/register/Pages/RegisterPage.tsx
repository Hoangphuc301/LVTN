import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerAccount, verifyOtp } from "../components/RegisterService";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [tenKH, setTenKH] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [gioiTinh, setGioiTinh] = useState(true);
  const [matKhau, setMatKhau] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenKH || !email || !sdt || !matKhau) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (matKhau !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }
    try {
      setLoading(true);
      await registerAccount({ tenKH, email, matKhau, sdt, gioiTinh });
      alert("OTP đã được gửi tới email của bạn");
      setShowOtp(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || error.response?.data || "Đăng ký thất bại");
      } else {
        alert("Đăng ký thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      await verifyOtp(email, otp);
      alert("Xác thực tài khoản thành công");
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || error.response?.data || "OTP không hợp lệ");
      } else {
        alert("OTP không hợp lệ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-widest text-black">SOFM</h1>
          <p className="text-gray-500 mt-2">Tạo tài khoản để mua sắm nhanh hơn</p>
        </div>
        {!showOtp ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <input type="text" placeholder="Họ và tên" value={tenKH} onChange={(e) => setTenKH(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black" />
            <input type="text" placeholder="Số điện thoại" value={sdt} onChange={(e) => setSdt(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black" />
            <select value={gioiTinh ? "true" : "false"} onChange={(e) => setGioiTinh(e.target.value === "true")} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black">
              <option value="true">Nam</option>
              <option value="false">Nữ</option>
            </select>
            <input type="password" placeholder="Mật khẩu" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black" />
            <input type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black" />
            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" id="terms" className="mt-1" required />
              <label htmlFor="terms" className="text-gray-600">
                Tôi đồng ý với <span className="font-semibold text-black cursor-pointer">Điều khoản dịch vụ</span> và <span className="font-semibold text-black cursor-pointer">Chính sách bảo mật</span>
              </label>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-60">
              {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ"}
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">✉️</div>
              <h3 className="text-lg font-semibold">Xác thực Email</h3>
              <p className="text-gray-500 mt-1">Mã OTP đã được gửi tới</p>
              <p className="font-semibold mt-1">{email}</p>
            </div>
            <input type="text" placeholder="Nhập mã OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center tracking-[8px] text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black" />
            <button onClick={handleVerifyOtp} disabled={loading} className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-60">
              {loading ? "ĐANG XÁC THỰC..." : "XÁC THỰC OTP"}
            </button>
            <button onClick={() => setShowOtp(false)} className="w-full text-gray-500 hover:text-black transition">Quay lại đăng ký</button>
          </div>
        )}
        <div className="mt-8 text-center text-sm text-gray-600">
          Đã có tài khoản? <a href="/login" className="font-semibold text-black hover:underline">Đăng nhập</a>
        </div>
      </div>
    </main>
  );
};