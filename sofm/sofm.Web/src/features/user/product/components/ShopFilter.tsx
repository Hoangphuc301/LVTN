interface Props {
    colors: string[];
    sizes: string[];
    selectedColor: string;
    setSelectedColor: (value: string) => void;
    selectedSize: string;
    setSelectedSize: (value: string) => void;
    clearFilters: () => void;
}

export const ShopFilter = ({ colors, sizes, selectedColor, setSelectedColor, selectedSize, setSelectedSize, clearFilters }: Props) => {
    return (
        <aside className="w-64 flex-shrink-0 space-y-8">
            <div>
                <h3 className="font-bold border-b pb-2 mb-4">Màu sắc</h3>
                <div className="space-y-2">
                    {colors.map((color) => (
                        <label key={color} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" checked={selectedColor === color} onChange={() => setSelectedColor(color)} />
                            {color}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold border-b pb-2 mb-4">Kích thước</h3>
                <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`border p-2 ${selectedSize === size ? "bg-black text-white" : ""}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <button onClick={clearFilters} className="w-full border py-3 font-semibold hover:bg-black hover:text-white transition">
                XÓA BỘ LỌC
            </button>
        </aside>
    );
};