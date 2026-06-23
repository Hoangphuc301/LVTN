using FluentValidation;

namespace sofm.Application.Features.Login.Commands
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email không được để trống")
                .EmailAddress()
                .WithMessage("Email không hợp lệ");

            RuleFor(x => x.MatKhau)
                .NotEmpty()
                .WithMessage("Mật khẩu không được để trống");
        }
    }
}
