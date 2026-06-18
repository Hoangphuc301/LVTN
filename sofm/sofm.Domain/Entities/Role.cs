using System;
using System.Collections.Generic;

namespace sofm.Domain.Entities;

public partial class Role
{
    public int MaRole { get; set; }

    public string TenRole { get; set; } = null!;

    public virtual ICollection<TaiKhoan> TaiKhoans { get; set; } = new List<TaiKhoan>();
}
