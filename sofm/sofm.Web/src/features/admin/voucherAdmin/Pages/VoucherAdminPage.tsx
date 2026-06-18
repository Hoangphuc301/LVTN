import { VoucherCard } from "../components/VoucherCard";
import { type Voucher } from "@/features/admin/voucherAdmin/components/VoucherTypes";
import { StatsCard } from "../components/StatsCard";

const MOCK_VOUCHERS: Voucher[] = [
  { id: '1', code: 'SUMMER24', name: 'Giảm 20%', description: 'Tối đa 500k cho đơn từ 2 triệu', status: 'Đang chạy', usedCount: 342, totalCount: 1000, endDate: '31/08/2024' },
  { id: '2', code: 'FREESHIP', name: 'Miễn phí giao hàng', description: 'Áp dụng toàn quốc, không giới hạn', status: 'Đang chạy', usedCount: 1204, totalCount: 2000, endDate: '31/12/2024' },
  { id: '3', code: 'NEWBIE50', name: 'Giảm 50k', description: 'Cho khách hàng mới đăng ký', status: 'Sắp hết hạn', usedCount: 89, totalCount: 100, endDate: '2 ngày nữa' },
];

export const VoucherAdmin = () => {
  return (
    <div className="p-8">
        <div className="flex justify-between items-center mb-8">
            <div>
            <h1 className="text-3xl font-bold text-[#e5e2e1]">Quản lý Voucher</h1>
            <p className="text-[#a0a09e]">Thiết lập và theo dõi các chương trình khuyến mãi.</p>
            </div>
            <button className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200">Tạo mã mới</button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
            <StatsCard title="Đang hoạt động" value={24} icon="" />
            <StatsCard title="Đã sử dụng trong tháng" value={1402} icon="" />
            <StatsCard title="Sắp hết hạn" value={5} icon="" />
        </div>

        <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
            <input type="text" placeholder="Tìm kiếm mã voucher..." 
            className="w-full bg-[#1f2120] border border-[#4a463d] text-white rounded-lg px-4 py-3 pl-10 outline-none focus:border-[#e5e2e1]"/>
            <svg className="w-5 h-5 absolute left-3 top-3.5 text-[#a0a09e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        
        <button className="flex items-center gap-2 bg-[#1f2120] border border-[#4a463d] text-white px-6 py-3 rounded-lg hover:bg-[#2a2c2b]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Lọc
        </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
            {MOCK_VOUCHERS.map((voucher) => (
                <VoucherCard key={voucher.id} voucher={voucher} />
            ))}
        </div>
    </div>
  );
};