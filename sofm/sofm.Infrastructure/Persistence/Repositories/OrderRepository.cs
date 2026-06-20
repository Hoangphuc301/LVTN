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

        public async Task<List<DonHang>> GetOrdersAsync()
        {
            return await _context.DonHangs
                .Include(x => x.MaKhNavigation)
                .OrderByDescending(x => x.NgayDat)
                .ToListAsync();
        }

        public async Task<DonHang?> GetOrderDetailAsync(int maDH)
        {
            return await _context.DonHangs
                .Include(x => x.MaKhNavigation)
                .Include(x => x.ChiTietDonHangs)
                    .ThenInclude(x => x.MaCtspNavigation)
                        .ThenInclude(x => x.MaSpNavigation)
                .Include(x => x.ChiTietDonHangs)
                    .ThenInclude(x => x.MaCtspNavigation)
                        .ThenInclude(x => x.MaMauNavigation)
                .Include(x => x.ChiTietDonHangs)
                    .ThenInclude(x => x.MaCtspNavigation)
                        .ThenInclude(x => x.MaSizeNavigation)
                .FirstOrDefaultAsync(x => x.MaDh == maDH);
        }

        public async Task<DonHang?> GetOrderByIdAsync(int maDH)
        {
            return await _context.DonHangs.FirstOrDefaultAsync(x => x.MaDh == maDH);
        }

        public async Task UpdateOrderAsync(DonHang donHang)
        {
            _context.DonHangs.Update(donHang);
            await _context.SaveChangesAsync();
        }

        public async Task AddOrderHistoryAsync(LichSuDonHang lichSu)
        {
            _context.LichSuDonHangs.Add(lichSu);
            await _context.SaveChangesAsync();
        }

        public async Task<List<LichSuDonHang>> GetOrderHistoryAsync(int maDH)
        {
            return await _context.LichSuDonHangs
                .Where(x => x.MaDh == maDH)
                .OrderBy(x => x.ThoiGian)
                .ToListAsync();
        }
    }
}
