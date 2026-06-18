using MediatR;
using sofm.Application.DTOs.Size;

namespace sofm.Application.Features.Sizes.Queries.GetSizeById
{
    public class GetSizeByIdQuery :IRequest<SizeDto>
    {
        public int MaSize { get; set; }
    }
}
