namespace sofm.Application.DTOs.Color
{
    public class ColorDto
    {
        public int MaMau { get; set; }
        public string TenMau { get; set; } = null!;
        public string? MaHex { get; set; }
        public bool TrangThai { get; set; }
        public int SoLuongSuDung { get; set; }
    }
}