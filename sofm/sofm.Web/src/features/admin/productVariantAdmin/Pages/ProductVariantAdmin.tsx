import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVariantsByProduct, deleteVariant } from "../components/productVariantService";
import type { ProductVariant } from "../components/productVariantType";
import { getProductById } from "../../productAdmin/components/productService";
import type { Product } from "../../productAdmin/components/productType";

export const ProductVariantAdmin = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [search, setSearch] = useState("");
    const [colorFilter, setColorFilter] = useState("");
    const [sizeFilter, setSizeFilter] = useState("");
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        if (!productId) return;
        const fetchData = async () => {
            try {
                const [variantRes, productRes] = await Promise.all([
                    getVariantsByProduct(Number(productId)),
                    getProductById(Number(productId)),
                ]);
                setVariants(variantRes.data);
                setProduct(productRes.data);
            } catch (err) {
                console.error(err);
                alert("Không thể tải dữ liệu");
            }
        };
        fetchData();
    }, [productId]);

    const handleDelete = async (maCtsp: number) => {
        if (!confirm("Xóa biến thể này?")) return;
        try {
            await deleteVariant(maCtsp);
            setVariants((prev) => prev.filter((x) => x.maCtsp !== maCtsp));
        } catch {
            alert("Xóa thất bại");
        }
    };

    const filteredVariants = variants.filter((v) => {
        const matchSearch = v.tenMau?.toLowerCase().includes(search.toLowerCase()) || v.tenSize?.toLowerCase().includes(search.toLowerCase());
        const matchColor = !colorFilter || v.tenMau === colorFilter;
        const matchSize = !sizeFilter || v.tenSize === sizeFilter;
        return matchSearch && matchColor && matchSize;
    });

    const totalPages = Math.ceil(filteredVariants.length / ITEMS_PER_PAGE);
    const paginatedVariants = filteredVariants.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <button onClick={() => navigate("/admin/products")} className="px-6 py-2 bg-[#3e403f] border border-[#4a463d] text-white rounded-lg">Quay lại</button>
                <button onClick={() => navigate(`/admin/products/${productId}/variants/create`)} className="px-6 py-2 bg-white text-black rounded-lg">Thêm biến thể</button>
            </div>

            {product && (
                <div className="bg-[#3e403f] border border-[#4a463d] rounded-xl p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <img src={product.hinhAnh?.length ? `/${product.hinhAnh[0]}` : "/placeholder.png"} alt={product.tenSp} className="w-32 h-32 object-cover rounded-lg border border-[#4a463d]" />
                        <div className="flex-1">
                            <h1 className="text-3xl text-white font-semibold">{product.tenSp}</h1>
                            <p className="text-gray-300 mt-2">Giá: {product.gia.toLocaleString()} đ</p>
                            <p className="text-gray-300">Danh mục: {product.tenDanhMuc}</p>
                            <p className="text-gray-300">Trạng thái: {product.trangThai ? "Đang bán" : "Ngừng bán"}</p>
                            <p className="text-gray-300">Tổng biến thể: {variants.length}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between gap-4">
                <input type="text" placeholder="Tìm màu hoặc size..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="bg-[#3e403f] border border-[#4a463d] rounded-lg px-4 py-3 text-white w-full md:w-80" />
                <div className="flex gap-3">
                    <select value={colorFilter} onChange={(e) => { setColorFilter(e.target.value); setPage(1); }} className="bg-[#3e403f] border border-[#4a463d] rounded-lg px-4 py-3 text-white">
                        <option value="">Tất cả màu</option>
                        {[...new Set(variants.map((v) => v.tenMau))].map((color) => (<option key={color} value={color}>{color}</option>))}
                    </select>
                    <select value={sizeFilter} onChange={(e) => { setSizeFilter(e.target.value); setPage(1); }} className="bg-[#3e403f] border border-[#4a463d] rounded-lg px-4 py-3 text-white">
                        <option value="">Tất cả size</option>
                        {[...new Set(variants.map((v) => v.tenSize))].map((size) => (<option key={size} value={size}>{size}</option>))}
                    </select>
                </div>
            </div>

            <div className="bg-[#3e403f] rounded-xl overflow-hidden">
                <table className="w-full text-white text-center">
                    <thead className="bg-[#2f3130]">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Màu</th>
                            <th className="p-4">Size</th>
                            <th className="p-4">Tồn kho</th>
                            <th className="p-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedVariants.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8">Không có dữ liệu</td></tr>
                        ) : (
                            paginatedVariants.map((item) => (
                                <tr key={item.maCtsp} className="border-t border-[#4a463d]">
                                    <td className="p-4">{item.maCtsp}</td>
                                    <td className="p-4">{item.tenMau}</td>
                                    <td className="p-4">{item.tenSize}</td>
                                    <td className="p-4">{item.soLuongTon}</td>
                                    <td className="p-4">
                                        <button onClick={() => navigate(`/admin/products/${productId}/variants/edit/${item.maCtsp}`)} className="text-blue-400">Sửa</button>
                                        <button onClick={() => handleDelete(item.maCtsp)} className="ml-4 text-red-400">Xóa</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i} onClick={() => setPage(i + 1)} className={`px-4 py-2 rounded-lg ${page === i + 1 ? "bg-white text-black" : "bg-[#3e403f] text-white"}`}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
