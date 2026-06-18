import { useState } from 'react';
import { StatsCard } from '../components/StatsCard';
import { type ShippingOrder } from '../components/ShippingTypes';

const INITIAL_ORDERS: ShippingOrder[] = [
  { 
    id: "#ORD-9921", 
    trackingNumber: "VNPOST-829103", 
    customerName: "Nguyễn Văn A", 
    location: "Hà Nội", 
    shippingUnit: "VNPost", 
    status: "Đang vận chuyển" 
  },
  { 
    id: "#ORD-9920", 
    trackingNumber: "GHTK-552194", 
    customerName: "Trần Thị B", 
    location: "TP.HCM", 
    shippingUnit: "GHTK", 
    status: "Đã giao hàng" 
  },
  { 
    id: "#ORD-9919", 
    trackingNumber: "JNT-110293", 
    customerName: "Lê Hoàng C", 
    location: "Đà Nẵng", 
    shippingUnit: "J&T Express", 
    status: "Giao thất bại" 
  },
];

export const ShippingAdmin = () => {
  const [orders, setOrders] = useState<ShippingOrder[]>(INITIAL_ORDERS);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(orders.map(o => 
      o.id === id ? { ...o, status: newStatus as ShippingOrder['status'] } : o
    ));
    setEditingId(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-bold text-[#e5e2e1]">Quản lý Giao hàng</h1>
        <div className="flex gap-3">
          <button className="border border-[#4a463d] px-4 py-3 rounded-lg text-white">Xuất báo cáo</button>
          <button className="bg-white text-black px-4 py-3 rounded-lg font-bold">Tạo đơn hàng</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatsCard title="Đang lấy hàng" value={100} icon="" />
        <StatsCard title="Đang giao" value={50} icon="" />
        <StatsCard title="Thành công" value={20} icon="" />
        <StatsCard title="Thất bại" value={2} icon="" />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 bg-[#1f2120] rounded-2xl border border-[#4a463d] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Theo dõi vận chuyển</h3>
            <div className="relative">
              <input type="text" placeholder="Mã vận đơn..." className="bg-[#2a2c2b] border border-[#3e403f] text-white text-sm rounded-lg px-4 py-2 pl-9 w-64 outline-none" />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-[#a0a09e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          
          <table className="w-full text-left">
            <thead className="text-[#a0a09e] text-sm uppercase">
              <tr>
                <th className="pb-4">Mã đơn</th>
                <th className="pb-4">Khách hàng</th>
                <th className="pb-4">Đơn vị VC</th>
                <th className="pb-4">Trạng thái</th>
                <th className="pb-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4a463d]">
              {orders.map((order) => (
                <tr key={order.id} className="text-white hover:bg-[#2a2c2b]">
                  <td className="py-4">{order.id} <br/><span className="text-xs text-[#a0a09e]">{order.trackingNumber}</span></td>
                  <td className="py-4">{order.customerName} <br/><span className="text-xs text-[#a0a09e]">{order.location}</span></td>
                  <td className="py-4"><span className="border border-[#4a463d] px-2 py-1 rounded text-xs">{order.shippingUnit}</span></td>
                  <td className="py-4">
                    <span className="bg-[#2a2c2b] px-3 py-1 rounded-full text-sm border border-[#3e403f]">{order.status}</span>
                  </td>
                  <td className="py-4 text-center">
                    {editingId === order.id ? (
                      <select 
                        className="bg-[#2a2c2b] border border-[#3e403f] text-white text-xs rounded p-1"
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        onBlur={() => setEditingId(null)}
                        autoFocus
                      >
                        <option value="Đang vận chuyển">Đang vận chuyển</option>
                        <option value="Đã giao hàng">Đã giao hàng</option>
                        <option value="Giao thất bại">Giao thất bại</option>
                        <option value="Chờ lấy hàng">Chờ lấy hàng</option>
                      </select>
                    ) : (
                      <button onClick={() => setEditingId(order.id)} className="bg-[#3e403f] hover:bg-[#4a463d] text-white px-3 py-1.5 rounded-lg text-xs">Cập nhật</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-1 bg-[#1f2120] rounded-2xl border border-[#4a463d] p-6">
          <h3 className="text-xl font-bold text-white mb-4">Mạng lưới Vận chuyển</h3>
          <div className="space-y-4">
            {["GHTK", "VNPost", "J&T Express"].map((unit) => (
              <div key={unit} className="flex justify-between items-center bg-[#2a2c2b] p-3 rounded-lg border border-[#3e403f]">
                <span className="text-sm text-white">{unit}</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};