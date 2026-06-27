using MediatR;

namespace sofm.Application.Features.Address.Commands.UpdateAddress
{
    public class UpdateAddressCommand : IRequest<bool>
    {
        public int MaDiaChi { get; set; }
        public string DiaChiChiTiet { get; set; } = string.Empty;
    }
}
