import { ShoppingBag, User } from 'lucide-react';
import { useState } from 'react';
import { CartSidePanel } from "@/features/user/cart/components/CartSidePanel";
import { Link } from 'react-router-dom';
import { SearchModal } from './SearchModal';

const navItems = [
  { label: "Trang chủ", href: "/", active: true },
  { label: "Cửa hàng", href: "/shop" },
  { label: "Nam", href: "/nam" },
  { label: "Nữ", href: "/nu" },
  { label: "Khuyến mãi", href: "/voucher" },
  { label: "Liên hệ", href: "/contact" },
];

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="fixed w-full z-50 bg-[#f9f9f7cc] backdrop-blur-md h-20 flex items-center justify-between px-20 border-b border-gray-100">
        <a href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-4xl font-bold font-serif">SOFM</h1>
        </a>

        <nav className="flex gap-8">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} 
              className={`text-sm font-medium ${item.active ? "border-b-2 border-black" : "text-gray-600 hover:text-black"}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <SearchModal />
          
          <button onClick={() => setIsCartOpen(true)} className="hover:text-black text-gray-600 transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
          
          <Link to="/login" className="hover:text-black text-gray-600 transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      <CartSidePanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};