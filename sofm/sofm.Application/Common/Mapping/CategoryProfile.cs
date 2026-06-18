using sofm.Application.DTOs.Category;
using sofm.Application.Features.Categories.Commands.CreateCategory;
using sofm.Application.Features.Categories.Commands.DeleteCategory;
using sofm.Application.Features.Categories.Commands.UpdateCategory;
using sofm.Domain.Entities;

namespace sofm.Application.Common.Mapping
{
    public class CategoryProfile : BaseMappingProfile<DanhMuc, CreateCategoryCommand, UpdateCategoryCommand, DeleteCategoryCommand, CategoryDto>
    {
        public CategoryProfile() : base()
        {
            CreateMap<CreateCategoryCommand, DanhMuc>()
                .ForMember(dest => dest.MaDmCha,
               opt => opt.MapFrom(src => src.MaDmCha));
        }
    }
}
