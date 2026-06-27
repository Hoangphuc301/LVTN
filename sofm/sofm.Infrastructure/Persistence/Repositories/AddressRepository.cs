using Microsoft.EntityFrameworkCore;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly SofmDbContext _context;

        public AddressRepository(SofmDbContext context)
        {
            _context = context;
        }

        public async Task<List<DiaChi>> GetByCustomerIdAsync(int maKH)
        {
            return await _context.DiaChis
                .Where(x => x.MaKh == maKH)
                .OrderByDescending(x => x.LaDiaChiMacDinh)
                .ToListAsync();
        }

        public async Task<DiaChi?> GetByIdAsync(int maDiaChi)
        {
            return await _context.DiaChis
                .FirstOrDefaultAsync(
                    x => x.MaDiaChi == maDiaChi);
        }

        public async Task AddAsync(DiaChi diaChi)
        {
            await _context.DiaChis.AddAsync(diaChi);
        }

        public Task DeleteAsync(DiaChi diaChi)
        {
            _context.DiaChis.Remove(diaChi);
            return Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task SetDefaultAddressAsync(int maKH, int maDiaChi)
        {
            var addresses = await _context.DiaChis
                    .Where(x => x.MaKh == maKH)
                    .ToListAsync();

            foreach (var item in addresses)
            {
                item.LaDiaChiMacDinh = item.MaDiaChi == maDiaChi;
            }
        }
    }
}
