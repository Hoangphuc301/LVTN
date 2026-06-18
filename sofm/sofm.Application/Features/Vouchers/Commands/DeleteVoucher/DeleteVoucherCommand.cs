using MediatR;

namespace sofm.Application.Features.Vouchers.Commands.DeleteVoucher
{
    public class DeleteVoucherCommand : IRequest<int>
    {
        public int MaVoucher { get; set; }
    }
}
