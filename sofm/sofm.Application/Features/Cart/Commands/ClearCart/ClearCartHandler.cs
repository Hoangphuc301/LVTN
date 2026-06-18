using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Cart.Commands.ClearCart
{
    public class ClearCartHandler : IRequestHandler<ClearCartCommand>
    {
        private readonly ICartRepository _cartRepository;
        public ClearCartHandler(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task Handle(ClearCartCommand request, CancellationToken cancellationToken)
        {
            await _cartRepository.ClearCartAsync(request.MaKh);
        }
    }
}
