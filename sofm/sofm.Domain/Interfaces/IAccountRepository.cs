using sofm.Domain.Entities;

namespace sofm.Domain.Interfaces
{
    public interface IAccountRepository
    {
        Task<bool> EmailExistsAsync(string email);
        Task AddAsync(TaiKhoan taiKhoan);
        Task<TaiKhoan?> GetByEmailAsync(string email);
        Task<TaiKhoan?> LoginAsync(string email);
        Task SaveChangesAsync();

        Task UpdateOtpAsync(string email, string otp, DateTime expired);
        Task<bool> VerifyOtpAsync(string email, string otp);
        Task UpdatePasswordAsync(string email,string newPassword);
    }
}
