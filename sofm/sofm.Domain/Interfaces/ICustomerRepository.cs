using sofm.Domain.Entities;

namespace sofm.Domain.Interfaces
{
    public interface ICustomerRepository
    {
        Task AddAsync(KhachHang khachHang);
        Task SaveChangesAsync();
    }
}
