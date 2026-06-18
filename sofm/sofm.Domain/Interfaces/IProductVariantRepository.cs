using sofm.Domain.Entities;

namespace sofm.Domain.Interfaces
{
    public interface IProductVariantRepository : IGenericRepository<ChiTietSanPham>
    {
        Task<List<ChiTietSanPham>> GetByProductIdAsync(int maSp);
        Task<ChiTietSanPham?> GetWithDetailAsync(int maCtsp);
        Task<bool> ExistsAsync(int maSp, int maMau, int maSize);
        Task<bool> ExistsForUpdateAsync(int maCtsp, int maSp, int maMau, int maSize);
    }
}
