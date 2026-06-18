using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class SanPham
{
    public int MaSp { get; set; }

    public int? MaDm { get; set; }

    public int? MaTh { get; set; }

    public string TenSp { get; set; } = null!;

    public decimal Gia { get; set; }

    public decimal? GiaGiam { get; set; }

    public string? MoTa { get; set; }

    public bool? TrangThai { get; set; }

    public virtual ICollection<ChiTietSanPham> ChiTietSanPhams { get; set; } = new List<ChiTietSanPham>();

    public virtual ICollection<DanhGia> DanhGia { get; set; } = new List<DanhGia>();

    public virtual ICollection<HinhSanPham> HinhSanPhams { get; set; } = new List<HinhSanPham>();

    public virtual DanhMuc? MaDmNavigation { get; set; }

    public virtual ThuongHieu? MaThNavigation { get; set; }
}
