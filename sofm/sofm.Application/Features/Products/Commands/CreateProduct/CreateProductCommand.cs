using MediatR;
using sofm.Application.DTOs.Product;

namespace sofm.Application.Features.Products.Commands.Create
{
    public record CreateProductCommand : IRequest<ProductDetailDto>
    {
        public string TenSp { get; set; } = null!;
        public decimal Gia { get; set; }
        public decimal? GiaGiam { get; set; }
        public string? MoTa { get; set; }
        public int? MaDm { get; set; }
        public int? MaTh { get; set; }
        public List<string> HinhAnhUrls { get; set; } = new();
        public List<CreateProductVariantDto> Variants { get; set; } = new();
    }

    public class CreateProductVariantDto
    {
        public int MaMau { get; set; }
        public int MaSize { get; set; }
        public int SoLuongTon { get; set; }
    }
}