using MediatR;
using sofm.Application.DTOs.Category;

namespace sofm.Application.Features.Categories.Queries.GetCategoryById
{
    public class GetCategoryByIdQuery : IRequest<CategoryDto>
    {
        public int MaDM { get; set; }
    }
}
