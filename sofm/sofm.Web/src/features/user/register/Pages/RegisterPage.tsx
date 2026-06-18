export const RegisterPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-6 bg-[#f9f9f7]">
      <div className="bg-white p-10 w-full max-w-md border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-serif font-bold text-center mb-2 text-black">SOFM</h1>
        <p className="text-center text-gray-700 mb-8 font-medium">Trở thành thành viên để trải nghiệm mua sắm đặc quyền.</p>
        
        <form className="space-y-4">
          <input type="text" placeholder="Họ và tên" 
            className="w-full bg-white border-2 border-black p-3.5 outline-none focus:ring-2 focus:ring-black/20 transition-all font-bold placeholder:text-gray-500" />
          <input type="email" placeholder="Địa chỉ Email" 
            className="w-full bg-white border-2 border-black p-3.5 outline-none focus:ring-2 focus:ring-black/20 transition-all font-bold placeholder:text-gray-500" />
          <input type="password" placeholder="Mật khẩu" 
            className="w-full bg-white border-2 border-black p-3.5 outline-none focus:ring-2 focus:ring-black/20 transition-all font-bold placeholder:text-gray-500" />
          <input type="password" placeholder="Xác nhận mật khẩu" 
            className="w-full bg-white border-2 border-black p-3.5 outline-none focus:ring-2 focus:ring-black/20 transition-all font-bold placeholder:text-gray-500" />

          <div className="flex items-start gap-2 text-xs">
            <input type="checkbox" className="mt-1 accent-black" id="terms" />
            <label htmlFor="terms" className="text-gray-700">
              Tôi đồng ý với <a href="#" className="underline font-bold text-black">Điều khoản dịch vụ</a> và <a href="#" className="underline font-bold text-black">Chính sách bảo mật</a> của SOFM.
            </label>
          </div>

          <button className="w-full bg-black text-white py-4 font-bold tracking-widest hover:bg-gray-800 transition-all border-2 border-black active:translate-y-1">
            ĐĂNG KÝ
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm font-bold">
          Đã có tài khoản? <a href="/login" className="underline underline-offset-4 hover:text-gray-600">Đăng nhập ngay</a>
        </p>
      </div>
    </main>
  );
};