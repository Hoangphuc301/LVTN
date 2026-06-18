using MediatR;

namespace sofm.Application.Features.Cart.Commands.AddToCart
{
    public record AddToCartCommand(
        int MaKh,
        int MaCtsp,
        int SoLuong
    ) : IRequest;
}
