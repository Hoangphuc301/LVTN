using Microsoft.EntityFrameworkCore;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly SofmDbContext _context;
        public CartRepository(SofmDbContext context) => _context = context;

        public async Task<GioHang?> GetCartByCustomerAsync(int maKh)
        {
            return await _context.GioHangs

                .Include(x => x.ChiTietGioHangs)
                    .ThenInclude(x => x.MaCtspNavigation)
                        .ThenInclude(x => x.MaSpNavigation)
                            .ThenInclude(x => x.HinhSanPhams)

                .Include(x => x.ChiTietGioHangs)
                    .ThenInclude(x => x.MaCtspNavigation)
                        .ThenInclude(x => x.MaMauNavigation)

                .Include(x => x.ChiTietGioHangs)
                    .ThenInclude(x => x.MaCtspNavigation)
                        .ThenInclude(x => x.MaSizeNavigation)

                .FirstOrDefaultAsync(x => x.MaKh == maKh);
        }

        public async Task<GioHang> CreateCartAsync(int maKh)
        {
            var cart = new GioHang { MaKh = maKh };
            _context.GioHangs.Add(cart);
            await _context.SaveChangesAsync();
            return cart;
        }

        public async Task AddToCartAsync(int maKh, int maCtsp, int soLuong)
        {
            var cart = await GetCartByCustomerAsync(maKh) ?? await CreateCartAsync(maKh);
            var item = cart.ChiTietGioHangs.FirstOrDefault(x => x.MaCtsp == maCtsp);
            if (item == null) 
                cart.ChiTietGioHangs.Add(new ChiTietGioHang 
                { 
                    MaCtsp = maCtsp, 
                    SoLuong = soLuong 
                });
            else 
                item.SoLuong += soLuong;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateQuantityAsync(int maKh, int maCtsp, int soLuong)
        {
            var cart = await GetCartByCustomerAsync(maKh);
            var item = cart?.ChiTietGioHangs.FirstOrDefault(x => x.MaCtsp == maCtsp);
            if (item != null) { item.SoLuong = soLuong; await _context.SaveChangesAsync(); }
        }

        public async Task RemoveItemAsync(int maKh, int maCtsp)
        {
            var cart = await GetCartByCustomerAsync(maKh);
            var item = cart?.ChiTietGioHangs.FirstOrDefault(x => x.MaCtsp == maCtsp);
            if (item != null) { _context.ChiTietGioHangs.Remove(item); await _context.SaveChangesAsync(); }
        }

        public async Task ClearCartAsync(int maKh)
        {
            var cart = await GetCartByCustomerAsync(maKh);
            if (cart != null) { _context.ChiTietGioHangs.RemoveRange(cart.ChiTietGioHangs); await _context.SaveChangesAsync(); }
        }
    }
}