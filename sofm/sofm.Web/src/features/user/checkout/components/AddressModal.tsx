import type { AddressResponse } from "../../profile/components/AddressType";

interface Props {
  open: boolean;
  addresses: AddressResponse[];
  selectedAddress: AddressResponse | null;
  onSelect: (address: AddressResponse) => void;
  onClose: () => void;
  onAdd: () => void;
}

export const AddressModal = ({ open, addresses, selectedAddress, onSelect, onClose, onAdd }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[600px] p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Chọn địa chỉ</h2>
        {addresses.map((address) => (
          <div key={address.maDiaChi} className="border p-4 mb-3 rounded">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={selectedAddress?.maDiaChi === address.maDiaChi}
                onChange={() => onSelect(address)}
              />
              <span>{address.diaChiChiTiet}</span>
            </label>
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <button onClick={onAdd} className="bg-black text-white px-5 py-2">Thêm địa chỉ</button>
          <button onClick={onClose} className="border px-5 py-2">Đóng</button>
        </div>
      </div>
    </div>
  );
};