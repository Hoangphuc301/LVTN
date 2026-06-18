using MediatR;
using sofm.Application.DTOs.Voucher;

namespace sofm.Application.Features.Vouchers.Commands.CreateVoucher
{
    public class CreateVoucherCommand : IRequest<VoucherDto>
    {
        public string TenVoucher { get; set; } = null!;
        public string MaGiamGia { get; set; } = null!;
        public decimal GiaTri { get; set; }
        public DateTime NgayBd { get; set; }
        public DateTime NgayKt { get; set; }
        public bool TrangThai { get; set; }
        public int? GioiHanSuDung { get; set; }
        public int? DaSuDung { get; set; }
    }
}
