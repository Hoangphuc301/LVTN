using MediatR;
using sofm.Application.DTOs.Voucher;

namespace sofm.Application.Features.Vouchers.Queries.GetAllVoucher
{
    public class GetAllVoucherQuery : IRequest<List<VoucherDto>>
    {
    }
}
