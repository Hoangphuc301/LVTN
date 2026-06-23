using MediatR;

namespace sofm.Application.Features.VerifyOtp.Commands
{
    public class VerifyOtpCommand : IRequest<bool>
    {
        public string Email { get; set; }
        public string OTP { get; set; }
    }
}
