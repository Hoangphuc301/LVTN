using MediatR;
using sofm.Application.DTOs.Login;

namespace sofm.Application.Features.Login.Commands
{
    public class LoginCommand : IRequest<LoginDto>
    {
        public string Email { get; set; }
        public string MatKhau { get; set; }
    }
}
