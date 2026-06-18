namespace sofm.Application.DTOs.Size
{
    public class SizeDto
    {
        public int MaSize { get; set; }
        public int MaDM { get; set; }
        public string TenDM { get; set; } = null!;
        public string TenSize { get; set; } = null!;
        public string? MoTa { get; set; }
        public bool TrangThai { get; set; }
    }
}
