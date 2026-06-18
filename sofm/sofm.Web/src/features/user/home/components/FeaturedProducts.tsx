import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Áo Blazer Cổ Điển", color: "Đen", price: "4.500.000 ₫", image: "/product/AoBlazerDen.png" },
  { id: 2, name: "Áo Sơ Mi Oversize", color: "Trắng", price: "2.200.000 ₫", image: "/product/Áo Sơ Mi Trắng.png" },
  { id: 3, name: "Quần Tây Ống Suông", color: "Be", price: "3.100.000 ₫", image: "/product/Quần Tây Ống Rộng.png" },
  { id: 4, name: "Túi Xách Studio", color: "Đen", price: "8.500.000 ₫", image: "/product/Túi Xách Da Đen.png" },
];

export const FeaturedProducts = () => (
  <section className="py-20 px-20 bg-[#f4f4f2]">
    <div className="max-w-[1440px] mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl font-serif">Sản phẩm nổi bật</h2>
        <Link to="/shop" className="border-b border-black font-semibold tracking-widest text-sm uppercase hover:text-gray-600">
          XEM TẤT CẢ
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-8">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="flex flex-col gap-4 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="aspect-[3/4] bg-[#e2e3e1] rounded-lg overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
            </div>
            <div className="text-center">
              <h3 className="text-base font-normal group-hover:underline underline-offset-4">{product.name}</h3>
              <p className="text-xs text-[#444748] mt-1">{product.color}</p>
              <p className="text-sm font-semibold mt-2 tracking-[1.4px]">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);