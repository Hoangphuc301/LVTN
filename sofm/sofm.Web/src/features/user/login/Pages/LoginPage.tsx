import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputStyles = "w-full bg-gray-50 border border-gray-400 p-3.5 outline-none focus:border-black focus:ring-1 focus:ring-black/20 transition-all duration-200 text-gray-900 placeholder:text-gray-500";

  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-6 bg-[#f9f9f7]">
      <div className="bg-white p-10 w-full max-w-md border border-gray-200 shadow-xl shadow-gray-200/50">
        <h1 className="text-3xl font-serif font-bold text-center mb-2 text-black">SOFM</h1>
        <p className="text-center text-gray-600 mb-8 font-medium">Đăng nhập vào tài khoản của bạn</p>
        
        <div className="space-y-5">
          <input type="email" placeholder="Email"  className={inputStyles}/>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" className={inputStyles}/>
            <button type="button"onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500 hover:text-black transition-colors">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <div className="text-right">
            <a href="/forgot-password" className="text-xs font-semibold text-gray-700 hover:text-black underline underline-offset-2">
              Quên mật khẩu?
            </a>
          </div>

          <button className="w-full bg-black text-white py-4 font-bold tracking-wider hover:bg-gray-900 transition-all shadow-md active:translate-y-0.5">
            ĐĂNG NHẬP
          </button>
        </div>

        <div className="mt-8">
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-gray-500 uppercase">Hoặc</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
            <div className="grid grid-cols-2 gap-4 mt-4">
            <button className="border-2 border-black py-3 text-sm font-bold text-black hover:bg-black hover:text-white transition-all">
                Google
            </button>
            <button className="border-2 border-black py-3 text-sm font-bold text-black hover:bg-black hover:text-white transition-all">
                Facebook
            </button>
            </div>
        </div>
        
        <p className="text-center mt-6 text-sm font-medium">
          Chưa có tài khoản? <a href="/register" className="font-bold underline text-black underline-offset-2">ĐĂNG KÝ NGAY</a>
        </p>
      </div>
    </main>
  );
};