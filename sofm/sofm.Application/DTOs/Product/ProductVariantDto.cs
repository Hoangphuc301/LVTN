namespace sofm.Application.DTOs.Product
{
    public class ProductVariantDto
    {
        public int MaCtsp { get; set; }
        public int MaMau { get; set; }
        public string TenMau { get; set; } = null!;
        public int MaSize { get; set; }
        public string TenSize { get; set; } = null!;
        public int SoLuongTon { get; set; }
    }
}
