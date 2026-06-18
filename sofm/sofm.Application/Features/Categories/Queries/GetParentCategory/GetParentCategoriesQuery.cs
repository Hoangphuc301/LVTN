using MediatR;
using sofm.Application.DTOs.Category;

namespace sofm.Application.Features.Categories.Queries.GetParentCategory
{
    public class GetParentCategoriesQuery : IRequest<List<CategoryDto>>
    {

    }
}
