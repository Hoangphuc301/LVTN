import { type SizeDto } from "./SizeTypes";

interface Props {
  formData: SizeDto;
  setFormData: React.Dispatch<React.SetStateAction<SizeDto>>;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
}

export const SizeForm = ({ formData, setFormData, onSubmit, buttonText }: Props) => {
  return (
    <form onSubmit={onSubmit} className="bg-[#3e403f] border border-[#4a463d] rounded-xl p-6 shadow-lg space-y-6">
      <div className="grid grid-cols-1 gap-6">

        <div>
          <label className="block text-[#e5e2e1] mb-2 font-medium">Danh mục sản phẩm</label>
          <select
            value={formData.maDM}
            onChange={(e) => setFormData({ ...formData, maDM: Number(e.target.value) })}
            className="w-full bg-[#2f3130] border border-[#4a463d] rounded-lg px-4 py-3 text-white">
            <option value={0}>-- Chọn danh mục --</option>
            <option value={1}>Nam</option>
            <option value={2}>Nữ</option>
          </select>
        </div>

        <div>
          <label className="block text-[#e5e2e1] mb-2 font-medium">Tên kích thước</label>
          <input
            type="text"
            value={formData.tenSize}
            onChange={(e) => setFormData({ ...formData, tenSize: e.target.value })}
            className="w-full bg-[#2f3130] border border-[#4a463d] rounded-lg px-4 py-3 text-white outline-none focus:border-[#e5e2e1]"
            placeholder="Ví dụ: L, XL, 39..."
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
            className="w-full bg-[#2f3130] border border-[#4a463d] rounded-lg px-4 py-3 text-white outline-none focus:border-[#e5e2e1]"
          >
            <option value="true">Đang sử dụng</option>
            <option value="false">Ngừng sử dụng</option>
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