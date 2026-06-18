import { type Voucher } from "./VoucherTypes";

export const VoucherCard = ({ voucher }: { voucher: Voucher }) => (
  <div className="bg-[#1f2120] p-6 rounded-2xl border border-[#4a463d]">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold text-white">{voucher.code}</h3>
      <span className="text-xs px-2 py-1 bg-[#2a2c2b] rounded text-[#a0a09e]">
        {voucher.status}
      </span>
    </div>
    <h4 className="text-lg font-bold text-white mb-2">{voucher.name}</h4>
    <p className="text-sm text-[#a0a09e] mb-6">{voucher.description}</p>
    
    <div className="w-full bg-[#2a2c2b] h-2 rounded-full mb-4">
      <div className="bg-white h-2 rounded-full" style={{ width: '60%' }} />
    </div>
    
    <div className="flex justify-between text-sm">
      <span className="text-white">Đã dùng {voucher.usedCount}/{voucher.totalCount}</span>
      <span className="text-[#a0a09e]">{voucher.endDate}</span>
    </div>
  </div>
);