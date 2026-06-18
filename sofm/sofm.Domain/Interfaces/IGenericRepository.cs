using System.Collections.Generic;
using System.Threading.Tasks;

namespace sofm.Domain.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task<T> CreateAsync(T entity);
        Task<T> UpdateAsync(int id, T entity);
        Task<int> DeleteAsync(int id);
    }
}