using sofm.Application.DTOs.Voucher;
using sofm.Application.Features.Vouchers.Commands.CreateVoucher;
using sofm.Application.Features.Vouchers.Commands.DeleteVoucher;
using sofm.Application.Features.Vouchers.Commands.UpdateVoucher;
using sofm.Domain.Entities;

namespace sofm.Application.Common.Mapping
{
    public class VoucherProfile : BaseMappingProfile<Voucher, CreateVoucherCommand, UpdateVoucherCommand, DeleteVoucherCommand, VoucherDto>
    {
        public VoucherProfile() : base()
        {

        }
    }
}
