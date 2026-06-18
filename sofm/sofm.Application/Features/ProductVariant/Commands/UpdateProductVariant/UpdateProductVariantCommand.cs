using MediatR;
using sofm.Application.DTOs.Product;

namespace sofm.Application.Features.ProductVariant.Commands.UpdateProductVariant
{
    public class UpdateProductVariantCommand : IRequest<ProductVariantDto>
    {
        public int MaCtsp { get; set; }
        public int MaSp { get; set; }
        public int MaMau { get; set; }
        public int MaSize { get; set; }
        public int SoLuongTon { get; set; }
    }
}
