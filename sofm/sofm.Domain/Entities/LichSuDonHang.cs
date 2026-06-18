using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class LichSuDonHang
{
    public int MaLs { get; set; }

    public int MaDh { get; set; }

    public string TrangThai { get; set; } = null!;

    public string? MoTa { get; set; }

    public DateTime? ThoiGian { get; set; }

    public virtual DonHang MaDhNavigation { get; set; } = null!;
}
