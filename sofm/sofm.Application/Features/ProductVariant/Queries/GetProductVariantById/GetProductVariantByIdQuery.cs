using MediatR;
using sofm.Application.DTOs.Product;

namespace sofm.Application.Features.ProductVariant.Queries.GetProductVariantById
{
    public record GetProductVariantByIdQuery(int MaCtsp) : IRequest<ProductVariantDto>;
}
