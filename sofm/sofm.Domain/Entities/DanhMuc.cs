using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class DanhMuc
{
    public int MaDm { get; set; }

    public string TenDm { get; set; } = null!;

    public string? MoTa { get; set; }

    public int? MaDmCha { get; set; }

    public bool? TrangThai { get; set; }

    public virtual ICollection<DanhMuc> InverseMaDmChaNavigation { get; set; } = new List<DanhMuc>();

    public virtual DanhMuc? MaDmChaNavigation { get; set; }

    public virtual ICollection<SanPham> SanPhams { get; set; } = new List<SanPham>();

    public virtual ICollection<Size> Sizes { get; set; } = new List<Size>();
}
