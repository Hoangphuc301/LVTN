
using MediatR;
using sofm.Application.DTOs.Product;

namespace sofm.Application.Features.Products.Queries.GetProductById
{
    public class GetProductByIdQuery : IRequest<ProductDetailDto>
    {
        public int MaSp { get; set; }
    }
}
