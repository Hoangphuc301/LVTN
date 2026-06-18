using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class ChiTietSanPham
{
    public int MaCtsp { get; set; }

    public int MaSp { get; set; }

    public int MaMau { get; set; }

    public int MaSize { get; set; }

    public int? Slton { get; set; }

    public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<ChiTietDonHang>();

    public virtual ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; } = new List<ChiTietGioHang>();

    public virtual Mau MaMauNavigation { get; set; } = null!;

    public virtual Size MaSizeNavigation { get; set; } = null!;

    public virtual SanPham MaSpNavigation { get; set; } = null!;
}
