namespace sofm.Application.DTOs.Category
{
    public class CategoryDto
    {
        public int MaDM { get; set; }
        public string TenDM { get; set; } = string.Empty;
        public string? MoTa { get; set; }
        public int? MaDM_Cha { get; set; }
        public bool TrangThai { get; set; }
    }
}
