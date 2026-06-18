using MediatR;
using sofm.Application.DTOs.Product;

namespace sofm.Application.Features.ProductVariant.Commands.CreateProductVariant
{
    public class CreateProductVariantCommand : IRequest<ProductVariantDto>
    {
        public int MaSp { get; set; }
        public int MaMau { get; set; }
        public int MaSize { get; set; }
        public int SoLuongTon { get; set; }
    }
}
