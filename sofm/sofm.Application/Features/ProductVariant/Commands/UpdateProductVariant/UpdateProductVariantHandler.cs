using MediatR;
using sofm.Application.DTOs.Product;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.ProductVariant.Commands.UpdateProductVariant
{
    public class UpdateProductVariantHandler : IRequestHandler<UpdateProductVariantCommand, ProductVariantDto>
    {
        private readonly IProductVariantRepository _repository;

        public UpdateProductVariantHandler(IProductVariantRepository repository)
        {
            _repository = repository;
        }

        public async Task<ProductVariantDto> Handle(UpdateProductVariantCommand request, CancellationToken cancellationToken)
        {
            var entity = await _repository.GetByIdAsync(request.MaCtsp);

            if (entity == null)
                throw new Exception("Không tìm thấy biến thể");

            var duplicate = await _repository.ExistsForUpdateAsync(
                request.MaCtsp,
                request.MaSp,
                request.MaMau,
                request.MaSize);

            if (duplicate)
                throw new Exception("Biến thể này đã tồn tại");

            entity.MaMau = request.MaMau;
            entity.MaSize = request.MaSize;
            entity.Slton = request.SoLuongTon;

            await _repository.UpdateAsync(request.MaCtsp, entity);

            var result = await _repository.GetWithDetailAsync(entity.MaCtsp);

            return new ProductVariantDto
            {
                MaCtsp = result!.MaCtsp,
                MaMau = result.MaMau,
                TenMau = result.MaMauNavigation.TenMau,
                MaSize = result.MaSize,
                TenSize = result.MaSizeNavigation.TenSize,
                SoLuongTon = result.Slton ?? 0
            };
        }
    }
}
