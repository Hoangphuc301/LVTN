using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class PhuongThucThanhToan
{
    public int MaPttt { get; set; }

    public string TenPhuongThuc { get; set; } = null!;

    public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();
}
