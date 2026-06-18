import { useState } from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { StatsCard } from '../components/StatsCard';

const CHART_DATA = [
  { name: '01 Oct', thisMonth: 400, lastMonth: 240 },
  { name: '08 Oct', thisMonth: 300, lastMonth: 139 },
  { name: '15 Oct', thisMonth: 800, lastMonth: 400 },
  { name: '22 Oct', thisMonth: 200, lastMonth: 300 },
  { name: '31 Oct', thisMonth: 900, lastMonth: 200 },
];

export const ReportAdmin = () => {
  const [activeFilter, setActiveFilter] = useState('Tháng này');

  const exportReport = () => {
    console.log(`Đang xuất báo cáo cho giai đoạn: ${activeFilter}`);
    alert(`Đang xuất file báo cáo cho: ${activeFilter}`);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#e5e2e1]">Báo cáo thống kê</h1>
          <p className="text-[#a0a09e]">Theo dõi hiệu suất kinh doanh theo thời gian thực.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex bg-[#1f2120] rounded-lg p-1 border border-[#4a463d]">
            {['Hôm nay', '7 ngày qua', 'Tháng này', 'Năm nay'].map(item => (
              <button 
                key={item} 
                onClick={() => setActiveFilter(item)}
                className={`px-4 py-2 rounded-md text-sm transition ${activeFilter === item ? 'bg-[#2a2c2b] text-white' : 'text-[#a0a09e]'}`}>
                {item}
              </button>
            ))}
          </div>
          <button 
            onClick={exportReport}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200">
                Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <StatsCard title="Tổng doanh thu" value="19.250.000đ" icon="" />
        <StatsCard title="Tổng đơn hàng" value="80" icon="" />
        <StatsCard title="Giá trị đơn trung bình" value="678.000đ" icon="" />
        <StatsCard title="Tỷ lệ chuyển đổi" value="3.42%" icon="" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-[#1f2120] p-6 rounded-2xl border border-[#4a463d]">
          <h3 className="text-lg font-bold text-white mb-6">Biểu đồ doanh thu theo thời gian ({activeFilter})</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA}>
                <XAxis dataKey="name" stroke="#a0a09e" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2120', border: '1px solid #4a463d' }} />
                <Line type="monotone" dataKey="thisMonth" stroke="#e5e2e1" strokeWidth={2} />
                <Line type="monotone" dataKey="lastMonth" stroke="#4a463d" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1f2120] p-6 rounded-2xl border border-[#4a463d]">
          <h3 className="text-lg font-bold text-white mb-6">Doanh thu theo danh mục</h3>
          <div className="space-y-4">
             {[{n:'Thời trang Nam', v:'45%'}, {n:'Thời trang Nữ', v:'35%'}, {n:'Phụ kiện', v:'15%'}].map(item => (
               <div key={item.n}>
                 <div className="flex justify-between text-sm text-white mb-1"><span>{item.n}</span><span>{item.v}</span></div>
                 <div className="w-full bg-[#2a2c2b] h-2 rounded-full"><div className="bg-white h-2 rounded-full" style={{width: item.v}}/></div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1f2120] rounded-2xl border border-[#4a463d] p-6">
        <h3 className="text-lg font-bold text-white mb-6">Báo cáo chi tiết sản phẩm bán chạy nhất</h3>
        <table className="w-full text-left text-white">
          <thead className="text-[#a0a09e] text-sm uppercase">
            <tr>{['Tên sản phẩm', 'Danh mục', 'Đã bán', 'Doanh thu', 'Xu hướng'].map(h => <th key={h} className="pb-4">{h}</th>)}</tr>
          </thead>
          <tbody>
            {[1,2,3,4].map(i => (
              <tr key={i} className="border-t border-[#4a463d]">
                <td className="py-4">Sơ mi lụa Premium<br/><span className="text-xs text-[#a0a09e]">SKU: SH-992</span></td>
                <td className="py-4">Nam</td>
                <td className="py-4">452</td>
                <td className="py-4">542.400.000đ</td>
                <td className="py-4 text-green-400">↗</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};