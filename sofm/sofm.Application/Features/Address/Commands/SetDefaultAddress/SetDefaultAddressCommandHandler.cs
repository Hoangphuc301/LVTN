using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Address.Commands.SetDefaultAddress
{
    public class SetDefaultAddressCommandHandler : IRequestHandler<SetDefaultAddressCommand, bool>    
    {
        private readonly IAddressRepository _addressRepository;

        public SetDefaultAddressCommandHandler(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<bool> Handle(SetDefaultAddressCommand request, CancellationToken cancellationToken)
        {
            await _addressRepository.SetDefaultAddressAsync(request.MaKH, request.MaDiaChi);
            await _addressRepository.SaveChangesAsync();
            return true;
        }
    }
}
