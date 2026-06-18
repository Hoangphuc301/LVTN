using MediatR;

namespace sofm.Application.Features.Colors.Commands.DeleteColor
{
    public class DeleteColorCommand : IRequest<int>
    {
        public int MaMau { get; set; }
    }
}
