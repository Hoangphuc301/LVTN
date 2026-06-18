using MediatR;
using sofm.Application.DTOs.Product;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.ProductVariant.Queries.GetProductVariantById
{
    public class GetProductVariantByIdHandler : IRequestHandler<GetProductVariantByIdQuery, ProductVariantDto>
    {
        private readonly IProductVariantRepository _repository;

        public GetProductVariantByIdHandler(IProductVariantRepository repository)
        {
            _repository = repository;
        }

        public async Task<ProductVariantDto> Handle(GetProductVariantByIdQuery request, CancellationToken cancellationToken)
        {
            var entity = await _repository.GetWithDetailAsync(request.MaCtsp);

            if (entity == null)
                throw new Exception("Không tìm thấy biến thể.");

            return new ProductVariantDto
            {
                MaCtsp = entity.MaCtsp,

                MaMau = entity.MaMau,
                TenMau = entity.MaMauNavigation.TenMau,

                MaSize = entity.MaSize,
                TenSize = entity.MaSizeNavigation.TenSize,

                SoLuongTon = entity.Slton ?? 0
            };
        }
    }
}
