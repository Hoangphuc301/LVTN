using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class ChiTietDonHang
{
    public int MaDh { get; set; }

    public int MaCtsp { get; set; }

    public int Sl { get; set; }

    public decimal DonGia { get; set; }

    public decimal ThanhTien { get; set; }

    public virtual ChiTietSanPham MaCtspNavigation { get; set; } = null!;

    public virtual DonHang MaDhNavigation { get; set; } = null!;
}
