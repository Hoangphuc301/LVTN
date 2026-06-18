import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { type ColorDto } from "../components/ColorTypes";

export const ColorAdmin = () => {
    const navigate = useNavigate();
    const [colors, setColors] = useState<ColorDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Tất cả");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchColors = async () => {
            try { setLoading(true);
                const res = await axios.get<ColorDto[]>("https://localhost:7167/api/Color");
                setColors(res.data);
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchColors();
    }, []);

    const tabs = [
        { label: "Tất cả", count: colors.length },
        { label: "Đang sử dụng", count: colors.filter(c => c.trangThai).length },
        { label: "Ngừng sử dụng", count: colors.filter(c => !c.trangThai).length },
    ];

    const filteredColors = colors.filter(c => {
        const matchStatus = activeTab === "Tất cả" || (activeTab === "Đang sử dụng" ? c.trangThai : !c.trangThai);
        const matchSearch = c.tenMau.toLowerCase().includes(searchTerm.toLowerCase()) || c.maHex?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchStatus && matchSearch;
    });

    const handleDelete = async (id: number) => {
        if (!window.confirm("Bạn có chắc muốn xóa màu này?")) return;
        try {
            await axios.delete(`https://localhost:7167/api/Color/${id}`);
            setColors(prev => prev.filter(c => c.maMau !== id));
            alert("Xóa thành công");
        } catch { alert("Xóa thất bại"); }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#e5e2e1]">Quản lý màu sắc</h1>
                <button onClick={() => navigate("/admin/colors/create")} className="bg-[#e5e2e1] text-[#2f3130] px-6 py-3 rounded-lg font-bold hover:bg-white transition">THÊM MÀU MỚI</button>
            </div>

            <div className="flex gap-8 border-b border-[#4a463d] pb-4">
                {tabs.map(tab => (
                    <button key={tab.label} onClick={() => setActiveTab(tab.label)} className={`relative pb-3 font-medium transition-colors ${activeTab === tab.label ? "text-white" : "text-[#ffffff] hover:text-[#e5e2e1]"}`}>
                        {tab.label} ({tab.count})
                        {activeTab === tab.label && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />}
                    </button>
                ))}
            </div>

            <input type="text" placeholder="Tìm theo tên hoặc mã HEX..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-[#3e403f] border border-[#4a463d] rounded-xl px-4 py-3 text-white outline-none focus:border-[#e5e2e1]" />

            {loading ? <div className="text-center text-white py-20">Đang tải...</div> : filteredColors.length === 0 ? <div className="text-center text-white py-20">Không có dữ liệu</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {filteredColors.map(c => (
                        <div key={c.maMau} className="bg-[#3e403f] rounded-2xl border border-[#4a463d] overflow-hidden">
                            <div className="h-40 w-full" style={{ backgroundColor: c.maHex || "#CCCCCC" }} />
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h2 className="text-white text-xl font-bold">{c.tenMau}</h2>
                                        <p className="text-[#babfc7] text-sm mt-1">{c.maHex}</p>
                                    </div>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${c.trangThai
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"}`}>
                                        {c.trangThai
                                            ? `Đang sử dụng (${c.soLuongSuDung})`
                                            : `Ngừng sử dụng (${c.soLuongSuDung})`}
                                    </span>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button onClick={() => navigate(`/admin/colors/edit/${c.maMau}`)} className="flex-1 px-4 py-2 rounded-lg border border-blue-500/40 bg-blue-500/10 text-blue-400 font-medium hover:bg-blue-500/20 hover:border-blue-400 transition-all">Sửa</button>
                                    <button onClick={() => handleDelete(c.maMau)} className="flex-1 px-4 py-2 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 hover:border-red-400 transition-all">Xóa</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};