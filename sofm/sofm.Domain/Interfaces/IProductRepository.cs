using sofm.Domain.Entities;

namespace sofm.Domain.Interfaces
{
    public interface IProductRepository : IGenericRepository<SanPham>
    {
        Task<SanPham?> GetByIdWithDetailAsync(int id);
        Task UpdateProductWithVariantsAsync(SanPham product);
    }
}
