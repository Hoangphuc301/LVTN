namespace sofm.Application.DTOs.Product
{
    public class ProductDetailDto
    {
        public int MaSp { get; set; }
        public string TenSp { get; set; } = null!;
        public decimal Gia { get; set; }
        public decimal? GiaGiam { get; set; }
        public string? MoTa { get; set; }
        public bool? TrangThai { get; set; }
        public int? MaDm { get; set; }
        public string? TenDanhMuc { get; set; }
        public int? MaDmCha { get; set; }
        public string? TenDanhMucCha { get; set; }
        public int? MaTh { get; set; }
        public List<string> HinhAnh { get; set; } = new();
        public List<ProductVariantDto> Variants { get; set; } = new();
    }
}
