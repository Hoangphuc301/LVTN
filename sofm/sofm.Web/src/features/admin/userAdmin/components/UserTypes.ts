export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Quản trị viên' | 'Nhân viên' | 'Khách hàng';
  status: 'Kích hoạt' | 'Bị khóa';
  lastActive: string;
}