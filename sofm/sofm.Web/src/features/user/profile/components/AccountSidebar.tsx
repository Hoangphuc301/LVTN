import {
  User,
  Package,
  MapPin,
  Lock,
  LogOut,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

export const AccountSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const menuItems = [
    {
      path: "/profile",
      title: "Thông tin cá nhân",
      icon: User,
    },
    {
      path: "/profile/orders",
      title: "Đơn hàng của tôi",
      icon: Package,
    },
    {
      path: "/profile/address",
      title: "Địa chỉ",
      icon: MapPin,
    },
    {
      path: "/profile/change-password",
      title: "Đổi mật khẩu",
      icon: Lock,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(
      new Event("userChanged")
    );

    window.location.href = "/";
  };

  return (
    <div className="w-[260px] bg-white rounded-xl shadow-sm p-6 h-fit">
      <h2 className="text-2xl font-serif mb-1">
        Tài khoản của tôi
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Xin chào,{" "}
        {user.tenNguoiDung || "Khách"}
      </p>

      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname ===
            item.path;

          return (
            <button
              key={item.path}
              onClick={() =>
                navigate(item.path)
              }
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
              ${
                isActive
                  ? "bg-[#ebe6dc] font-semibold text-black"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon size={18} />
              <span>
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="border-t mt-8 pt-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:text-red-700 transition-colors font-medium"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};