import { Link, useLocation, useNavigate } from 'react-router-dom';

const primaryNavItems = [
  { label: "Tổng quan", path: "/admin" },
  { label: "Sản phẩm", path: "/admin/products" },
  { label: "Danh mục", path: "/admin/categories" },
  { label: "Đơn hàng", path: "/admin/orders" },
  { label: "Giao hàng", path: "/admin/shipping" },
  { label: "Khuyến mãi", path: "/admin/vouchers" },
  { label: "Màu sắc", path: "/admin/colors" },
  { label: "Kích cỡ", path: "/admin/sizes" },
  { label: "Người dùng", path: "/admin/users" },
  { label: "Báo cáo", path: "/admin/reports" },
];

const secondaryNavItems = [
  { label: "Cài đặt", path: "/admin/settings", icon: "/icon/setting.png" },
  { label: "Đăng xuất", path: "", danger: true, icon: "/icon/logout.png" },
];

export const AdminSidebarSection = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className="fixed left-0 top-0 flex flex-col w-64 h-screen bg-[#2f3130] border-r border-[#4a463d]">
      <header className="p-6 border-b border-[#4a463d]">
        <h1 className="text-2xl text-[#e5e2e1] font-medium">Quản trị viên</h1>
        <p className="text-sm text-[#e2e3e1]">Hệ thống điều hành</p>
      </header>

      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <div className="flex flex-col gap-1">
          {primaryNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.label} to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-[#625e54]" : "hover:bg-[#4a463d]/50"
                }`}>
                <span className={`pl-3 font-semibold text-sm ${isActive ? "text-white" : "text-[#e2e3e1]"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-[#4a463d]">
        {secondaryNavItems.map((item) => {
          if (item.label === "Đăng xuất") {
            return (
              <button key={item.label} type="button" onClick={handleLogout}
                className="flex items-center px-4 py-3 rounded-lg text-left hover:bg-[#4a463d]/50 w-full transition-colors">
                <img src={item.icon} alt={item.label} className="w-5 h-5" />
                <span className={`pl-3 font-semibold text-sm ${item.danger ? "text-[#ffdad6]" : "text-[#e2e3e1]"}`}>
                  {item.label}
                </span>
              </button>
            );
          }
          return (
            <Link key={item.label} to={item.path}
              className="flex items-center px-4 py-3 rounded-lg text-left hover:bg-[#4a463d]/50 w-full transition-colors">
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
              <span className={`pl-3 font-semibold text-sm ${item.danger ? "text-[#ffdad6]" : "text-[#e2e3e1]"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
     
    </aside>
  );
};