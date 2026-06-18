using MediatR;
using sofm.Application.DTOs.Category;

namespace sofm.Application.Features.Categories.Queries.GetAllCategory
{
    public class GetAllCategoryQuery : IRequest<List<CategoryDto>>
    {

    }
}
