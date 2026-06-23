using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly SofmDbContext _context;

        public CustomerRepository(SofmDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(KhachHang khachHang)
        {
            await _context.KhachHangs.AddAsync(khachHang);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
