using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Cart.Commands.RemoveCart
{
    public class RemoveCartItemHandler : IRequestHandler<RemoveCartItemCommand>
    {
        private readonly ICartRepository _cartRepository;
        public RemoveCartItemHandler(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task Handle(RemoveCartItemCommand request, CancellationToken cancellationToken)
        {
            await _cartRepository.RemoveItemAsync(request.MaKh, request.MaCtsp);
        }
    }
}
