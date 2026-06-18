using Microsoft.EntityFrameworkCore;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly SofmDbContext _context;

        public OrderRepository(SofmDbContext context)
        {
            _context = context;
        }

        public async Task<DonHang> CreateOrderAsync(DonHang donHang, List<ChiTietDonHang> chiTiets, LichSuDonHang lichSu)
        {
            using var transaction =await _context.Database.BeginTransactionAsync();
            try
            {
                _context.DonHangs.Add(donHang);
                await _context.SaveChangesAsync();
                foreach (var item in chiTiets)
                {
                    item.MaDh = donHang.MaDh;
                }

                _context.ChiTietDonHangs.AddRange(chiTiets);
                lichSu.MaDh = donHang.MaDh;
                _context.LichSuDonHangs.Add(lichSu);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return donHang;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<ChiTietSanPham?> GetProductAsync(int maCtsp)
        {
            return await _context.ChiTietSanPhams.FirstOrDefaultAsync(x => x.MaCtsp == maCtsp);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
