using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class Size
{
    public int MaSize { get; set; }

    public int? MaDm { get; set; }

    public string TenSize { get; set; } = null!;

    public string? MoTa { get; set; }

    public bool? TrangThai { get; set; }

    public virtual ICollection<ChiTietSanPham> ChiTietSanPhams { get; set; } = new List<ChiTietSanPham>();

    public virtual DanhMuc MaDmNavigation { get; set; } = null!;
}
