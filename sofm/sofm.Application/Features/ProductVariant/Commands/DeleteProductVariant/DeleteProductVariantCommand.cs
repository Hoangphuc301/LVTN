using MediatR;

namespace sofm.Application.Features.ProductVariant.Commands.DeleteProductVariant
{
    public record DeleteProductVariantCommand(int MaCtsp) : IRequest<bool>;      
}
