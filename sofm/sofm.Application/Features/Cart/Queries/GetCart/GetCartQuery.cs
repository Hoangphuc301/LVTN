using MediatR;
using sofm.Application.DTOs.Cart;

namespace sofm.Application.Features.Cart.Queries.GetCart
{
    public record GetCartQuery(int MaKh) : IRequest<CartDto>;
}
