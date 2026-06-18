using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class HinhSanPham
{
    public int MaHinh { get; set; }

    public int MaSp { get; set; }

    public string? TenHinh { get; set; }

    public string DuongDan { get; set; } = null!;

    public bool? DaiDien { get; set; }

    public int? ThuTu { get; set; }

    public virtual SanPham MaSpNavigation { get; set; } = null!;
}
