using MediatR;

namespace sofm.Application.Features.Products.Commands.DeleteProduct
{
    public class DeleteProductCommand : IRequest<int>
    {
        public int MaSp { get; set; }
    }
}
