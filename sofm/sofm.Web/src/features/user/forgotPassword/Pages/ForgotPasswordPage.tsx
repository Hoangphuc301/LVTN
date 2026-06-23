import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../components/ForgotPasswordService";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const inputStyles = "w-full bg-gray-50 border border-gray-400 p-3.5 outline-none focus:border-black focus:ring-1 focus:ring-black/20 transition-all duration-200 text-gray-900 placeholder:text-gray-500 rounded-lg";

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    if (!email.trim()) { setEmailError("Vui lòng nhập email"); return; }
    try {
      setLoading(true);
      await sendOtp({ email });
      setStep(2);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setEmailError(error.response?.data?.message || error.response?.data || "Email không tồn tại");
      }
    } finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    if (!otp.trim()) { setOtpError("Vui lòng nhập OTP"); return; }
    try {
      setLoading(true);
      await verifyOtp({ email, otp });
      setStep(3);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setOtpError(error.response?.data?.message || error.response?.data || "OTP không hợp lệ");
      }
    } finally { setLoading(false); }
  };

  const handleResetPassword = async () => {
    setPasswordError("");
    if (!newPassword) { setPasswordError("Vui lòng nhập mật khẩu mới"); return; }
    if (newPassword !== confirmPassword) { setPasswordError("Mật khẩu xác nhận không khớp"); return; }
    try {
      setLoading(true);
      await resetPassword({ email, otp, newPassword });
      alert("Đổi mật khẩu thành công");
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setPasswordError(error.response?.data?.message || error.response?.data || "Không thể đổi mật khẩu");
      }
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-6 bg-[#f9f9f7]">
      <div className="bg-white p-10 w-full max-w-md rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-serif font-bold text-center mb-2">QUÊN MẬT KHẨU</h1>
        
        {step === 1 && (
          <>
            <p className="text-center text-gray-600 mb-8">Nhập email để nhận OTP</p>
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputStyles} ${emailError ? "border-red-500" : ""}`} />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 font-bold rounded-lg hover:bg-gray-900 transition-all">
                {loading ? "ĐANG GỬI..." : "GỬI OTP"}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-center text-gray-600 mb-8">Nhập OTP đã gửi tới <br /> <strong>{email}</strong></p>
            <div className="space-y-5">
              <div>
                <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className={`${inputStyles} ${otpError ? "border-red-500" : ""}`} />
                {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
              </div>
              <button onClick={handleVerifyOtp} disabled={loading} className="w-full bg-black text-white py-4 font-bold rounded-lg hover:bg-gray-900 transition-all">
                {loading ? "ĐANG XÁC THỰC..." : "XÁC THỰC OTP"}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-center text-gray-600 mb-8">Đặt mật khẩu mới</p>
            <div className="space-y-5">
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu mới" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputStyles} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-500 hover:text-black">
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputStyles} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-4 text-gray-500 hover:text-black">
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <button onClick={handleResetPassword} disabled={loading} className="w-full bg-black text-white py-4 font-bold rounded-lg hover:bg-gray-900 transition-all">
                {loading ? "ĐANG CẬP NHẬT..." : "ĐỔI MẬT KHẨU"}
              </button>
            </div>
          </>
        )}

        <p className="text-center mt-6 text-sm">
          <a href="/login" className="font-semibold underline text-gray-700 hover:text-black">Quay lại đăng nhập</a>
        </p>
      </div>
    </main>
  );
};