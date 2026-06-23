using MediatR;

namespace sofm.Application.Features.ForgotPassword.VerifyOtp
{
    public class VerifyForgotOtpCommand : IRequest<bool>
    {
        public string Email { get; set; }
        public string OTP { get; set; }
    }
}
