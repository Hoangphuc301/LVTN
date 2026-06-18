export interface ShippingOrder {
  id: string;
  trackingNumber: string;
  customerName: string;
  location: string;
  shippingUnit: 'VNPost' | 'GHTK' | 'J&T Express' | 'Ninja Van';
  status: 'Đang vận chuyển' | 'Đã giao hàng' | 'Giao thất bại' | 'Chờ lấy hàng';
}