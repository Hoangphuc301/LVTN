using sofm.Domain.Entities;

namespace sofm.Domain.Interfaces
{
    public interface IAddressRepository
    {
        Task<List<DiaChi>> GetByCustomerIdAsync(int maKH);
        Task<DiaChi?> GetByIdAsync(int maDiaChi);
        Task AddAsync(DiaChi diaChi);
        Task DeleteAsync(DiaChi diaChi);
        Task SaveChangesAsync();
        Task SetDefaultAddressAsync(int maKH, int maDiaChi);
    }
}
