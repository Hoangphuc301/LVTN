using MediatR;
using sofm.Application.DTOs.Product;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.ProductVariant.Queries.GetProductVariantsByProduct
{
    public class GetProductVariantsByProductHandler : IRequestHandler<GetProductVariantsByProductQuery, List<ProductVariantDto>>
    {
        private readonly IProductVariantRepository _repository;

        public GetProductVariantsByProductHandler(IProductVariantRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ProductVariantDto>> Handle(GetProductVariantsByProductQuery request, CancellationToken cancellationToken)
        {
            var entities =
                 await _repository.GetByProductIdAsync(
                     request.MaSp);

            return entities.Select(x =>
                new ProductVariantDto
                {
                    MaCtsp = x.MaCtsp,

                    MaMau = x.MaMau,
                    TenMau =
                        x.MaMauNavigation.TenMau,

                    MaSize = x.MaSize,
                    TenSize =
                        x.MaSizeNavigation.TenSize,

                    SoLuongTon =
                        x.Slton ?? 0
                })
                .ToList();
        }
    }
}
