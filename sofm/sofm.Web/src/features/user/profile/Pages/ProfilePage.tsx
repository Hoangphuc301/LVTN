import { useEffect, useState } from "react";
import axios from "axios";
import { AccountSidebar } from "../components/AccountSidebar";
import { getProfile, updateProfile } from "../components/ProfileService";
import { getAddresses } from "../components/AddressService";
import type { ProfileResponse } from "../components/ProfileType";
import type { AddressResponse } from "../components/AddressType";

export const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const user = JSON.parse(storedUser);
      const profileData = await getProfile(user.maTK);
      setProfile(profileData);
      const addressData = await getAddresses(profileData.maKH);
      setAddresses(addressData);
    } catch {
      setError("Không thể tải thông tin");
    }
  };

  useEffect(() => {
    void fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    try {
      setLoading(true);
      await updateProfile({
        maTK: profile.maTK,
        tenKH: profile.tenKH,
        sdt: profile.sdt,
        gioiTinh: profile.gioiTinh,
      });

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.tenNguoiDung = profile.tenKH;
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("userChanged"));
      }
      alert("Cập nhật thành công");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data || "Có lỗi xảy ra");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <div className="p-20 text-center">Đang tải...</div>;

  const defaultAddress = addresses.find((x) => x.laDiaChiMacDinh);

  return (
    <main className="min-h-screen bg-[#f7f5f2] py-12">
      <div className="max-w-7xl mx-auto px-6 flex gap-8">
        <AccountSidebar />
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-serif">Thông tin cá nhân</h1>
            <p className="text-gray-500 mt-2">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex gap-6">
            <div className="flex-1 bg-white rounded-xl shadow-sm p-8">
              <div className="space-y-5">
                <div>
                  <label className="text-xs text-gray-500 uppercase">Họ và tên</label>
                  <input
                    value={profile.tenKH}
                    onChange={(e) => setProfile({ ...profile, tenKH: e.target.value })}
                    className="w-full mt-2 bg-gray-100 p-3 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">Email</label>
                  <input value={profile.email}                   
                    className="w-full mt-2 bg-gray-100 p-3 rounded-lg"/>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">Số điện thoại</label>
                  <input value={profile.sdt}
                    onChange={(e) => setProfile({ ...profile, sdt: e.target.value })}
                    className="w-full mt-2 bg-gray-100 p-3 rounded-lg outline-none"/>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">Giới tính</label>
                  <div className="flex gap-6 mt-3">
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" checked={profile.gioiTinh} onChange={() => setProfile({ ...profile, gioiTinh: true })} />
                      <span className="ml-2">Nam</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" checked={!profile.gioiTinh} onChange={() => setProfile({ ...profile, gioiTinh: false })} />
                      <span className="ml-2">Nữ</span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button onClick={handleSave} disabled={loading}
                    className="bg-black text-white px-10 py-3 rounded-lg hover:bg-gray-800 transition">
                    {loading ? "ĐANG LƯU..." : "LƯU THAY ĐỔI"}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-[260px]">
              <div className="bg-white rounded-xl shadow-sm p-6 h-[180px] flex flex-col justify-center items-center">
                <button className="border px-4 py-2 text-sm hover:bg-gray-50 rounded">CHỌN ẢNH</button>
                <p className="text-xs text-center text-gray-400 mt-4">Dung lượng tối đa 1MB<br />JPEG, PNG</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
            <h2 className="text-3xl font-serif mb-6">Địa chỉ mặc định</h2>
            {defaultAddress ? (
              <div className="border rounded-lg p-4 bg-gray-50">
                <p className="font-medium">{defaultAddress.diaChiChiTiet}</p>
                <span className="inline-block mt-2 text-xs bg-black text-white px-2 py-1 rounded">Mặc định</span>
              </div>
            ) : (
              <p className="text-gray-500">Chưa có địa chỉ mặc định</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};