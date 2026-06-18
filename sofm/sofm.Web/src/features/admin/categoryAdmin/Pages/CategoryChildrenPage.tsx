import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryService } from "../components/categoryService";
import { type CategoryDto } from "../components/CategoryTypes";

export const CategoryChildren = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [children, setChildren] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const parentId = Number(id);

    if (!id || isNaN(parentId)) {
        console.error("Invalid category id");
        return;
    }

    const fetchData = async () => {
        try {
            setLoading(true);

            const data = await categoryService.getChildren(parentId);
            setChildren(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

        fetchData();
    }, [id]);

    const handleDelete = async (childId: number) => {
        if (!confirm("Xóa danh mục này?")) return;

        try {
            await categoryService.delete(childId);

            setChildren(prev =>
                prev.filter(x => x.maDM !== childId)
            );
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="space-y-8">

            <div className="flex justify-between items-center">

                <div>
                    <button
                        onClick={() => navigate("/admin/categories")}
                        className="text-[#babfc7]"
                    >
                         Quay lại
                    </button>

                    <h1 className="text-3xl font-bold text-white mt-3">
                        Danh mục con
                    </h1>
                </div>

                <button
                    onClick={() =>
                        navigate(`/admin/categories/${id}/create`)
                    }
                    className="bg-[#e5e2e1] text-black px-6 py-3 rounded-xl"
                >
                    THÊM DANH MỤC CON
                </button>
            </div>

            {loading ? (
                <div className="text-white">Đang tải...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    {children.length === 0 ? (
                        <div className="text-gray-400">
                            Không có danh mục con
                        </div>
                    ) : (
                        children.map((item) => (
                            <div
                                key={item.maDM}
                                className="bg-[#1f2120] rounded-2xl border border-[#4a463d]"
                            >
                                <div className="h-56 bg-[#2f3130]" />

                                <div className="p-5">

                                    <div className="flex justify-between items-center">

                                        <h2 className="text-2xl font-bold text-white">
                                            {item.tenDM}
                                        </h2>

                                        <span className={`text-xs px-3 py-1 rounded-full
                                            ${item.trangThai
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                            }`}
                                        >
                                            {item.trangThai ? "Hiển thị" : "Ẩn"}
                                        </span>

                                    </div>

                                    <p className="text-[#babfc7] mt-3">
                                        {item.moTa}
                                    </p>

                                    <div className="flex justify-end gap-3 mt-6">

                                        <button
                                            onClick={() =>
                                                navigate(`/admin/categories/edit/${item.maDM}`)
                                            }
                                            className="border border-blue-500 px-4 py-2 rounded-lg text-blue-400"
                                        >
                                            Sửa
                                        </button>

                                        <button
                                            onClick={() => handleDelete(item.maDM)}
                                            className="border border-red-500 px-4 py-2 rounded-lg text-red-400"
                                        >
                                            Xóa
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))
                    )}

                </div>
            )}
        </div>
    );
};