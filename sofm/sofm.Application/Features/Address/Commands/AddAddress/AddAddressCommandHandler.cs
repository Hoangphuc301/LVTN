using MediatR;
using sofm.Domain.Entities;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Address.Commands.AddAddress
{
    public class AddAddressCommandHandler : IRequestHandler<AddAddressCommand, bool>
    {
        private readonly IAddressRepository _addressRepository;

        public AddAddressCommandHandler(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<bool> Handle(AddAddressCommand request, CancellationToken cancellationToken)
        {
            var address = new DiaChi
                {
                    MaKh = request.MaKH,
                    DiaChiChiTiet = request.DiaChiChiTiet,
                    LaDiaChiMacDinh = false
                };

            await _addressRepository.AddAsync(address);
            await _addressRepository.SaveChangesAsync();
            return true;
        }
    }
}
