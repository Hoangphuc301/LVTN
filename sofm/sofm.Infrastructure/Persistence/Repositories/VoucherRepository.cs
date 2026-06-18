using Microsoft.EntityFrameworkCore;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class VoucherRepository : GenericRepository<Voucher>, IVoucherRepository
    {
        private readonly SofmDbContext _sofmDbContext;
        public VoucherRepository(SofmDbContext sofmDbContext) : base(sofmDbContext)
        {
            _sofmDbContext = sofmDbContext;
        }

        public async Task<List<Voucher>> GetAllAsync()
        {
            return await _sofmDbContext.Vouchers.ToListAsync();
        }

        public async Task<Voucher> GetByIdAsync(int id)
        {
            return await _sofmDbContext.Vouchers
                .FirstOrDefaultAsync(x => x.MaVoucher == id);
        }

        public async Task<Voucher> CreateAsync(Voucher v)
        {
            await _sofmDbContext.Vouchers.AddAsync(v);
            await _sofmDbContext.SaveChangesAsync();
            return v;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _sofmDbContext.Vouchers
                .Where(x => x.MaVoucher == id)
                .ExecuteDeleteAsync();
        }
        public async Task<int> UpdateAsync(int id, Voucher v)
        {
            return await _sofmDbContext.Vouchers
                .Where(x => x.MaVoucher == id)
                .ExecuteUpdateAsync(x => x
                    .SetProperty(m => m.TenVoucher, v.TenVoucher)
                    .SetProperty(m => m.MaGiamGia, v.MaGiamGia)
                    .SetProperty(m => m.LoaiGiam, v.LoaiGiam)
                    .SetProperty(m => m.NgayBd, v.NgayBd)
                    .SetProperty(m => m.NgayKt, v.NgayKt)
                    .SetProperty(m => m.TrangThai, v.TrangThai)
                    .SetProperty(m => m.DaSuDung, v.DaSuDung)
                    .SetProperty(m => m.GioiHanSuDung, v.GioiHanSuDung)
                );
        }
    }
}
