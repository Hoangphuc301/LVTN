import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "../components/LoginService";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const inputStyles = "w-full bg-gray-50 border border-gray-400 p-3.5 outline-none focus:border-black focus:ring-1 focus:ring-black/20 transition-all duration-200 text-gray-900 placeholder:text-gray-500 rounded-lg";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    let hasError = false;
    if (!email.trim()) { setEmailError("Vui lòng nhập email"); hasError = true; }
    if (!matKhau.trim()) { setPasswordError("Vui lòng nhập mật khẩu"); hasError = true; }
    if (hasError) return;
    try {
      setLoading(true);
      const result = await login({ email, matKhau });
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result));

      window.dispatchEvent(new Event("userChanged"));
      if (
        result.role === "Admin" ||
        result.role === "Nhân viên bán hàng" ||
        result.role === "Nhân viên giao hàng"
      ) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.response?.data || "";
        if (String(message).includes("Email không tồn tại")) { setEmailError("Email không tồn tại"); }
        else if (String(message).includes("Sai mật khẩu")) { setPasswordError("Sai mật khẩu"); }
        else if (String(message).includes("chưa xác thực OTP")) { setEmailError("Tài khoản chưa xác thực OTP"); }
        else { alert(String(message) || "Đăng nhập thất bại"); }
      } else { alert("Đăng nhập thất bại"); }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-6 bg-[#f9f9f7]">
      <div className="bg-white p-10 w-full max-w-md rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-serif font-bold text-center mb-2 text-black">SOFM</h1>
        <p className="text-center text-gray-600 mb-8 font-medium">Đăng nhập vào tài khoản của bạn</p>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} className={`${inputStyles} ${emailError ? "border-red-500" : ""}`} />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" value={matKhau} onChange={(e) => { setMatKhau(e.target.value); setPasswordError(""); }} className={`${inputStyles} ${passwordError ? "border-red-500" : ""}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-500 hover:text-black">
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="text-right">
            <a href="/forgot-password" className="text-xs font-semibold text-gray-700 hover:text-black underline underline-offset-2">Quên mật khẩu?</a>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 font-bold tracking-wider hover:bg-gray-900 transition-all rounded-lg disabled:opacity-60">
            {loading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
          </button>
        </form>
        <div className="mt-8">
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-gray-500 uppercase">Hoặc</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button type="button" className="border border-gray-300 py-3 text-sm font-semibold hover:bg-gray-100 transition rounded-lg">Google</button>
            <button type="button" className="border border-gray-300 py-3 text-sm font-semibold hover:bg-gray-100 transition rounded-lg">Facebook</button>
          </div>
        </div>
        <p className="text-center mt-6 text-sm font-medium">
          Chưa có tài khoản? <a href="/register" className="font-bold underline text-black underline-offset-2">ĐĂNG KÝ NGAY</a>
        </p>
      </div>
    </main>
  );
};