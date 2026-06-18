using sofm.Application.DTOs.Product;
using sofm.Application.Features.ProductVariant.Commands.CreateProductVariant;
using sofm.Application.Features.ProductVariant.Commands.DeleteProductVariant;
using sofm.Application.Features.ProductVariant.Commands.UpdateProductVariant;
using sofm.Domain.Entities;

namespace sofm.Application.Common.Mapping
{
    public class ProductVariantProfile : BaseMappingProfile<ChiTietSanPham, CreateProductVariantCommand, UpdateProductVariantCommand, DeleteProductVariantCommand, ProductVariantDto>
    {
        public ProductVariantProfile() : base()
        { 

        }
    }
}
