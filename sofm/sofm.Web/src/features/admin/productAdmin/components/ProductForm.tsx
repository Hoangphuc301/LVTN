import { useEffect, useState } from "react";
import { type ProductFormModel } from "./ProductFormModel";
import { categoryService } from "@/features/admin/categoryAdmin/components/categoryService";
import { getAllSizes } from "@/features/admin/sizeAdmin/components/sizeService";
import { colorService } from "@/features/admin/colorAdmin/components/colorService";

interface Props {
    formData: ProductFormModel;
    setFormData: React.Dispatch<React.SetStateAction<ProductFormModel>>;
    onSubmit: (e: React.FormEvent) => void;
    buttonText: string;
}

interface CategoryDto { maDM: number; tenDM: string; }
interface SizeDto { maSize: number; tenSize: string; }
interface ColorDto { maMau: number; tenMau: string; }

export const ProductForm = ({ formData, setFormData, onSubmit, buttonText }: Props) => {
    const [parents, setParents] = useState<CategoryDto[]>([]);
    const [children, setChildren] = useState<CategoryDto[]>([]);
    const [sizes, setSizes] = useState<SizeDto[]>([]);
    const [colors, setColors] = useState<ColorDto[]>([]);
    
    const [selectedColor, setSelectedColor] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);

    useEffect(() => {
        categoryService.getParents().then(setParents);
        getAllSizes().then(res => setSizes(res.data));
        colorService.getAll().then(setColors);
    }, []);

    useEffect(() => {
        if (!formData.maDmCha) return;
        categoryService.getChildren(formData.maDmCha).then(setChildren);
    }, [formData.maDmCha]);

    const inputClass = "w-full bg-[#2f3130] border border-[#4a463d] rounded-lg px-4 py-3 text-white outline-none focus:border-white";
    const labelClass = "text-[#e5e2e1] font-medium mb-2 block";

    return (
        <form onSubmit={onSubmit} className="bg-[#3e403f] border border-[#4a463d] rounded-xl p-6 space-y-6">
            <h2 className="text-white text-2xl font-semibold">{buttonText}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>Danh mục cha</label>
                    <select className={inputClass} value={formData.maDmCha ?? ""} onChange={(e) => setFormData({ ...formData, maDmCha: Number(e.target.value), maDm: undefined })}>
                        <option value="">Chọn danh mục cha</option>
                        {parents.map(p => <option key={p.maDM} value={p.maDM}>{p.tenDM}</option>)}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Danh mục con</label>
                    <select className={inputClass} value={formData.maDm ?? ""} onChange={(e) => setFormData({ ...formData, maDm: Number(e.target.value) })}>
                        <option value="">Chọn danh mục con</option>
                        {children.map(c => <option key={c.maDM} value={c.maDM}>{c.tenDM}</option>)}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className={labelClass}>Tên sản phẩm</label>
                    <input className={inputClass} value={formData.tenSp} onChange={(e) => setFormData({ ...formData, tenSp: e.target.value })} />
                </div>

                <div>
                    <label className={labelClass}>Giá</label>
                    <input type="number" className={inputClass} value={formData.gia} onChange={(e) => setFormData({ ...formData, gia: Number(e.target.value) })} />
                </div>

                <div>
                    <label className={labelClass}>Giá giảm</label>
                    <input type="number" className={inputClass} value={formData.giaGiam ?? ""} onChange={(e) => setFormData({ ...formData, giaGiam: Number(e.target.value) })} />
                </div>

                <div>
                    <label className={labelClass}>Trạng thái</label>
                    <select className={inputClass} value={String(formData.trangThai ? "true" : "false")} onChange={(e) => setFormData({ ...formData, trangThai: e.target.value === "true" })}>
                        <option value="true">Đang bán</option>
                        <option value="false">Ngừng bán</option>
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Hình ảnh</label>
                    <input type="file" multiple className={inputClass} onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        const paths = files.map(f => `product/${f.name}`);
                        setFormData(prev => ({ ...prev, hinhAnh: [...new Set([...prev.hinhAnh, ...paths])] }));
                        e.target.value = "";
                    }} />
                    <div className="flex gap-2 mt-4 flex-wrap">
                        {formData.hinhAnh.map((img, idx) => (
                            <div key={idx} className="relative">
                                <img src={`/${img}`} alt={`Preview ${idx}`} className="w-20 h-20 object-cover rounded border border-gray-600" />
                                <button type="button" onClick={() => setFormData(prev => ({ ...prev, hinhAnh: prev.hinhAnh.filter((_, i) => i !== idx) }))} 
                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-sm hover:bg-red-600">×</button>
                            </div>
                        ))}
                    </div>
                    {formData.hinhAnh.length > 0 && <p className="mt-2 text-sm text-gray-400">Đã chọn {formData.hinhAnh.length} ảnh</p>}
                </div>

            </div>

            <div className="border-t border-[#4a463d] pt-6">
                <h3 className="text-white text-lg mb-4">Biến thể sản phẩm</h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <select className={inputClass} value={selectedColor} onChange={(e) => setSelectedColor(Number(e.target.value))}>
                        <option value={0}>Chọn màu</option>
                        {colors.map(c => <option key={c.maMau} value={c.maMau}>{c.tenMau}</option>)}
                    </select>
                    <select className={inputClass} value={selectedSize} onChange={(e) => setSelectedSize(Number(e.target.value))}>
                        <option value={0}>Chọn size</option>
                        {sizes.map(s => <option key={s.maSize} value={s.maSize}>{s.tenSize}</option>)}
                    </select>
                    <input type="number" placeholder="SL tồn" className={inputClass} value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                    <button type="button" className="bg-blue-600 rounded-lg text-white hover:bg-blue-700" onClick={() => { 
                        if (!selectedColor || !selectedSize) return alert("Chọn màu và size");
                        setFormData({ ...formData, variants: [...formData.variants, { maMau: selectedColor, maSize: selectedSize, soLuongTon: stock }] });
                        setSelectedColor(0); setSelectedSize(0); setStock(0);
                    }}>Thêm</button>
                </div>

                <div className="mt-4 space-y-2">
                    {formData.variants.map((v, index) => {
                        const color = colors.find(c => c.maMau === v.maMau);
                        const size = sizes.find(s => s.maSize === v.maSize);
                        return (
                            <div key={index} className="bg-[#2f3130] p-3 rounded flex justify-between text-white">
                                <span>{color?.tenMau} - {size?.tenSize} - Tồn: {v.soLuongTon}</span>
                                <button type="button" className="text-red-400 hover:text-red-300" onClick={() => setFormData({ ...formData, variants: formData.variants.filter((_, i) => i !== index) })}>Xóa</button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <button type="submit" className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200">{buttonText}</button>
        </form>
    );
};