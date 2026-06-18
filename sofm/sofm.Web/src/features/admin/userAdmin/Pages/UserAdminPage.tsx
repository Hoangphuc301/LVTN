import { StatsCard } from '../components/StatsCard';
import type { User } from '../components/UserTypes';

const MOCK_USERS: User[] = [
  { id: '1', name: 'Hoàng Minh Châu', email: 'chau.hoang@example.com', role: 'Quản trị viên', status: 'Kích hoạt', lastActive: '2 phút trước' },
  { id: '2', name: 'Trần Văn Đức', email: 'duc.tran.vip@gmail.com', role: 'Nhân viên', status: 'Kích hoạt', lastActive: 'Hôm qua, 14:30' },
  { id: '3', name: 'Lê Anh Tuấn', email: 'tuan.le88@example.com', role: 'Khách hàng', status: 'Bị khóa', lastActive: '12/05/2024' },
];

export const UserAdmin = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#e5e2e1]">Người dùng</h1>
          <p className="text-[#a0a09e]">Hệ thống quản trị</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <StatsCard title="Tổng tài khoản" value={10} icon="" />
          <StatsCard title="Đang hoạt động" value={5} icon="" />
          <StatsCard title="Bị khóa" value={1} icon="" />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input type="text" placeholder="Tìm kiếm tên, email..." className="flex-1 bg-[#1f2120] border border-[#4a463d] text-white rounded-lg px-4 py-3 outline-none" />
        <select className="bg-[#1f2120] border border-[#4a463d] text-white rounded-lg px-4 py-3 outline-none">
          <option>Tất cả vai trò</option>
        </select>
        <button className="bg-white text-black px-6 py-3 rounded-lg font-bold">Thêm tài khoản</button>
      </div>

      <div className="bg-[#1f2120] rounded-2xl border border-[#4a463d] p-6">
        <table className="w-full text-left">
          <thead className="text-[#a0a09e] text-sm uppercase">
            <tr>
              <th className="pb-4">Thông tin người dùng</th>
              <th className="pb-4">Vai trò</th>
              <th className="pb-4">Trạng thái</th>
              <th className="pb-4">Hoạt động cuối</th>
              <th className="pb-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4a463d]">
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="text-white">
                <td className="py-4 font-medium">{user.name}<br/><span className="text-xs text-[#a0a09e]">{user.email}</span></td>
                <td className="py-4"><span className="bg-[#2a2c2b] px-3 py-1 rounded-full text-xs border border-[#3e403f]">{user.role}</span></td>
                <td className="py-4 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${user.status === 'Kích hoạt' ? 'bg-green-500' : 'bg-red-500'}`} />
                  {user.status}
                </td>
                <td className="py-4 text-[#a0a09e]">{user.lastActive}</td>
                <td className="py-4 text-center space-x-3">
                  <button className="text-[#a0a09e] hover:text-white">✏️</button>
                  <button className="text-[#a0a09e] hover:text-white">🔒</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center p-4 bg-[#2f3130] text-sm text-[#a0a09e]">
          <span>Hiển thị 1 đến 10 trong 50 kết quả</span>
          <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#3e403f] rounded">Trước</button>
              <button className="px-3 py-1 bg-[#625e54] text-white rounded">1</button>
              <button className="px-3 py-1 bg-[#3e403f] rounded">2</button>
              <button className="px-3 py-1 bg-[#3e403f] rounded">3</button>
              <button className="px-3 py-1 bg-[#3e403f] rounded">Tiếp</button>
            </div>
        </div>
      </div>
    </div>
  );
};