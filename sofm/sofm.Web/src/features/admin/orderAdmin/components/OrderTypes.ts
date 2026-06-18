export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  totalPrice: number;
  status: 'Đang xử lý' | 'Đang giao hàng' | 'Đã hoàn thành' | 'Đã hủy';
}