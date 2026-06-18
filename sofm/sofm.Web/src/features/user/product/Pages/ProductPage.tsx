import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { ShopFilter } from "../components/ShopFilter";
import { getProducts } from "../components/productService";
import type { Product } from "../components/productType";

interface Props {
    category?: "all" | "nam" | "nu" | "phu-kien" | "khuyen-mai";
}

const ITEMS_PER_PAGE = 6;

export const ProductPage = ({ category = "all" }: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);

    useEffect(() => {
        getProducts().then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    }, []);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (category !== "all") {
            result = result.filter((p) => {
                const dm = p.tenDanhMucCha?.toLowerCase().trim();
                switch (category) {
                    case "nam": return dm === "nam";
                    case "nu": return dm === "nữ";
                    case "phu-kien": return dm === "phụ kiện";
                    case "khuyen-mai": return p.giaGiam != null;
                    default: return true;
                }
            });
        }

        if (selectedColor) result = result.filter((p) => p.variants.some((v) => v.tenMau === selectedColor));
        if (selectedSize) result = result.filter((p) => p.variants.some((v) => v.tenSize === selectedSize));

        if (sort === "priceAsc") result.sort((a, b) => a.gia - b.gia);
        if (sort === "priceDesc") result.sort((a, b) => b.gia - a.gia);

        return result;
    }, [products, category, selectedColor, selectedSize, sort]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const colors = useMemo(() => [...new Set(products.flatMap((p) => p.variants.map((v) => v.tenMau)))], [products]);
    const sizes = useMemo(() => [...new Set(products.flatMap((p) => p.variants.map((v) => v.tenSize)))], [products]);

    if (loading) return <div className="p-20 text-center">Đang tải...</div>;

    return (
        <main className="bg-[#f9f9f7] min-h-screen py-12">
            <div className="max-w-[1400px] mx-auto px-10">
                <div className="flex justify-between mb-12">
                    <h1 className="text-4xl font-bold">SẢN PHẨM</h1>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="border px-4 py-2">
                        <option value="newest">Mới nhất</option>
                        <option value="priceAsc">Giá thấp đến cao</option>
                        <option value="priceDesc">Giá cao đến thấp</option>
                    </select>
                </div>

                <div className="flex gap-16">
                    <ShopFilter
                        colors={colors}
                        sizes={sizes}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        clearFilters={() => { setSelectedColor(""); setSelectedSize(""); setPage(1); }}
                    />

                    <section className="flex-1">
                        <div className="grid grid-cols-3 gap-8">
                            {paginatedProducts.map((p) => (<ProductCard key={p.maSp} product={p} />))}
                        </div>

                        {paginatedProducts.length === 0 && <div className="text-center py-20">Không có sản phẩm</div>}

                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 border ${page === i + 1 ? "bg-black text-white" : ""}`}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
};