using sofm.Domain.Entities;

namespace sofm.Domain.Interfaces
{
    public interface IOrderRepository
    {
        Task<DonHang> CreateOrderAsync(DonHang donHang,List<ChiTietDonHang> chiTiets,LichSuDonHang lichSu);
        Task<ChiTietSanPham?> GetProductAsync(int maCtsp);
        Task SaveChangesAsync();
    }
}
