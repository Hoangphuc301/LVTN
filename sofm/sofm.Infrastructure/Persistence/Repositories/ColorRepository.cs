using Microsoft.EntityFrameworkCore;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class ColorRepository : GenericRepository<Mau>, IColorRepository
    {
        private readonly SofmDbContext _sofmDbContext;
        public ColorRepository(SofmDbContext sofmDbContext) : base(sofmDbContext)
        {
            _sofmDbContext = sofmDbContext;
        }

        public async Task<List<Mau>> GetAllAsync()
        {
            return await _sofmDbContext.Maus
                .Include(x => x.ChiTietSanPhams)
                .ToListAsync();
        }

        public async Task<Mau> GetByIdAsync(int id)
        {
            return await _sofmDbContext.Maus
                .FirstOrDefaultAsync(x => x.MaMau == id);
        }

        public async Task<Mau> CreateAsync(Mau m)
        {
            await _sofmDbContext.Maus.AddAsync(m);
            await _sofmDbContext.SaveChangesAsync();
            return m;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _sofmDbContext.Maus
                .Where(x => x.MaMau == id)
                .ExecuteDeleteAsync();
        }
        public async Task<int> UpdateAsync(int id, Mau m)
        {
            return await _sofmDbContext.Maus
                .Where(x => x.MaMau == id)
                .ExecuteUpdateAsync(x => x
                    .SetProperty(m => m.TenMau, m.TenMau)
                    .SetProperty(m => m.MaHex, m.MaHex)
                    .SetProperty(m => m.TrangThai, m.TrangThai)                
                );
        }
    }
}
