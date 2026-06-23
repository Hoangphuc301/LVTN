import { ShoppingBag, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartSidePanel } from "@/features/user/cart/components/CartSidePanel";
import { SearchModal } from "./SearchModal";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Cửa hàng", href: "/shop" },
  { label: "Nam", href: "/nam" },
  { label: "Nữ", href: "/nu" },
  { label: "Khuyến mãi", href: "/voucher" },
  { label: "Liên hệ", href: "/contact" },
];

interface UserInfo {
  maTK: number;
  email: string;
  tenNguoiDung: string;
  role: string;
}

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    loadUser();
    window.addEventListener("userChanged", loadUser);
    return () => window.removeEventListener("userChanged", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  return (
    <>
      <header className="fixed w-full z-50 bg-[#f9f9f7cc] backdrop-blur-md h-20 flex items-center justify-between px-20 border-b border-gray-100">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-4xl font-bold font-serif">SOFM</h1>
        </Link>
        <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} className={`text-sm font-medium pb-1 transition-all ${location.pathname === item.href ? "border-b-2 border-black text-black" : "text-gray-600 hover:text-black"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <SearchModal />
          <button onClick={() => setIsCartOpen(true)} className="hover:text-black text-gray-600 transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
          {!user ? (
            <Link to="/login" className="hover:text-black text-gray-600 transition-colors">
              <User size={20} strokeWidth={1.5} />
            </Link>
          ) : (
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors">
                <User size={20} strokeWidth={1.5} />
                <span className="text-sm font-medium">{user.tenNguoiDung}</span>
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user.tenNguoiDung}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{user.role}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors">Thông tin tài khoản</Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <CartSidePanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};