using sofm.Domain.Entities;

namespace sofm.Domain.Interfaces
{
    public interface ICartRepository
    {
        Task<GioHang?> GetCartByCustomerAsync(int maKh);
        Task<GioHang> CreateCartAsync(int maKh);
        Task AddToCartAsync(int maKh, int maCtsp, int soLuong);
        Task UpdateQuantityAsync(int maKh, int maCtsp, int soLuong);
        Task RemoveItemAsync(int maKh, int maCtsp);
        Task ClearCartAsync(int maKh);
    }
}
