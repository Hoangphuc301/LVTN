using MediatR;
using sofm.Application.DTOs.Address;

namespace sofm.Application.Features.Address.Queries.GetAddresses
{
    public class GetAddressesQuery : IRequest<List<AddressDto>>
    {
        public int MaKH { get; set; }
    }
}
