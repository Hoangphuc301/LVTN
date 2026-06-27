using MediatR;

namespace sofm.Application.Features.Profile.Commands.UpdateProfile
{
    public class UpdateProfileCommand : IRequest<bool>
    {
        public int MaTK { get; set; }
        public string TenKH { get; set; } = string.Empty;
        public string SDT { get; set; } = string.Empty;
        public bool? GioiTinh { get; set; }
    }
}