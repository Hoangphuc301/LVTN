using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class DiaChi
{
    public int MaDiaChi { get; set; }

    public int MaKh { get; set; }

    public string DiaChiChiTiet { get; set; } = null!;

    public bool? LaDiaChiMacDinh { get; set; }

    public DateTime? NgayTao { get; set; }

    public virtual KhachHang MaKhNavigation { get; set; } = null!;
}
