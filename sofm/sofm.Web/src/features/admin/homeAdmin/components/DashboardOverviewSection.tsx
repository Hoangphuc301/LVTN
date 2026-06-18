import { DashboardCard } from "./DashboardCard";
const stats = [
  { title: "DOANH THU HÔM NAY", value: "11,230,000 ₫", change: "+12.5%", isIncrease: true, icon: "💰" },
  { title: "ĐƠN HÀNG MỚI", value: "30", change: "+5.2%", isIncrease: true, icon: "📦" },
  { title: "KHÁCH HÀNG MỚI", value: "20", change: "+18.1%", isIncrease: true, icon: "👤" },
  { title: "CẢNH BÁO TỒN KHO", value: "10 Sản phẩm", change: "-2.4%", isIncrease: false, icon: "⚠️" },
];

const recentOrders = [
  { id: "#ORD-0921", customer: "Nguyễn Văn A", date: "12/10/2023", total: "₫1,250,000", status: "ĐANG XỬ LÝ", statusClassName: "bg-[#4a463d] text-[#e5e2e1]" },
  { id: "#ORD-0920", customer: "Trần Thị B", date: "12/10/2023", total: "₫3,400,000", status: "HOÀN THÀNH", statusClassName: "bg-[#e9e2d433] text-black" },
  { id: "#ORD-0919", customer: "Lê Văn C", date: "11/10/2023", total: "₫890,000", status: "HOÀN THÀNH", statusClassName: "bg-[#e9e2d433] text-black" },
];

const notifications = [
  { title: "Chiến dịch Mùa Thu", desc: <>Bắt đầu trong 2 ngày.<br />Kiểm tra banner.</>, class: "border-[#e9e2d4] bg-[#3d3d3a]" },
  { title: "Sắp hết hàng", desc: <>Áo khoác len xám (Size<br />M) còn 2 chiếc.</>, class: "border-[#ba1a1a] bg-[#ffdad61a]" },
  { title: "Cập nhật hệ thống", desc: <>Hoàn tất bảo trì lúc<br />02:00 AM.</>, class: "border-[#c4c7c7] bg-[#3d3d3a]" },
];

const bestSellingProducts = [
  { name: "Blazer Cổ Điển", sold: "45 đã bán", img: "bg-[url(/product/AoBlazerDen.png)]" },
  { name: "Áo Lụa Xếp Li", sold: "32 đã bán", img: "bg-[url(/product/AoLuaXepLi.png)]" },
];

export const DashboardOverviewSection = () => {
  return (
    <section className="p-8 w-full min-h-screen bg-[rgb(120,120,102)] text-white">
      <header className="mb-10">
        <h1 className="text-[40px] font-semibold text-white">Tổng quan hệ thống</h1>
        <p className="text-gray-300">Chào mừng trở lại. Đây là tình hình kinh doanh hôm nay.</p>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => <DashboardCard key={i} {...s} />)}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <div className="bg-[#2a2a2a] p-8 rounded-2xl border border-[#40403d]">
            <h2 className="text-2xl font-medium mb-6">Biểu đồ doanh thu</h2>
            <div className="h-64 bg-[#1a1a1a] flex items-center justify-center rounded-lg border border-[#40403d]">Biểu đồ hiển thị ở đây</div>
          </div>

          <div className="bg-[#2a2a2a] p-8 rounded-2xl border border-[#40403d]">
            <h2 className="text-2xl font-medium mb-6">Đơn hàng gần đây</h2>
            <div className="space-y-4">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex justify-between items-center border-b border-[#40403d] pb-4">
                  <div><p className="font-medium">{o.id} - {o.customer}</p><p className="text-sm text-gray-400">{o.date}</p></div>
                  <div className="text-right"><p className="font-semibold">{o.total}</p><span className={`px-2 py-1 text-[10px] rounded ${o.statusClassName}`}>{o.status}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 space-y-8">
          <div className="bg-[#2a2a2a] p-8 rounded-2xl border border-[#40403d]">
            <h2 className="text-2xl font-medium mb-6">Thông báo</h2>
            <div className="space-y-4">
              {notifications.map((n, i) => (
                <div key={i} className={`p-4 border-l-4 rounded ${n.class}`}>
                  <h4 className="font-bold text-sm">{n.title}</h4>
                  <p className="text-sm text-gray-200 mt-1">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#2a2a2a] p-8 rounded-2xl border border-[#40403d]">
            <h2 className="text-2xl font-medium mb-6">Sản phẩm bán chạy</h2>
            <div className="grid grid-cols-2 gap-4">
              {bestSellingProducts.map((p) => (
                <div key={p.name} className="space-y-2">
                  <div className={`h-32 w-full rounded bg-cover ${p.img}`} />
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.sold}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};