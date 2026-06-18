export const Footer = () => (
  <footer className="bg-white border-t border-[#c4c7c7] py-16 px-20">
    <div className="max-w-[1440px] mx-auto grid grid-cols-4 gap-12">
      <div className="col-span-2">
        <h2 className="text-3xl font-serif mb-4">SOFM</h2>
        <p className="text-sm text-[#444748]">Định hình phong cách tối giản và thanh lịch qua những thiết kế vượt thời gian.</p>
      </div>
      <div>
        <h3 className="text-xs tracking-[1.2px] font-medium mb-4">HỖ TRỢ</h3>
        <ul className="space-y-3 text-sm text-[#444748]">
          <li>Hướng dẫn chọn size</li>
          <li>Vận chuyển</li>
          <li>Đổi trả</li>
        </ul>
      </div>
      <div>
        <h3 className="text-xs tracking-[1.2px] font-medium mb-4">PHÁP LÝ</h3>
        <ul className="space-y-3 text-sm text-[#444748]">
          <li>Chính sách bảo mật</li>
          <li>Điều khoản dịch vụ</li>
        </ul>
      </div>
    </div>
    <div className="mt-12 pt-8 border-t text-sm text-[#444748]">© 2026 SOFM Fashion. All rights reserved.</div>
  </footer>
);