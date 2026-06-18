using MediatR;
using sofm.Application.DTOs.Color;

namespace sofm.Application.Features.Colors.Commands.UpdateColor
{
    public class UpdateColorCommand : IRequest<ColorDto>
    {
        public int MaMau { get; set; }
        public string TenMau { get; set; } = null!;
        public string? MaHex { get; set; }
        public bool TrangThai { get; set; }
    }
}
