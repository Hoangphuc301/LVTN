using FluentValidation;

namespace sofm.Application.Features.ForgotPassword.VerifyOtp
{
    public class VerifyForgotOtpValidator : AbstractValidator<VerifyForgotOtpCommand>
    {
        public VerifyForgotOtpValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty();

            RuleFor(x => x.OTP)
                .NotEmpty()
                .Length(6);
        }
    }
}
