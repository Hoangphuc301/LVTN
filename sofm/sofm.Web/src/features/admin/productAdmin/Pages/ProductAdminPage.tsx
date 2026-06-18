import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ProductVariant {
    maMau: number;
    tenMau: string;
    maSize: number;
    tenSize: string;
    soLuongTon: number;
}

interface Product {
    maSp: number;
    tenSp: string;
    gia: number;
    giaGiam?: number | null;
    trangThai?: boolean | null;

    hinhAnh?: string;

    tenDanhMuc?: string;
    tenDanhMucCha?: string;

    variants?: ProductVariant[];
}

export const ProductAdmin = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<Product[]>("https://localhost:7167/api/Product");
                setProducts(res.data || []);
            } catch (error) { console.error("Lỗi khi tải dữ liệu:", error); }
            finally { setLoading(false); }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
        try {
            await axios.delete(`https://localhost:7167/api/Product/${id}`);
            setProducts(prev => prev.filter(p => p.maSp !== id));
        } catch (error) { console.error(error); alert("Xóa thất bại!"); }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-medium text-[#e5e2e1]">Quản lý Sản phẩm</h1>
                <button onClick={() => navigate("/admin/products/create")} className="bg-[#e5e2e1] text-[#2f3130] px-6 py-2 rounded-lg font-semibold hover:bg-white">Thêm mới</button>
            </div>
            <div className="bg-[#3e403f] rounded-xl overflow-hidden border border-[#4a463d]">
                <table className="w-full text-left">
                    <thead className="bg-[#2f3130] text-[#a0a09e] text-sm uppercase">
                        <tr>
                            <th className="p-4">Sản phẩm</th>
                            <th className="p-4">Danh mục</th>
                            <th className="p-4">Mã</th>
                            <th className="p-4">Giá</th>
                            <th className="p-4">Trạng thái</th>
                            <th className="p-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#4a463d] text-white">
                        {loading ? <tr><td colSpan={6} className="p-4 text-center">Đang tải...</td></tr> : products.length === 0 ? <tr><td colSpan={6} className="p-4 text-center">Không có sản phẩm</td></tr> : 
                        products.map((item) => {
                            const firstVariant = item.variants?.[0];
                            return (
                                <tr key={item.maSp} className="hover:bg-[#4a463d]/30">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={item.hinhAnh && item.hinhAnh.length > 0 
                                                    ? `/${item.hinhAnh[0]}` 
                                                    : "/product/default.png"} 
                                                className="w-12 h-12 rounded object-cover border border-[#4a463d]" />
                                            <div>
                                                <div className="font-medium">{item.tenSp}</div>
                                                <div className="text-xs text-gray-400">{firstVariant ? `${firstVariant.tenMau} • ${firstVariant.tenSize}` : "Chưa có biến thể"}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-300">{item.tenDanhMucCha || "Chưa phân loại"}</td>
                                    <td className="p-4">{item.maSp}</td>
                                    <td className="p-4">{item.gia?.toLocaleString() ?? 0} đ</td>
                                    <td className={`p-4 ${item.trangThai ? "text-green-400" : "text-red-400"}`}>{item.trangThai ? "Đang bán" : "Ngừng bán"}</td>
                                    <td className="p-4">
                                        <button onClick={() => navigate(`/admin/products/edit/${item.maSp}`)} className="text-blue-400 hover:text-blue-600">Sửa</button>
                                        <button onClick={() => handleDelete(item.maSp)} className="text-red-400 hover:text-red-600 ml-3">Xóa</button>
                                        <button onClick={() => navigate(`/admin/products/${item.maSp}/variants`)} className="text-yellow-400 hover:text-yellow-600 ml-3">Biến thể</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex justify-between items-center p-4 bg-[#2f3130] text-sm text-[#a0a09e]"><span>Hiển thị {products.length} sản phẩm</span></div>
            </div>
        </div>
    );
};