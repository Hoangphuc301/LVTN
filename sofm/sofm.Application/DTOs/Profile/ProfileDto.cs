using sofm.Application.DTOs.Address;

namespace sofm.Application.DTOs.Profile
{
    public class ProfileDto
    {
        public int MaKH { get; set; }
        public int MaTK { get; set; }
        public string TenKH { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string SDT { get; set; } = string.Empty;
        public bool GioiTinh { get; set; }
        public List<AddressDto> DiaChis { get; set; } = new();
    }
}
