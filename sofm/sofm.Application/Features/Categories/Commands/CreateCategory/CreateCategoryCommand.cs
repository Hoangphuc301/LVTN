using MediatR;
using sofm.Application.DTOs.Category;

namespace sofm.Application.Features.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommand : IRequest<CategoryDto>
    {
        public string TenDM { get; set; } = null!;
        public string? MoTa { get; set; }
        public int? MaDmCha { get; set; }
        public bool TrangThai { get; set; }
    }
}
