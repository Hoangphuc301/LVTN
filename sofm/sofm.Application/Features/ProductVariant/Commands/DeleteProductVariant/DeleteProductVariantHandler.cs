using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.ProductVariant.Commands.DeleteProductVariant
{
    public class DeleteProductVariantHandler : IRequestHandler<DeleteProductVariantCommand, bool>
    {
        private readonly IProductVariantRepository _repository;

        public DeleteProductVariantHandler(IProductVariantRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteProductVariantCommand request, CancellationToken cancellationToken)
        {
            var entity = await _repository.GetByIdAsync(request.MaCtsp);
            if (entity == null)throw new Exception("Không tìm thấy biến thể.");
            await _repository.DeleteAsync(request.MaCtsp);
            return true;
        }
    }
}
