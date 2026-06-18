import { useState } from "react";
import { Search, X } from "lucide-react";

export const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hotKeywords = ["smartjean", "Áo thun", "Áo polo", "Quần short", "Áo khoác", "Quần tây"];

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="hover:text-black text-gray-600 transition-colors">
        <Search size={20} strokeWidth={1.5} />
      </button>

      {isOpen && (
        <div className="absolute top-0 left-0 w-full bg-white border-b-2 border-black p-10 z-50 shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <input autoFocus placeholder="Tìm kiếm sản phẩm..." className="w-full border-2 border-black p-3 outline-none font-bold"/>
              <button className="border-2 border-black p-3 hover:bg-black hover:text-white">
                <Search size={24} />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4">Từ khóa nổi bật hôm nay</h3>
              <div className="flex flex-wrap gap-3">
                {hotKeywords.map((word) => (
                  <button key={word} className="border-2 border-black px-5 py-2 font-medium hover:bg-black hover:text-white transition-all">
                    {word}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};