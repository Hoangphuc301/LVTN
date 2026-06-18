using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class NhanVien
{
    public int MaNv { get; set; }

    public string TenNv { get; set; } = null!;

    public bool? GioiTinh { get; set; }

    public string Sdt { get; set; } = null!;

    public int MaTk { get; set; }

    public virtual TaiKhoan MaTkNavigation { get; set; } = null!;
}
