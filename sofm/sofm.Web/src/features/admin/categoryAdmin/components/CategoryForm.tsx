import { type CategoryDto } from "./CategoryTypes";

interface Props {
  formData: CategoryDto;
  setFormData: React.Dispatch<React.SetStateAction<CategoryDto>>;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
}

export const CategoryForm = ({ formData, setFormData, onSubmit, buttonText }: Props) => {
  return (
    <form onSubmit={onSubmit} className="bg-[#3e403f] border border-[#4a463d] rounded-xl p-6 shadow-lg space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-[#e5e2e1] mb-2 font-medium">Tên danh mục</label>
          <input
            type="text"
            value={formData.tenDM}
            onChange={(e) => setFormData({ ...formData, tenDM: e.target.value })}
            className="w-full bg-[#2f3130] border border-[#4a463d] rounded-lg px-4 py-3 text-white outline-none focus:border-[#e5e2e1]"
            placeholder="Ví dụ: Thời trang nam, Giày dép..."
            required
          />
        </div>

        <div>
          <label className="block text-[#e5e2e1] mb-2 font-medium">Mô tả chi tiết</label>
          <textarea
            rows={3}
            value={formData.moTa || ""}
            onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
            className="w-full bg-[#2f3130] border border-[#4a463d] rounded-lg px-4 py-3 text-white outline-none focus:border-[#e5e2e1]"
          />
        </div>

        <div>
          <label className="block text-[#e5e2e1] mb-2 font-medium">Trạng thái</label>
          <select
            value={String(formData.trangThai)}
            onChange={(e) => setFormData({ ...formData, trangThai: e.target.value === "true" })}
            className="w-full bg-[#2f3130] border border-[#4a463d] rounded-lg px-4 py-3 text-white outline-none focus:border-[#e5e2e1]">
            <option value="true">Hiển thị</option>
            <option value="false">Ẩn</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-[#e5e2e1] text-[#2f3130] px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};