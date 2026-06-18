using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class ChiTietGioHang
{
    public int MaGh { get; set; }

    public int MaCtsp { get; set; }

    public int SoLuong { get; set; }

    public virtual ChiTietSanPham MaCtspNavigation { get; set; } = null!;

    public virtual GioHang MaGhNavigation { get; set; } = null!;
}
