using MediatR;
using sofm.Application.DTOs.Color;

namespace sofm.Application.Features.Colors.Commands.CreateColor
{
    public class CreateColorCommand : IRequest<ColorDto>
    {
        public string TenMau { get; set; } = null!;
        public string? MaHex { get; set; }
        public bool TrangThai { get; set; }
    }
}
