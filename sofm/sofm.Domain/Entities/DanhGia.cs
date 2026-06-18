using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class DanhGia
{
    public int MaDanhGia { get; set; }

    public int MaKh { get; set; }

    public int MaSp { get; set; }

    public string? NoiDung { get; set; }

    public int? Sao { get; set; }

    public DateTime? NgayDanhGia { get; set; }

    public string? PhanHoi { get; set; }

    public DateTime? NgayPhanHoi { get; set; }

    public virtual KhachHang MaKhNavigation { get; set; } = null!;

    public virtual SanPham MaSpNavigation { get; set; } = null!;
}
