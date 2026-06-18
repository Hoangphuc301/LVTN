using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class DonHang
{
    public int MaDh { get; set; }

    public int MaKh { get; set; }

    public int? MaPttt { get; set; }

    public decimal TongTien { get; set; }

    public DateTime? NgayDat { get; set; }

    public string? Sdtgiao { get; set; }

    public string? TrangThai { get; set; }

    public string? DiaChiGiao { get; set; }

    public decimal? PhiShip { get; set; }

    public decimal? TongTienCuoi { get; set; }

    public int? MaVoucher { get; set; }

    public string? LyDoHuy { get; set; }

    public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<ChiTietDonHang>();

    public virtual ICollection<LichSuDonHang> LichSuDonHangs { get; set; } = new List<LichSuDonHang>();

    public virtual KhachHang MaKhNavigation { get; set; } = null!;

    public virtual PhuongThucThanhToan? MaPtttNavigation { get; set; }

    public virtual Voucher? MaVoucherNavigation { get; set; }
}
