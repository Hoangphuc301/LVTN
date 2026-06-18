import { useState } from "react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 flex flex-col items-center text-center">
      <h2 className="text-[32px] font-serif mb-4">Bản Tin SOFM</h2>
      <p className="text-[#444748] mb-8">Tham gia cùng chúng tôi để nhận những xu hướng mới nhất</p>
      <form className="flex w-[512px] gap-4" onSubmit={(e) => e.preventDefault()}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Địa chỉ email của bạn" className="flex-1 px-4 py-3 outline-none border-[1.5px] border-yellow-600/30 shadow-[0_0_0_2px_rgba(234,179,8,0.2)] bg-white transition-all" />
        <button type="submit" className="bg-black text-white px-8 py-3 text-sm font-semibold tracking-[1.4px] transition-all duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
            ĐĂNG KÝ
        </button>
      </form>
    </section>
  );
};