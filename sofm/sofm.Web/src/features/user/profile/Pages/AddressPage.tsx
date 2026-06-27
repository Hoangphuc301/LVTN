import { useEffect, useState } from "react";
import { AccountSidebar } from "../components/AccountSidebar";
import { getProfile } from "../components/ProfileService";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../components/AddressService";
import type { ProfileResponse } from "../components/ProfileType";
import type { AddressResponse } from "../components/AddressType";
import { AddAddressModal } from "../../checkout/components/AddAddressModal";

export const AddressPage = () => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  const fetchData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const profileData = await getProfile(user.maTK);
      setProfile(profileData);
      const addressData = await getAddresses(profileData.maKH);
      setAddresses(addressData);
    } catch {
      alert("Không thể tải dữ liệu");
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const handleAddAddress = async (fullAddress: string) => {
    if (!profile) return;
    try {
      await addAddress({ maKH: profile.maKH, diaChiChiTiet: fullAddress });
      await fetchData();
      setShowAddAddressModal(false);
    } catch {
      alert("Không thể thêm địa chỉ");
    }
  };

  const handleDelete = async (maDiaChi: number) => {
    if (!window.confirm("Bạn có chắc muốn xoá địa chỉ này?")) return;
    try {
      await deleteAddress(maDiaChi);
      await fetchData();
    } catch {
      alert("Không thể xoá địa chỉ");
    }
  };

  const handleDefault = async (maDiaChi: number) => {
    if (!profile) return;
    try {
      await setDefaultAddress({ maKH: profile.maKH, maDiaChi });
      await fetchData();
    } catch {
      alert("Không thể đặt địa chỉ mặc định");
    }
  };

  const handleUpdate = async (maDiaChi: number) => {
    if (!editingValue.trim()) {
      alert("Vui lòng nhập địa chỉ");
      return;
    }
    try {
      await updateAddress({ maDiaChi, diaChiChiTiet: editingValue });
      setEditingId(null);
      setEditingValue("");
      await fetchData();
    } catch {
      alert("Không thể cập nhật địa chỉ");
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5f2] py-12">
      <div className="max-w-7xl mx-auto px-6 flex gap-8">
        <AccountSidebar />
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-serif">Địa chỉ của tôi</h1>
                <p className="text-gray-500 mt-2">Quản lý địa chỉ giao hàng</p>
              </div>
              <button
                onClick={() => setShowAddAddressModal(true)}
                className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
              >
                Thêm địa chỉ
              </button>
            </div>

            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.maDiaChi} className="border rounded-xl p-5 hover:shadow-sm transition">
                  {editingId === address.maDiaChi ? (
                    <div className="space-y-3">
                      <input
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3"
                      />
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Huỷ</button>
                        <button onClick={() => handleUpdate(address.maDiaChi)} className="bg-green-600 text-white px-4 py-2 rounded">Lưu</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-lg">{address.diaChiChiTiet}</p>
                        {address.laDiaChiMacDinh && (
                          <span className="inline-block mt-3 text-xs bg-black text-white px-3 py-1 rounded">Mặc định</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!address.laDiaChiMacDinh && (
                          <button onClick={() => handleDefault(address.maDiaChi)} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Đặt mặc định</button>
                        )}
                        <button
                          onClick={() => { setEditingId(address.maDiaChi); setEditingValue(address.diaChiChiTiet); }}
                          className="bg-yellow-500 text-white px-4 py-2 rounded text-sm"
                        >
                          Sửa
                        </button>
                        <button onClick={() => handleDelete(address.maDiaChi)} className="bg-red-600 text-white px-4 py-2 rounded text-sm">Xoá</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {addresses.length === 0 && <div className="text-center py-10 text-gray-500">Chưa có địa chỉ nào</div>}
            </div>
          </div>
        </div>
      </div>
      <AddAddressModal
        open={showAddAddressModal}
        onClose={() => setShowAddAddressModal(false)}
        onSave={handleAddAddress}
      />
    </main>
  );
};