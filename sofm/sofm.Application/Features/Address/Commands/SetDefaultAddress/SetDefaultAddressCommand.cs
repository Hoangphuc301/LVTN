using MediatR;

namespace sofm.Application.Features.Address.Commands.SetDefaultAddress
{
    public class SetDefaultAddressCommand : IRequest<bool>
    {
        public int MaKH { get; set; }
        public int MaDiaChi { get; set; }
    }
}
