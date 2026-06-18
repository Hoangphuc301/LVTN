using MediatR;
using sofm.Application.DTOs.Size;

namespace sofm.Application.Features.Sizes.Queries.GetAllSize
{
    public class GetAllSizeQuery : IRequest<List<SizeDto>>
    {
    }
}
