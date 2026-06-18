using MediatR;
using sofm.Application.DTOs.Product;

namespace sofm.Application.Features.ProductVariant.Queries.GetProductVariantsByProduct
{
    public record GetProductVariantsByProductQuery(int MaSp) : IRequest<List<ProductVariantDto>>;
}
