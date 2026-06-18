using Microsoft.EntityFrameworkCore;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class SizeRepository : GenericRepository<Size>, ISizeRepository
    {
        private readonly SofmDbContext _sofmDbContext;
        public SizeRepository(SofmDbContext sofmDbContext) : base(sofmDbContext)
        {
            _sofmDbContext = sofmDbContext;
        }

        public async Task<List<Size>> GetAllAsync()
        {
            return await _context.Sizes
            .Include(x => x.MaDmNavigation)
            .ToListAsync();
        }

        public async Task<Size> GetByIdAsync(int id)
        {
            return await _sofmDbContext.Sizes
                .Include(x => x.MaDmNavigation)
                .FirstOrDefaultAsync(x => x.MaSize == id);
        }

        public async Task<Size> CreateAsync(Size s)
        {
            await _sofmDbContext.Sizes.AddAsync(s);
            await _sofmDbContext.SaveChangesAsync();
            
            await _sofmDbContext.Entry(s)
                .Reference(x => x.MaDmNavigation)
                .LoadAsync();

            return s;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _sofmDbContext.Sizes
                .Where(x => x.MaSize == id)
                .ExecuteDeleteAsync();
        }
        public async Task<int> UpdateAsync(int id, Size s)
        {
            return await _sofmDbContext.Sizes
                .Where(x => x.MaSize == id)
                .ExecuteUpdateAsync(x => x
                    .SetProperty(s => s.TenSize, s.TenSize)
                    .SetProperty(s => s.MaDm, s.MaDm)
                    .SetProperty(s => s.MoTa, s.MoTa)
                    .SetProperty(s => s.TrangThai, s.TrangThai)
                );
        }
    }
}
