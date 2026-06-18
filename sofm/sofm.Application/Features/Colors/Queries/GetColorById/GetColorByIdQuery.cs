using MediatR;
using sofm.Application.DTOs.Color;

namespace sofm.Application.Features.Colors.Queries.GetColorById
{
    public class GetColorByIdQuery : IRequest<ColorDto>
    {
        public int MaMau { get; set; }
    }
}
