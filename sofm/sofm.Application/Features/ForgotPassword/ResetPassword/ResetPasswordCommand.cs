using MediatR;

namespace sofm.Application.Features.ForgotPassword.ResetPassword
{
    public class ResetPasswordCommand : IRequest<bool>
    {
        public string Email { get; set; }
        public string OTP { get; set; }
        public string NewPassword { get; set; }
    }
}
