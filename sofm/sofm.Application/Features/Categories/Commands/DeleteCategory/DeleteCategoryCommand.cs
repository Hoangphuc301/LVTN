using MediatR;

namespace sofm.Application.Features.Categories.Commands.DeleteCategory
{
    public class DeleteCategoryCommand : IRequest<int>
    {
        public int MaDM { get; set; }
    }
}
