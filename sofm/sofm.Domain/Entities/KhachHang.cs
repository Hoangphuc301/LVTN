using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class KhachHang
{
    public int MaKh { get; set; }

    public string TenKh { get; set; } = null!;

    public bool? GioiTinh { get; set; }

    public string Sdt { get; set; } = null!;

    public int MaTk { get; set; }

    public DateTime? NgayTao { get; set; }

    public virtual ICollection<DanhGia> DanhGia { get; set; } = new List<DanhGia>();

    public virtual ICollection<DiaChi> DiaChis { get; set; } = new List<DiaChi>();

    public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();

    public virtual GioHang? GioHang { get; set; }

    public virtual TaiKhoan MaTkNavigation { get; set; } = null!;
}
