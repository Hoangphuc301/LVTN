using Microsoft.EntityFrameworkCore;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;
using sofm.Infrastructure.Persistence.Data;
using System;

namespace sofm.Infrastructure.Persistence.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly SofmDbContext _context;

        public AccountRepository(SofmDbContext context)
        {
            _context = context;
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.TaiKhoans
                .AnyAsync(x => x.Email == email);
        }

        public async Task AddAsync(TaiKhoan taiKhoan)
        {
            await _context.TaiKhoans.AddAsync(taiKhoan);
        }

        public async Task<TaiKhoan?> GetByEmailAsync(string email)
        {
            return await _context.TaiKhoans.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<TaiKhoan?> LoginAsync(string email)
        {
            return await _context.TaiKhoans
                .Include(x => x.MaRoleNavigation)
                .FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task UpdateOtpAsync(string email,string otp, DateTime expired)
        {
            var account =await _context.TaiKhoans.FirstOrDefaultAsync(x => x.Email == email);
            if (account == null) throw new Exception("Không tìm thấy tài khoản");
            account.OtpCode = otp;
            account.OtpExpired = expired;
        }

        public async Task<bool> VerifyOtpAsync(string email, string otp)
        {
            var account = await _context.TaiKhoans.FirstOrDefaultAsync(x =>x.Email == email);

            if (account == null)
                return false;

            if (account.OtpCode != otp)
                return false;

            if (account.OtpExpired < DateTime.Now)
                return false;

            return true;
        }

        public async Task UpdatePasswordAsync(string email, string newPassword)
        {
            var account = await _context.TaiKhoans.FirstOrDefaultAsync(x =>x.Email == email);
            if (account == null) throw new Exception("Không tìm thấy tài khoản");

            account.MatKhau = newPassword;
            account.OtpCode = null;
            account.OtpExpired = null;
        }
    }
}
