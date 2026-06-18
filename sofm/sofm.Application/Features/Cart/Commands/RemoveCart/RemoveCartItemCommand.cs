using MediatR;

namespace sofm.Application.Features.Cart.Commands.RemoveCart
{
    public record RemoveCartItemCommand(
        int MaKh,
        int MaCtsp
    ) : IRequest;
}
