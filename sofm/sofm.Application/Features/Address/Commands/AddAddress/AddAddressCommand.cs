using MediatR;

namespace sofm.Application.Features.Address.Commands.AddAddress
{
    public class AddAddressCommand : IRequest<bool>
    {
        public int MaKH { get; set; }
        public string DiaChiChiTiet{ get; set; } = string.Empty;
    }
}
