using MediatR;
using sofm.Application.DTOs.Category;

namespace sofm.Application.Features.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommand : IRequest<CategoryDto>
    {
        public int MaDM { get; set; }
        public string TenDM { get; set; } = null!;
        public string? MoTa { get; set; }
        public int? MaDM_Cha { get; set; }
    }
}
