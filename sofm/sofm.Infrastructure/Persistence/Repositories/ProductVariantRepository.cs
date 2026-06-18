using Microsoft.EntityFrameworkCore;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class ProductVariantRepository : GenericRepository<ChiTietSanPham>,IProductVariantRepository
    {
        private readonly SofmDbContext _context;
        public ProductVariantRepository(SofmDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<ChiTietSanPham>> GetByProductIdAsync(int maSp)
        {
            return await _context.ChiTietSanPhams
                .Include(x => x.MaMauNavigation)
                .Include(x => x.MaSizeNavigation)
                .Where(x => x.MaSp == maSp)
                .ToListAsync();
        }

        public async Task<ChiTietSanPham?> GetWithDetailAsync(int maCtsp)
        {
            return await _context.ChiTietSanPhams
                .Include(x => x.MaMauNavigation)
                .Include(x => x.MaSizeNavigation)
                .FirstOrDefaultAsync(x =>
                    x.MaCtsp == maCtsp);
        }
        public async Task<bool> ExistsAsync(int maSp, int maMau, int maSize)
        {
            return await _context.ChiTietSanPhams.AnyAsync(x =>
                x.MaSp == maSp &&
                x.MaMau == maMau &&
                x.MaSize == maSize);
        }

        public async Task<bool> ExistsForUpdateAsync(
            int maCtsp,
            int maSp,
            int maMau,
            int maSize)
        {
            return await _context.ChiTietSanPhams.AnyAsync(x =>
                x.MaCtsp != maCtsp &&
                x.MaSp == maSp &&
                x.MaMau == maMau &&
                x.MaSize == maSize);
        }
    }
}
