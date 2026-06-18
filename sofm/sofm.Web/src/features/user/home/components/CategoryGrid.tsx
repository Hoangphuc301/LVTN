import { Link } from "react-router-dom";

const categories = [
  { title: "Nữ", img: "banner/Thoitrangnu.png", span: "col-span-2 row-span-2", path: "/nu" },
  { title: "Nam", img: "banner/ThoitrangNam.png", span: "row-span-1", path: "/nam" },
  { title: "Phụ kiện", img: "banner/Phukien.png", span: "row-span-1", path: "/phu-kien" },
];

export const CategoryGrid = () => (
  <section className="py-20 px-20">
    <div className="max-w-[1440px] mx-auto grid grid-cols-3 gap-6 h-[768px]">
      {categories.map((cat) => (
        <Link 
          key={cat.title} 
          to={cat.path} 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Thêm đoạn này vào
          className={`relative rounded-xl overflow-hidden ${cat.span} group`}
        >
          <img 
            src={cat.img} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt={cat.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex flex-col justify-end">
            <h3 className="text-white text-3xl font-serif">{cat.title}</h3>
            <span className="text-white text-sm border-b border-white w-fit mt-2">XEM THÊM</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);