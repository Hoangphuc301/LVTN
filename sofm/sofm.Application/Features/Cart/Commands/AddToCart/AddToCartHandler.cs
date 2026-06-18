using MediatR;
using sofm.Application.DTOs.Cart;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Cart.Commands.AddToCart
{
    public class AddToCartHandler : IRequestHandler<AddToCartCommand>
    {
        private readonly ICartRepository _cartRepository;
        public AddToCartHandler(ICartRepository cartRepository) 
        {
            _cartRepository = cartRepository;
        }

        public async Task Handle(AddToCartCommand request, CancellationToken cancellationToken)
        {
            await _cartRepository.AddToCartAsync(request.MaKh, request.MaCtsp, request.SoLuong);
        }
    }
}
