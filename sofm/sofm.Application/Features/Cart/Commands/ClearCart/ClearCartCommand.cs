using MediatR;

namespace sofm.Application.Features.Cart.Commands.ClearCart
{
    public record ClearCartCommand(
         int MaKh
     ) : IRequest;
}
