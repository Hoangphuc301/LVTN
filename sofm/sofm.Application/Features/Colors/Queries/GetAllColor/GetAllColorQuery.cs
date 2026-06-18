using MediatR;
using sofm.Application.DTOs.Color;

namespace sofm.Application.Features.Colors.Queries.GetAllColor
{
    public class GetAllColorQuery : IRequest<List<ColorDto>>
    {
    }
}
