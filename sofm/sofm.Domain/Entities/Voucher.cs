using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class Voucher
{
    public int MaVoucher { get; set; }

    public string TenVoucher { get; set; } = null!;

    public string MaGiamGia { get; set; } = null!;

    public string? LoaiGiam { get; set; }

    public DateTime NgayBd { get; set; }

    public DateTime NgayKt { get; set; }

    public bool? TrangThai { get; set; }

    public int? DaSuDung { get; set; }

    public int? GioiHanSuDung { get; set; }

    public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();
}
