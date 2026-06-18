using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class Mau
{
    public int MaMau { get; set; }

    public string TenMau { get; set; } = null!;

    public string? MaHex { get; set; }

    public bool? TrangThai { get; set; }

    public virtual ICollection<ChiTietSanPham> ChiTietSanPhams { get; set; } = new List<ChiTietSanPham>();
}
