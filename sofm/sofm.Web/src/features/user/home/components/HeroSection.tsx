export const HeroSection = () => (
  <section className="relative h-[800px] flex items-center justify-center text-white">
    <div className="absolute inset-0 bg-[url('banner/Banner.png')] bg-cover bg-center" />
    <div className="absolute inset-0 bg-black/30" />
    <div className="relative text-center z-10 px-4">
      <h1 className="text-[64px] font-serif font-bold mb-6 tracking-[-1.28px]">Mùa Thu Đông 26</h1>
      <p className="text-lg mb-8 font-light">Khám phá sự thanh lịch tinh tế qua những đường cắt may hoàn hảo.</p>
      <a href="/shop" className="inline-block bg-white text-black px-8 py-3 font-semibold text-sm tracking-[0.7px]">KHÁM PHÁ NGAY</a>
    </div>
  </section>
);