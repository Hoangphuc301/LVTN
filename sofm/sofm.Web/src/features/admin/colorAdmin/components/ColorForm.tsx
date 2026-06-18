import { useState } from "react";
import axios from "axios";
import { type ColorDto } from "./ColorTypes";

interface Props {
    formData: ColorDto;
    setFormData: React.Dispatch<React.SetStateAction<ColorDto>>;
    onSubmit: (e: React.FormEvent) => void;
    buttonText: string;
}

export const ColorForm = ({ formData, setFormData, onSubmit, buttonText }: Props) => {
    const [autoGen, setAutoGen] = useState(true);

    const updateColor = async (hex: string, updateName = autoGen) => {
        let name = formData.tenMau;
        if (updateName) {
            try {
                const res = await axios.get(`https://www.thecolorapi.com/id?hex=${hex.replace("#", "")}`);
                name = res.data.name.value;
            } catch { console.error("Lỗi lấy tên màu"); }
        }
        setFormData(prev => ({ ...prev, maHex: hex.toUpperCase(), tenMau: name }));
    };

    const inputClass = "w-full bg-[#2f3130] border border-[#4a463d] rounded-lg px-4 py-3 text-white outline-none focus:border-[#e5e2e1]";

    return (
        <form onSubmit={onSubmit} className="bg-[#3e403f] border border-[#4a463d] rounded-xl p-6 shadow-lg space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-[#e5e2e1] mb-2 font-medium">Tên màu</label>
                    <input type="text" value={formData.tenMau} onChange={e => setFormData({ ...formData, tenMau: e.target.value })} className={inputClass} disabled={autoGen} placeholder="Ví dụ: Đỏ đô" />
                    {autoGen && <p className="text-xs text-[#babfc7] mt-2">Tên màu sẽ được tự động lấy từ mã HEX.</p>}
                </div>

                <div>
                    <label className="block text-[#e5e2e1] mb-2 font-medium">Mã HEX</label>
                    <div className="flex gap-4 items-center">
                        <input type="text" value={formData.maHex || ""} placeholder="#FFFFFF" className={inputClass.replace("w-full", "flex-1")} onChange={e => setFormData({ ...formData, maHex: e.target.value.toUpperCase() })} onBlur={() => autoGen && formData.maHex && /^#[0-9A-F]{6}$/i.test(formData.maHex) && updateColor(formData.maHex)} />
                        <input type="color" value={formData.maHex || "#000000"} onChange={e => updateColor(e.target.value)} className="w-14 h-14 rounded-lg cursor-pointer bg-transparent border border-[#4a463d]" />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input type="checkbox" checked={autoGen} onChange={e => setAutoGen(e.target.checked)} className="w-5 h-5 accent-white cursor-pointer" />
                    <label className="text-[#e5e2e1] cursor-pointer">Tự động lấy tên màu từ mã HEX</label>
                </div>

                <div className="flex items-center gap-4 bg-[#2f3130] border border-[#4a463d] rounded-xl p-4">
                    <div className="w-16 h-16 rounded-lg border border-[#4a463d]" style={{ backgroundColor: formData.maHex || "#000000" }} />
                    <div>
                        <p className="text-white font-semibold text-lg">{formData.tenMau || "Chưa có tên màu"}</p>
                        <p className="text-[#babfc7] font-mono">{formData.maHex || "#000000"}</p>
                    </div>
                </div>

                <div>
                    <label className="block text-[#e5e2e1] mb-2 font-medium">Trạng thái</label>
                    <select value={String(formData.trangThai)} onChange={e => setFormData({ ...formData, trangThai: e.target.value === "true" })} className={inputClass}>
                        <option value="true">Đang sử dụng</option>
                        <option value="false">Ngừng sử dụng</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" className="bg-[#e5e2e1] text-[#2f3130] px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors">{buttonText}</button>
            </div>
        </form>
    );
};