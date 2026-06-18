using MediatR;

namespace sofm.Application.Features.Sizes.Commands.DeleteSize
{
    public class DeleteSizeCommand : IRequest<int>
    {
        public int MaSize { get; set; }
    }
}
