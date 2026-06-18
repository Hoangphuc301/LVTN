import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { type SizeDto } from "../components/SizeTypes";

export const SizeAdmin = () => {
    const navigate = useNavigate();
    const [sizes, setSizes] = useState<SizeDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Tất cả");

    useEffect(() => {
        const fetchSizes = async () => {
            try { setLoading(true);
                const res = await axios.get<SizeDto[]>("https://localhost:7167/api/Size");
                setSizes(res.data);
            } catch (error) { console.error("Lỗi khi tải size:", error);
            } finally { setLoading(false); }
        };
        fetchSizes();
    }, []);

    const filteredSizes = activeTab === "Tất cả" ? sizes : sizes.filter((s) => activeTab === "Đang sử dụng" ? s.trangThai : !s.trangThai);
    
    const tabs = [
        { label: "Tất cả", count: sizes.length },
        { label: "Đang sử dụng", count: sizes.filter((s) => s.trangThai).length },
        { label: "Ngừng sử dụng", count: sizes.filter((s) => !s.trangThai).length },
    ];

    const groupedSizes = filteredSizes.reduce((acc, size) => {
        if (!acc[size.tenDM]) acc[size.tenDM] = [];
        acc[size.tenDM].push(size);
        return acc;
    }, {} as Record<string, SizeDto[]>);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa size này?")) return;
        try {
            await axios.delete(`https://localhost:7167/api/Size/${id}`);
            setSizes((prev) => prev.filter((s) => s.maSize !== id));
            alert("Xóa thành công");
        } catch (error) { console.error(error); alert("Xóa thất bại"); }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#e5e2e1]">Quản lý bảng size</h1>
                <button onClick={() => navigate("/admin/sizes/create")} className="bg-[#e5e2e1] text-[#2f3130] px-6 py-3 rounded-lg font-bold hover:bg-white transition">THÊM BẢNG SIZE</button>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-[#4a463d] pb-4">
                {tabs.map((tab) => (
                    <button key={tab.label} onClick={() => setActiveTab(tab.label)} className={`relative pb-3 font-medium transition-colors ${activeTab === tab.label ? "text-white" : "text-[#ffffff] hover:text-[#e5e2e1]"}`}>
                        {tab.label} ({tab.count})
                        {activeTab === tab.label && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />}
                    </button>
                ))}
            </div>

            {/* Content */}
            {loading ? <div className="text-center text-white py-20">Đang tải...</div> : Object.keys(groupedSizes).length === 0 ? <div className="text-center text-white py-20">Không có dữ liệu</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Object.entries(groupedSizes).map(([category, items]) => (
                        <div key={category} className="bg-[#3e403f] rounded-2xl border border-[#4a463d] p-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-white">{category}</h2>
                                <p className="text-sm text-[#babfc7]">{items.length} kích thước</p>
                            </div>
                            
                            <div className="space-y-4">
                                {items.map((size) => (
                                    <div key={size.maSize} className="border border-[#4a463d] rounded-xl p-4 flex justify-between items-center">
                                        <div>
                                            <div className="text-white font-bold text-lg">{size.tenSize}</div>
                                            <div className="text-sm text-[#babfc7]">{size.moTa || "Không có mô tả"}</div>
                                            <div className={`text-sm mt-2 ${size.trangThai ? "text-green-400" : "text-red-400"}`}>
                                                {size.trangThai ? "Đang sử dụng" : "Ngừng sử dụng"}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button onClick={() => navigate(`/admin/sizes/edit/${size.maSize}`)} className="text-blue-400 hover:text-blue-300">Sửa</button>
                                            <button onClick={() => handleDelete(size.maSize)} className="text-red-400 hover:text-red-300">Xóa</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button onClick={() => navigate("/admin/sizes/create")} className="w-full mt-6 border border-dashed border-[#] rounded-lg py-3 text-[#ffffff] hover:text-white hover:border-white transition">
                                Thêm kích thước
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};