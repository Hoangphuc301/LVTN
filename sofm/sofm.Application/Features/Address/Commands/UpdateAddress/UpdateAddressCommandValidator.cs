using FluentValidation;

namespace sofm.Application.Features.Address.Commands.UpdateAddress
{
    public class UpdateAddressCommandValidator : AbstractValidator<UpdateAddressCommand>
    {
        public UpdateAddressCommandValidator()
        {
            RuleFor(x => x.DiaChiChiTiet)
                .NotEmpty();
        }
    }
}
