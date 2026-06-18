using MediatR;
using sofm.Application.DTOs.Voucher;

namespace sofm.Application.Features.Vouchers.Queries.GetVoucherById
{
    public class GetVoucherByIdQuery : IRequest<VoucherDto>
    {
        public int MaVoucher { get; set; }
    }
}
