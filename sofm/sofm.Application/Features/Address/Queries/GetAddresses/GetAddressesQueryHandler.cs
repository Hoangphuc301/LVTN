using AutoMapper;
using MediatR;
using sofm.Application.DTOs.Address;
using sofm.Domain.Interfaces;

namespace sofm.Application.Features.Address.Queries.GetAddresses
{
    public class GetAddressesQueryHandler : IRequestHandler<GetAddressesQuery, List<AddressDto>>
    {
        private readonly IAddressRepository _addressRepository;
        private readonly IMapper _mapper;

        public GetAddressesQueryHandler(IAddressRepository addressRepository, IMapper mapper)
        {
            _addressRepository = addressRepository;
            _mapper = mapper;
        }

        public async Task<List<AddressDto>> Handle(GetAddressesQuery request, CancellationToken cancellationToken)
        {
            var addresses = await _addressRepository.GetByCustomerIdAsync(request.MaKH);
            return _mapper.Map<List<AddressDto>>(addresses);
        }
    }
}
