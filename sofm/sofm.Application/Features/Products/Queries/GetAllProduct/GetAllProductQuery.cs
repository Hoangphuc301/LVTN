using MediatR;
using sofm.Application.DTOs.Product;

namespace sofm.Application.Features.Products.Queries.GetAllProduct
{
    public class GetAllProductQuery : IRequest<List<ProductDetailDto>>
    {

    }
}
