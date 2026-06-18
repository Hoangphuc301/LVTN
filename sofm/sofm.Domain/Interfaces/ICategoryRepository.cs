using sofm.Domain.Entities;

namespace sofm.Domain.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<DanhMuc>
    {
        Task<List<DanhMuc>> GetParentCategoriesAsync();
        Task<List<DanhMuc>> GetChildrenAsync(int parentId);
    }
}
