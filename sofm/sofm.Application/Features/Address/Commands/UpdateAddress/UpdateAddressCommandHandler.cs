using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Address.Commands.UpdateAddress
{
    public class UpdateAddressCommandHandler : IRequestHandler<UpdateAddressCommand, bool>
    {
        private readonly IAddressRepository _addressRepository;

        public UpdateAddressCommandHandler(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<bool> Handle(UpdateAddressCommand request, CancellationToken cancellationToken)
        {
            var address = await _addressRepository.GetByIdAsync(request.MaDiaChi);
            if (address == null) throw new Exception("Không tìm thấy địa chỉ");
            address.DiaChiChiTiet = request.DiaChiChiTiet;
            await _addressRepository.SaveChangesAsync();
            return true;
        }
    }
}
