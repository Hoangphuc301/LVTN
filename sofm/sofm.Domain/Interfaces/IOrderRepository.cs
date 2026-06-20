using sofm.Domain.Entities;

namespace sofm.Domain.Interfaces
{
    public interface IOrderRepository
    {
        Task<DonHang> CreateOrderAsync(DonHang donHang,List<ChiTietDonHang> chiTiets,LichSuDonHang lichSu);
        Task<ChiTietSanPham?> GetProductAsync(int maCtsp);
        Task SaveChangesAsync();
        Task<List<DonHang>> GetOrdersAsync();
        Task<DonHang?> GetOrderDetailAsync(int maDH);
        Task<DonHang?> GetOrderByIdAsync(int maDH);
        Task UpdateOrderAsync(DonHang donHang);
        Task AddOrderHistoryAsync(LichSuDonHang lichSu);
        Task<List<LichSuDonHang>> GetOrderHistoryAsync(int maDH);
    }
}
