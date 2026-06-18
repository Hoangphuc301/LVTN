using Microsoft.EntityFrameworkCore;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly SofmDbContext _context;
        public GenericRepository(SofmDbContext context) { _context = context; }

        public async Task<List<T>> GetAllAsync() => await _context.Set<T>().ToListAsync();

        public async Task<T> GetByIdAsync(int id) => await _context.Set<T>().FindAsync(id);

        public async Task<T> CreateAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<T> UpdateAsync(int id, T entity)
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        //public Task<int> DeleteAsync(int id) => throw new NotImplementedException();

        public async Task<int> DeleteAsync(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);

            if (entity == null)
                throw new Exception("Không tìm thấy dữ liệu.");

            _context.Set<T>().Remove(entity);

            return await _context.SaveChangesAsync();
        }
    }
}