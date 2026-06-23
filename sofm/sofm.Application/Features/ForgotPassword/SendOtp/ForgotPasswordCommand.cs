using MediatR;

namespace sofm.Application.Features.ForgotPassword.SendOtp
{
    public class ForgotPasswordCommand : IRequest<bool>
    {
        public string Email { get; set; }
    }
}
