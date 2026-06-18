namespace sofm.Application.DTOs.Product
{
    public class ProductDto
    {
        public int MaSp { get; set; }
        public string TenSp { get; set; } = null!;
        public decimal Gia { get; set; }
        public decimal? GiaGiam { get; set; }
        public string? MoTa { get; set; }
        public bool? TrangThai { get; set; }
        public int? MaDm { get; set; }
        public int? MaTh { get; set; }
    }
}