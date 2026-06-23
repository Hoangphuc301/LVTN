namespace sofm.Domain.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(
            int maTK,
            string email,
            string role,
            string tenNguoiDung
        );
    }
}
