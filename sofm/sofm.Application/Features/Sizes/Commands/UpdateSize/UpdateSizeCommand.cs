using MediatR;
using sofm.Application.DTOs.Size;

namespace sofm.Application.Features.Sizes.Commands.UpdateSize
{
    public class UpdateSizeCommand : IRequest<SizeDto>
    {
        public int MaSize { get; set; }
        public int MaDM { get; set; }
        public string TenSize { get; set; } = null!;
        public string MoTa { get; set; } = null!;
        public bool TrangThai { get; set; }
    }
}
