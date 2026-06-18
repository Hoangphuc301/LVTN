import { useEffect, useState } from "react";
import { getAllSizes } from "@/features/admin/sizeAdmin/components/sizeService";
import { colorService } from "@/features/admin/colorAdmin/components/colorService";
import type { ProductVariant } from "./productVariantType";

interface Props {
    formData: ProductVariant;
    setFormData: React.Dispatch<React.SetStateAction<ProductVariant>>;
    onSubmit: (e: React.FormEvent) => void;
    buttonText: string;
}

interface SizeDto { maSize: number; tenSize: string; }
interface ColorDto { maMau: number; tenMau: string; }

export const ProductVariantForm = ({ formData, setFormData, onSubmit, buttonText }: Props) => {
    const [sizes, setSizes] = useState<SizeDto[]>([]);
    const [colors, setColors] = useState<ColorDto[]>([]);

    useEffect(() => {
        getAllSizes().then((res) => setSizes(res.data));
        colorService.getAll().then(setColors);
    }, []);

    const inputClass = "w-full bg-[#2f3130] border border-[#4a463d] rounded-lg px-4 py-3 text-white outline-none focus:border-white";
    const labelClass = "text-[#e5e2e1] font-medium mb-2 block";

    return (
        <form onSubmit={onSubmit} className="bg-[#3e403f] border border-[#4a463d] rounded-xl p-6 space-y-6">
            <h2 className="text-2xl text-white font-semibold">{buttonText}</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>Màu sắc</label>
                    <select className={inputClass} value={formData.maMau} onChange={(e) => setFormData({ ...formData, maMau: Number(e.target.value) })}>
                        <option value={0}>Chọn màu</option>
                        {colors.map((c) => (<option key={c.maMau} value={c.maMau}>{c.tenMau}</option>))}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Size</label>
                    <select className={inputClass} value={formData.maSize} onChange={(e) => setFormData({ ...formData, maSize: Number(e.target.value) })}>
                        <option value={0}>Chọn size</option>
                        {sizes.map((s) => (<option key={s.maSize} value={s.maSize}>{s.tenSize}</option>))}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className={labelClass}>Số lượng tồn</label>
                    <input type="number" min={0} className={inputClass} value={formData.soLuongTon} onChange={(e) => setFormData({ ...formData, soLuongTon: Number(e.target.value) })} />
                </div>
            </div>
            <button type="submit" className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200">
                {buttonText}
            </button>
        </form>
    );
};