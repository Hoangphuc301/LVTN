using FluentValidation;

namespace sofm.Application.Features.Address.Commands.AddAddress
{
    public class AddAddressCommandValidator : AbstractValidator<AddAddressCommand>
    {
        public AddAddressCommandValidator()
        {
            RuleFor(x => x.DiaChiChiTiet)
                .NotEmpty()
                .WithMessage("Địa chỉ không được để trống");
        }
    }
}
