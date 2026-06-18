using MediatR;
using sofm.Application.DTOs.Product;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.ProductVariant.Commands.CreateProductVariant
{
    public class CreateProductVariantHandler: IRequestHandler<CreateProductVariantCommand,ProductVariantDto>
    {
        private readonly IProductVariantRepository _repository;

        public CreateProductVariantHandler(IProductVariantRepository repository)
        {
            _repository = repository;
        }

        public async Task<ProductVariantDto> Handle(CreateProductVariantCommand request, CancellationToken cancellationToken)
        {
            var existed = await _repository.ExistsAsync(
                request.MaSp,
                request.MaMau,
                request.MaSize);

            if (existed)
                throw new Exception("Biến thể này đã tồn tại");

            var entity = new ChiTietSanPham
            {
                MaSp = request.MaSp,
                MaMau = request.MaMau,
                MaSize = request.MaSize,
                Slton = request.SoLuongTon
            };

            var created = await _repository.CreateAsync(entity);

            var result = await _repository.GetWithDetailAsync(created.MaCtsp);

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
