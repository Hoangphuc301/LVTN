using FluentValidation;

namespace sofm.Application.Features.Register.Commands
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(x => x.TenKH)
                .NotEmpty();

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.MatKhau)
                .MinimumLength(6);
        }
    }
}
