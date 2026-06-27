import { useState } from "react";
import { AccountSidebar } from "../components/AccountSidebar";

export const PasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    alert("Chức năng đổi mật khẩu sẽ được hoàn thiện sau");
  };

  return (
    <main className="min-h-screen bg-[#f7f5f2] py-12">
      <div className="max-w-7xl mx-auto px-6 flex gap-8">
        <AccountSidebar />
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-4xl font-serif mb-2">Đổi mật khẩu</h1>
            <p className="text-gray-500 mb-8">
              Cập nhật mật khẩu để bảo vệ tài khoản
            </p>

            <div className="space-y-5 max-w-xl">
              <div>
                <label className="text-xs text-gray-500 uppercase">
                  Mật khẩu hiện tại
                </label>
                <input type="password" value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full mt-2 bg-gray-100 p-3 rounded-lg outline-none"/>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase">Mật khẩu mới</label>
                <input type="password" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-2 bg-gray-100 p-3 rounded-lg outline-none"/>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase">
                  Xác nhận mật khẩu mới
                </label>
                <input type="password" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-2 bg-gray-100 p-3 rounded-lg outline-none"/>
              </div>

              <div className="flex justify-end pt-4">
                <button onClick={handleChangePassword}
                  className="bg-black text-white px-10 py-3 rounded-lg hover:bg-gray-800 transition">
                  ĐỔI MẬT KHẨU
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};  