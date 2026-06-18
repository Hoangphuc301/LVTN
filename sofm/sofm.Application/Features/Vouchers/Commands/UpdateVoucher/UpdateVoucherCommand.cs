using MediatR;
using sofm.Application.DTOs.Voucher;

namespace sofm.Application.Features.Vouchers.Commands.UpdateVoucher
{
    public class UpdateVoucherCommand : IRequest<VoucherDto>
    {
        public int MaVoucher { get; set; }
        public string TenVoucher { get; set; } = string.Empty;
        public string MaGiamGia { get; set; } = string.Empty;
        public decimal GiaTri { get; set; }
        public DateTime NgayBd { get; set; }
        public DateTime NgayKt { get; set; }
        public bool TrangThai { get; set; }
        public int DaSuDung { get; set; }
        public int? GioiHanSuDung { get; set; }
    }
}
