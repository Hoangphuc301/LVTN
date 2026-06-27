using MediatR;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Address.Commands.DeleteAddress
{
    public class DeleteAddressCommandHandler : IRequestHandler<DeleteAddressCommand, bool>
    {
        private readonly IAddressRepository _addressRepository;

        public DeleteAddressCommandHandler(
            IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<bool>Handle(DeleteAddressCommand request,CancellationToken cancellationToken)
        {
            var address = await _addressRepository.GetByIdAsync(request.MaDiaChi);
            if (address == null) throw new Exception("Không tìm thấy địa chỉ");
            await _addressRepository.DeleteAsync(address);
            await _addressRepository.SaveChangesAsync();
            return true;
        }
    }
}
