using MediatR;
using sofm.Application.DTOs.Product;

namespace sofm.Application.Features.Products.Commands.UpdateProduct
{
    public record UpdateProductCommand : IRequest<ProductDetailDto>
    {
        public int MaSp { get; set; }
        public string TenSp { get; set; } = null!;
        public decimal Gia { get; set; }
        public decimal? GiaGiam { get; set; }
        public string? MoTa { get; set; }
        public bool? TrangThai { get; set; }
        public int? MaDm { get; set; }
        public int? MaTh { get; set; }
        public List<string> HinhAnhUrls { get; set; } = new();
        public List<UpdateProductVariantDto> Variants { get; set; } = new();
    }

    public class UpdateProductVariantDto
    {
        public int? MaCtsp { get; set; }
        public int maMau { get; set; }
        public int maSize { get; set; }
        public int soLuongTon { get; set; }
    }
}
