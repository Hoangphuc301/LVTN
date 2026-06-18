import { useState } from 'react';
import { type Order } from '@/features/admin/orderAdmin/components/OrderTypes';

export const OrderAdmin = () => {
  const [orders] = useState<Order[]>([
    { id: "#ORD-2024-001", customerName: "Nguyễn Văn A", customerEmail: "nguyenvana@email.com", orderDate: "24/10/2024, 14:30", totalPrice: 2450000, status: 'Đang xử lý' },
    { id: "#ORD-2024-002", customerName: "Trần Thị B", customerEmail: "tranthib@email.com", orderDate: "24/10/2024, 10:15", totalPrice: 1200000, status: 'Đang giao hàng' },
  ]);

  const getStatusOrder = (status: string) => {
    switch (status) {
      case 'Đang xử lý': return 'bg-yellow-500/20 text-yellow-500';
      case 'Đang giao hàng': return 'bg-blue-500/20 text-blue-500';
      case 'Đã hoàn thành': return 'bg-green-500/20 text-green-500';
      case 'Đã hủy': return 'bg-red-500/20 text-red-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#e5e2e1]">Quản lý đơn hàng</h1>
      </div>

      <div className="bg-[#1f2120] p-4 rounded-xl border border-[#4a463d] flex gap-4 mb-6">
        <input placeholder="Tìm kiếm theo mã đơn, tên khách hàng..." className="flex-1 bg-transparent p-2 text-white outline-none" />
        <select className="bg-[#2f3130] p-2 rounded text-white"><option>Tất cả trạng thái</option></select>
      </div>

      <div className="bg-[#1f2120] rounded-xl border border-[#4a463d] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#2f3130] text-[#a0a09e] text-sm uppercase">
            <tr>
              <th className="p-4">Mã đơn hàng</th>
              <th className="p-4">Khách hàng</th>
              <th className="p-4">Ngày đặt</th>
              <th className="p-4">Tổng tiền</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4a463d]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-[#2a2c2b] text-white">
                <td className="p-4 font-bold">{order.id}</td>
                <td className="p-4">
                  <div>{order.customerName}</div>
                  <div className="text-xs text-[#a0a09e]">{order.customerEmail}</div>
                </td>
                <td className="p-4">{order.orderDate}</td>
                <td className="p-4 font-semibold">{order.totalPrice.toLocaleString()} đ</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusOrder(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 flex gap-3 text-[#a0a09e]">
                  <button>👁️</button>
                  <button>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};