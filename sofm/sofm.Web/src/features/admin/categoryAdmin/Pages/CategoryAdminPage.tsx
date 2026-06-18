import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../components/categoryService";
import { type CategoryDto } from "../components/CategoryTypes";

export const CategoryAdmin = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await categoryService.getParents();
                setCategories(data || []);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Bạn có chắc muốn xóa danh mục này?")) return;

        try {
            await categoryService.delete(id);
            setCategories(prev => prev.filter(x => x.maDM !== id));
        } catch (error) {
            console.error(error);
            alert("Xóa thất bại!");
        }
    };

    const getCategoryImage = (name: string) => {
        const lower = name.toLowerCase();

        if (lower.includes("nam")) return "/product/AoSoMi.png";
        if (lower.includes("nữ") || lower.includes("nu")) return "/product/DamDaHoi.png";
        if (lower.includes("phụ kiện") || lower.includes("phu kien")) return "/product/PhuKien.png";

        return "/product/QuanTay.png";
    };

    const filteredCategories = categories.filter(item =>
        item.tenDM.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">

                <div>
                    <h1 className="text-3xl font-bold text-[#e5e2e1]">
                        Quản lý danh mục
                    </h1>

                    <p className="text-[#babfc7] mt-2">
                        Quản lý các loại sản phẩm trong hệ thống thương mại điện tử thời trang cao cấp.
                    </p>

                    <p className="text-sm text-[#9aa0a6] mt-1">
                        Danh mục cha
                    </p>
                </div>

                <button
                    onClick={() => navigate("/admin/categories/create")}
                    className="bg-[#e5e2e1] text-black px-6 py-3 rounded-xl font-semibold hover:bg-white transition"
                >
                     THÊM DANH MỤC
                </button>
            </div>

            <div>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm danh mục..."
                    className="w-full bg-[#2f3130] border border-[#4a463d]
                    text-white px-4 py-3 rounded-lg outline-none"
                />
            </div>

            {loading ? (
                <div className="text-white">Đang tải...</div>
            ) : filteredCategories.length === 0 ? (
                <div className="text-gray-400">Không có danh mục</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    {filteredCategories.map((item) => (
                        <div
                            key={item.maDM}
                            className="bg-[#1f2120] rounded-2xl border border-[#4a463d] overflow-hidden hover:border-white transition"
                        >
                            <div
                                onClick={() =>
                                    navigate(`/admin/categories/${item.maDM}`)
                                }
                                className="cursor-pointer"
                            >

                                <div className="h-44 bg-[#2f3130] flex items-center justify-center">
                                    <img
                                        src={getCategoryImage(item.tenDM)}
                                        alt={item.tenDM}
                                        className="h-24 object-contain opacity-90"
                                        onError={(e) => {
                                            e.currentTarget.src = "/product/default.png";
                                        }}
                                    />
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-center">

                                        <h2 className="text-xl text-white font-bold">
                                            {item.tenDM}
                                        </h2>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${
                                                item.trangThai
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-red-500/20 text-red-400"
                                            }`}
                                        >
                                            {item.trangThai ? "Hiển thị" : "Ẩn"}
                                        </span>
                                    </div>

                                    <p className="text-[#babfc7] mt-3 text-sm">
                                        {item.moTa || "Không có mô tả"}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-3">
                                        Click để xem danh mục con →
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 p-5 pt-0">

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/admin/categories/edit/${item.maDM}`);
                                    }}
                                    className="border border-blue-500 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/10"
                                >
                                    Sửa
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item.maDM);
                                    }}
                                    className="border border-red-500 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/10"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};