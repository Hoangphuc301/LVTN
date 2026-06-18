using Microsoft.EntityFrameworkCore;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class CategoryRepository : GenericRepository<DanhMuc>, ICategoryRepository
    {
        private readonly SofmDbContext _sofmDbContext;
        public CategoryRepository(SofmDbContext sofmDbContext) : base(sofmDbContext)
        {
            _sofmDbContext = sofmDbContext;
        }
        public async Task<List<DanhMuc>> GetAllAsync()
        {
            return await _sofmDbContext.DanhMucs.ToListAsync();
        }

        public async Task<DanhMuc> GetByIdAsync(int id)
        {
            return await _sofmDbContext.DanhMucs
                .FirstOrDefaultAsync(x => x.MaDm == id);
        }

        public async Task<DanhMuc> CreateAsync(DanhMuc dm)
        {
            await _sofmDbContext.DanhMucs.AddAsync(dm);
            await _sofmDbContext.SaveChangesAsync();
            return dm;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _sofmDbContext.DanhMucs
                .Where(x => x.MaDm == id)
                .ExecuteDeleteAsync();
        }
        public async Task<int> UpdateAsync(int id, DanhMuc dm)
        {   
            return await _sofmDbContext.DanhMucs
                .Where(x => x.MaDm == id)
                .ExecuteUpdateAsync(x => x
                    .SetProperty(m => m.TenDm, dm.TenDm)
                    .SetProperty(m => m.MaDmCha, dm.MaDmCha)
                    .SetProperty(m => m.MoTa, dm.MoTa)
                    .SetProperty(m => m.TrangThai, dm.TrangThai)
                );
        }

        public async Task<List<DanhMuc>> GetParentCategoriesAsync()
        {
            return await _sofmDbContext.DanhMucs
                .Where(x => x.MaDmCha == null)
                .ToListAsync();
        }

        public async Task<List<DanhMuc>> GetChildrenAsync(int parentId)
        {
            return await _sofmDbContext.DanhMucs
                .Where(x => x.MaDmCha == parentId)
                .ToListAsync();
        }
    }
}
