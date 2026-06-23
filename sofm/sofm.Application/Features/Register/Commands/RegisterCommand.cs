using MediatR;

namespace sofm.Application.Features.Register.Commands
{
    public class RegisterCommand : IRequest<bool>
    {
        public string TenKH { get; set; }
        public string Email { get; set; }
        public string MatKhau { get; set; }
        public string SDT { get; set; }
        public bool GioiTinh { get; set; }
    }
}
