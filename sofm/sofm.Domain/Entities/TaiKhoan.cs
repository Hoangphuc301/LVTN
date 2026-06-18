using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class TaiKhoan
{
    public int MaTk { get; set; }

    public string Email { get; set; } = null!;

    public string MatKhau { get; set; } = null!;

    public bool? TrangThai { get; set; }

    public bool? EmailVerified { get; set; }

    public int MaRole { get; set; }

    public string? OtpCode { get; set; }

    public DateTime? OtpExpired { get; set; }

    public DateTime? NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }

    public virtual KhachHang? KhachHang { get; set; }

    public virtual Role MaRoleNavigation { get; set; } = null!;

    public virtual NhanVien? NhanVien { get; set; }
}
