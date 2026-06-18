using MediatR;
using sofm.Application.DTOs.Size;

namespace sofm.Application.Features.Sizes.Commands.CreateSize
{
    public class CreateSizeCommand : IRequest<SizeDto>
    {
        public string TenSize { get; set; } = null!;
        public int? MaDM { get; set; }
        public string? MoTa { get; set; } = null!;
        public bool TrangThai { get; set; }
    }
}
