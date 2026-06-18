export interface Voucher {
  id: string;
  code: string;
  name: string;
  description: string;
  status: 'Đang chạy' | 'Sắp hết hạn' | 'Đã kết thúc';
  usedCount: number;
  totalCount: number;
  endDate: string;
}