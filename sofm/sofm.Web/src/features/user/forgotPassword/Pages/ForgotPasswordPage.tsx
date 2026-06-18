export const ForgotPasswordPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-6 bg-[#f9f9f7]">
      <div className="bg-white p-10 w-full max-w-md border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-serif font-bold text-center mb-2 text-black">QUÊN MẬT KHẨU</h1>
        <p className="text-center text-gray-700 mb-8 font-medium">
          Nhập địa chỉ email của bạn, chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu
        </p>
        
        <form className="space-y-6">
          <input 
            type="email" 
            placeholder="Địa chỉ Email" 
            className="w-full bg-white border-2 border-black p-3.5 outline-none font-bold placeholder:text-gray-500" 
          />

          <button className="w-full bg-black text-white py-4 font-bold tracking-widest hover:bg-gray-800 transition-all border-2 border-black active:translate-y-1">
            GỬI YÊU CẦU
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm font-bold">
          <a href="/login" className="underline underline-offset-4 hover:text-gray-600">Quay lại đăng nhập</a>
        </p>
      </div>
    </main>
  );
};