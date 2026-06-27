import { useEffect, useState } from "react";

interface Province { code: number; name: string; }
interface District { code: number; name: string; }
interface Ward { code: number; name: string; }

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (address: string) => void;
}

export const AddAddressModal = ({ open, onClose, onSave }: Props) => {
  const [detailAddress, setDetailAddress] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [provinceCode, setProvinceCode] = useState<number>();
  const [districtCode, setDistrictCode] = useState<number>();
  const [wardCode, setWardCode] = useState<number>();

  useEffect(() => {
    if (!open) return;
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, [open]);

  useEffect(() => {
    if (!provinceCode) return;
    fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts || []);
        setDistrictCode(undefined);
        setWardCode(undefined);
        setWards([]);
      });
  }, [provinceCode]);

  useEffect(() => {
    if (!districtCode) return;
    fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setWards(data.wards || []);
        setWardCode(undefined);
      });
  }, [districtCode]);

  const handleSave = () => {
    const province = provinces.find((x) => x.code === provinceCode)?.name;
    const district = districts.find((x) => x.code === districtCode)?.name;
    const ward = wards.find((x) => x.code === wardCode)?.name;

    if (!detailAddress || !province || !district || !ward) {
      alert("Vui lòng nhập đầy đủ địa chỉ");
      return;
    }
    const fullAddress = `${detailAddress}, ${ward}, ${district}, ${province}`;
    onSave(fullAddress);
    setDetailAddress("");
    setProvinceCode(undefined);
    setDistrictCode(undefined);
    setWardCode(undefined);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Thêm địa chỉ mới</h2>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>
        <div className="space-y-4">
          <input
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="Số nhà, tên đường"
            className="w-full border p-3"
          />
          <div className="grid grid-cols-3 gap-3">
            <select value={provinceCode || ""} onChange={(e) => setProvinceCode(Number(e.target.value))} className="border p-3">
              <option value="">Tỉnh / Thành phố</option>
              {provinces.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
            </select>
            <select value={districtCode || ""} onChange={(e) => setDistrictCode(Number(e.target.value))} className="border p-3">
              <option value="">Quận / Huyện</option>
              {districts.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
            </select>
            <select value={wardCode || ""} onChange={(e) => setWardCode(Number(e.target.value))} className="border p-3">
              <option value="">Phường / Xã</option>
              {wards.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="border px-5 py-2">Hủy</button>
            <button onClick={handleSave} className="bg-black text-white px-5 py-2">Lưu địa chỉ</button>
          </div>
        </div>
      </div>
    </div>
  );
};