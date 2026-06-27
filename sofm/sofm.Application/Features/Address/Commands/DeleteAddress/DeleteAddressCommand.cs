using MediatR;

namespace sofm.Application.Features.Address.Commands.DeleteAddress
{
    public class DeleteAddressCommand : IRequest<bool>
    {
        public int MaDiaChi { get; set; }
    }
}
