using MediatR;

namespace sofm.Application.Features.Cart.Commands.UpdateCart
{
    public record UpdateCartQuantityCommand(
        int MaKh,
        int MaCtsp,
        int SoLuong
    ) : IRequest;
}
