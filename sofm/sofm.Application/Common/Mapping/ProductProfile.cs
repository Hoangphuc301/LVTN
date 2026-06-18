using sofm.Application.Common.Mapping;
using sofm.Application.DTOs.Product;
using sofm.Application.Features.Products.Commands.Create;
using sofm.Application.Features.Products.Commands.DeleteProduct;
using sofm.Application.Features.Products.Commands.UpdateProduct;
using sofm.Domain.Entities;

public class ProductProfile : BaseMappingProfile<SanPham, CreateProductCommand, UpdateProductCommand, DeleteProductCommand, ProductDto>
{
    public ProductProfile() : base()
    {

    }
}