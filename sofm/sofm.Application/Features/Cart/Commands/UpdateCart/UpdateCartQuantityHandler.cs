using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Cart.Commands.UpdateCart
{
    public class UpdateCartQuantityHandler : IRequestHandler<UpdateCartQuantityCommand>
    {
        private readonly ICartRepository _cartRepository;
        public UpdateCartQuantityHandler(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task Handle(UpdateCartQuantityCommand request, CancellationToken cancellationToken)
        {
            await _cartRepository.UpdateQuantityAsync(request.MaKh, request.MaCtsp, request.SoLuong);
        }
    }
}
