using MediatR;
using sofm.Application.DTOs.Category;

namespace sofm.Application.Features.Categories.Queries.GetChildrenCategory
{
    public class GetChildrenCategoriesQuery : IRequest<List<CategoryDto>>
    {
        public int ParentId { get; set; }
        public GetChildrenCategoriesQuery(int parentId)
        {
            ParentId = parentId;
        }
    }
}
