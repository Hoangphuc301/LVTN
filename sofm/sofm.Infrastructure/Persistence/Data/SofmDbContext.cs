using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using sofm.Domain.Entities;

namespace sofm.Infrastructure.Persistence.Data;

public partial class SofmDbContext : DbContext
{
    public SofmDbContext()
    {
    }

    public SofmDbContext(DbContextOptions<SofmDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ChiTietDonHang> ChiTietDonHangs { get; set; }

    public virtual DbSet<ChiTietGioHang> ChiTietGioHangs { get; set; }

    public virtual DbSet<ChiTietSanPham> ChiTietSanPhams { get; set; }

    public virtual DbSet<DanhGia> DanhGia { get; set; }

    public virtual DbSet<DanhMuc> DanhMucs { get; set; }

    public virtual DbSet<DiaChi> DiaChis { get; set; }

    public virtual DbSet<DonHang> DonHangs { get; set; }

    public virtual DbSet<GioHang> GioHangs { get; set; }

    public virtual DbSet<HinhSanPham> HinhSanPhams { get; set; }

    public virtual DbSet<KhachHang> KhachHangs { get; set; }

    public virtual DbSet<LichSuDonHang> LichSuDonHangs { get; set; }

    public virtual DbSet<Mau> Maus { get; set; }

    public virtual DbSet<NhanVien> NhanViens { get; set; }

    public virtual DbSet<PhuongThucThanhToan> PhuongThucThanhToans { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SanPham> SanPhams { get; set; }

    public virtual DbSet<Size> Sizes { get; set; }

    public virtual DbSet<TaiKhoan> TaiKhoans { get; set; }

    public virtual DbSet<ThuongHieu> ThuongHieus { get; set; }

    public virtual DbSet<Voucher> Vouchers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-6OJC3FAO;Database=SofmDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ChiTietDonHang>(entity =>
        {
            entity.HasKey(e => new { e.MaDh, e.MaCtsp }).HasName("PK__ChiTiet___E6C17A8DC3694B8D");

            entity.ToTable("ChiTiet_DonHang");

            entity.Property(e => e.MaDh).HasColumnName("MaDH");
            entity.Property(e => e.MaCtsp).HasColumnName("MaCTSP");
            entity.Property(e => e.DonGia).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Sl).HasColumnName("SL");
            entity.Property(e => e.ThanhTien).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.MaCtspNavigation).WithMany(p => p.ChiTietDonHangs)
                .HasForeignKey(d => d.MaCtsp)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTiet_D__MaCTS__0F624AF8");

            entity.HasOne(d => d.MaDhNavigation).WithMany(p => p.ChiTietDonHangs)
                .HasForeignKey(d => d.MaDh)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTiet_Do__MaDH__0E6E26BF");
        });

        modelBuilder.Entity<ChiTietGioHang>(entity =>
        {
            entity.HasKey(e => new { e.MaGh, e.MaCtsp }).HasName("PK__ChiTiet___E6C15269081352E0");

            entity.ToTable("ChiTiet_GioHang");

            entity.Property(e => e.MaGh).HasColumnName("MaGH");
            entity.Property(e => e.MaCtsp).HasColumnName("MaCTSP");

            entity.HasOne(d => d.MaCtspNavigation).WithMany(p => p.ChiTietGioHangs)
                .HasForeignKey(d => d.MaCtsp)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTiet_G__MaCTS__7B5B524B");

            entity.HasOne(d => d.MaGhNavigation).WithMany(p => p.ChiTietGioHangs)
                .HasForeignKey(d => d.MaGh)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTiet_Gi__MaGH__7A672E12");
        });

        modelBuilder.Entity<ChiTietSanPham>(entity =>
        {
            entity.HasKey(e => e.MaCtsp).HasName("PK__ChiTiet___1E4FCECD725C0B99");

            entity.ToTable("ChiTiet_SanPham");

            entity.HasIndex(e => new { e.MaSp, e.MaMau, e.MaSize }, "UQ_SanPham_Mau_Size").IsUnique();

            entity.Property(e => e.MaCtsp).HasColumnName("MaCTSP");
            entity.Property(e => e.MaSp).HasColumnName("MaSP");
            entity.Property(e => e.Slton)
                .HasDefaultValue(0)
                .HasColumnName("SLTon");

            entity.HasOne(d => d.MaMauNavigation).WithMany(p => p.ChiTietSanPhams)
                .HasForeignKey(d => d.MaMau)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTiet_S__MaMau__6C190EBB");

            entity.HasOne(d => d.MaSizeNavigation).WithMany(p => p.ChiTietSanPhams)
                .HasForeignKey(d => d.MaSize)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTiet_S__MaSiz__6D0D32F4");

            entity.HasOne(d => d.MaSpNavigation).WithMany(p => p.ChiTietSanPhams)
                .HasForeignKey(d => d.MaSp)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTiet_Sa__MaSP__6B24EA82");
        });

        modelBuilder.Entity<DanhGia>(entity =>
        {
            entity.HasKey(e => e.MaDanhGia).HasName("PK__DanhGia__AA9515BF79A09F8E");

            entity.HasIndex(e => new { e.MaKh, e.MaSp }, "UQ_Khach_SanPham_DanhGia").IsUnique();

            entity.Property(e => e.MaKh).HasColumnName("MaKH");
            entity.Property(e => e.MaSp).HasColumnName("MaSP");
            entity.Property(e => e.NgayDanhGia)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NgayPhanHoi).HasColumnType("datetime");
            entity.Property(e => e.NoiDung).HasMaxLength(1000);
            entity.Property(e => e.PhanHoi).HasMaxLength(1000);

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.DanhGia)
                .HasForeignKey(d => d.MaKh)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DanhGia__MaKH__18EBB532");

            entity.HasOne(d => d.MaSpNavigation).WithMany(p => p.DanhGia)
                .HasForeignKey(d => d.MaSp)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DanhGia__MaSP__19DFD96B");
        });

        modelBuilder.Entity<DanhMuc>(entity =>
        {
            entity.HasKey(e => e.MaDm).HasName("PK__DanhMuc__2725866E018A41F8");

            entity.ToTable("DanhMuc");

            entity.Property(e => e.MaDm).HasColumnName("MaDM");
            entity.Property(e => e.MaDmCha).HasColumnName("MaDM_Cha");
            entity.Property(e => e.MoTa).HasMaxLength(255);
            entity.Property(e => e.TenDm)
                .HasMaxLength(100)
                .HasColumnName("TenDM");
            entity.Property(e => e.TrangThai).HasDefaultValue(true);

            entity.HasOne(d => d.MaDmChaNavigation).WithMany(p => p.InverseMaDmChaNavigation)
                .HasForeignKey(d => d.MaDmCha)
                .HasConstraintName("FK__DanhMuc__MaDM_Ch__3A81B327");
        });

        modelBuilder.Entity<DiaChi>(entity =>
        {
            entity.HasKey(e => e.MaDiaChi).HasName("PK__DiaChi__EB61213EF4C6D8F1");

            entity.ToTable("DiaChi");

            entity.Property(e => e.DiaChiChiTiet).HasMaxLength(255);
            entity.Property(e => e.LaDiaChiMacDinh).HasDefaultValue(false);
            entity.Property(e => e.MaKh).HasColumnName("MaKH");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.DiaChis)
                .HasForeignKey(d => d.MaKh)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DiaChi__MaKH__5DCAEF64");
        });

        modelBuilder.Entity<DonHang>(entity =>
        {
            entity.HasKey(e => e.MaDh).HasName("PK__DonHang__27258661AF63FB0C");

            entity.ToTable("DonHang");

            entity.Property(e => e.MaDh).HasColumnName("MaDH");
            entity.Property(e => e.DiaChiGiao).HasMaxLength(255);
            entity.Property(e => e.LyDoHuy).HasMaxLength(255);
            entity.Property(e => e.MaKh).HasColumnName("MaKH");
            entity.Property(e => e.MaPttt).HasColumnName("MaPTTT");
            entity.Property(e => e.NgayDat)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PhiShip).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Sdtgiao)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("SDTGiao");
            entity.Property(e => e.TongTien).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TongTienCuoi).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.TrangThai).HasMaxLength(50);

            entity.HasOne(d => d.MaKhNavigation).WithMany(p => p.DonHangs)
                .HasForeignKey(d => d.MaKh)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DonHang__MaKH__08B54D69");

            entity.HasOne(d => d.MaPtttNavigation).WithMany(p => p.DonHangs)
                .HasForeignKey(d => d.MaPttt)
                .HasConstraintName("FK__DonHang__MaPTTT__09A971A2");

            entity.HasOne(d => d.MaVoucherNavigation).WithMany(p => p.DonHangs)
                .HasForeignKey(d => d.MaVoucher)
                .HasConstraintName("FK__DonHang__MaVouch__0A9D95DB");
        });

        modelBuilder.Entity<GioHang>(entity =>
        {
            entity.HasKey(e => e.MaGh).HasName("PK__GioHang__2725AE8582A1842D");

            entity.ToTable("GioHang");

            entity.HasIndex(e => e.MaKh, "UQ__GioHang__2725CF1F08ADAB30").IsUnique();

            entity.Property(e => e.MaGh).HasColumnName("MaGH");
            entity.Property(e => e.MaKh).HasColumnName("MaKH");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.MaKhNavigation).WithOne(p => p.GioHang)
                .HasForeignKey<GioHang>(d => d.MaKh)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__GioHang__MaKH__76969D2E");
        });

        modelBuilder.Entity<HinhSanPham>(entity =>
        {
            entity.HasKey(e => e.MaHinh).HasName("PK__HinhSanP__13EE10847027106E");

            entity.ToTable("HinhSanPham");

            entity.Property(e => e.DaiDien).HasDefaultValue(false);
            entity.Property(e => e.DuongDan).HasMaxLength(500);
            entity.Property(e => e.MaSp).HasColumnName("MaSP");
            entity.Property(e => e.TenHinh).HasMaxLength(255);
            entity.Property(e => e.ThuTu).HasDefaultValue(1);

            entity.HasOne(d => d.MaSpNavigation).WithMany(p => p.HinhSanPhams)
                .HasForeignKey(d => d.MaSp)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HinhSanPha__MaSP__71D1E811");
        });

        modelBuilder.Entity<KhachHang>(entity =>
        {
            entity.HasKey(e => e.MaKh).HasName("PK__KhachHan__2725CF1E419ECD71");

            entity.ToTable("KhachHang");

            entity.HasIndex(e => e.MaTk, "UQ__KhachHan__27250071F8F74EC0").IsUnique();

            entity.Property(e => e.MaKh).HasColumnName("MaKH");
            entity.Property(e => e.GioiTinh).HasDefaultValue(true);
            entity.Property(e => e.MaTk).HasColumnName("MaTK");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Sdt)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("SDT");
            entity.Property(e => e.TenKh)
                .HasMaxLength(100)
                .HasColumnName("TenKH");

            entity.HasOne(d => d.MaTkNavigation).WithOne(p => p.KhachHang)
                .HasForeignKey<KhachHang>(d => d.MaTk)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__KhachHang__MaTK__59063A47");
        });

        modelBuilder.Entity<LichSuDonHang>(entity =>
        {
            entity.HasKey(e => e.MaLs).HasName("PK__LichSuDo__2725C772DB57A6C8");

            entity.ToTable("LichSuDonHang");

            entity.Property(e => e.MaLs).HasColumnName("MaLS");
            entity.Property(e => e.MaDh).HasColumnName("MaDH");
            entity.Property(e => e.MoTa).HasMaxLength(255);
            entity.Property(e => e.ThoiGian)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TrangThai).HasMaxLength(100);

            entity.HasOne(d => d.MaDhNavigation).WithMany(p => p.LichSuDonHangs)
                .HasForeignKey(d => d.MaDh)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LichSuDonH__MaDH__1332DBDC");
        });

        modelBuilder.Entity<Mau>(entity =>
        {
            entity.HasKey(e => e.MaMau).HasName("PK__Mau__3A5BBB7DD3599515");

            entity.ToTable("Mau");

            entity.Property(e => e.MaHex)
                .HasMaxLength(7)
                .IsUnicode(false);
            entity.Property(e => e.TenMau).HasMaxLength(50);
            entity.Property(e => e.TrangThai).HasDefaultValue(true);
        });

        modelBuilder.Entity<NhanVien>(entity =>
        {
            entity.HasKey(e => e.MaNv).HasName("PK__NhanVien__2725D70AF31367E7");

            entity.ToTable("NhanVien");

            entity.HasIndex(e => e.MaTk, "UQ__NhanVien__2725007184CA4076").IsUnique();

            entity.Property(e => e.MaNv).HasColumnName("MaNV");
            entity.Property(e => e.GioiTinh).HasDefaultValue(true);
            entity.Property(e => e.MaTk).HasColumnName("MaTK");
            entity.Property(e => e.Sdt)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("SDT");
            entity.Property(e => e.TenNv)
                .HasMaxLength(100)
                .HasColumnName("TenNV");

            entity.HasOne(d => d.MaTkNavigation).WithOne(p => p.NhanVien)
                .HasForeignKey<NhanVien>(d => d.MaTk)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NhanVien__MaTK__52593CB8");
        });

        modelBuilder.Entity<PhuongThucThanhToan>(entity =>
        {
            entity.HasKey(e => e.MaPttt).HasName("PK__PhuongTh__B30A28027D1C848A");

            entity.ToTable("PhuongThucThanhToan");

            entity.Property(e => e.MaPttt).HasColumnName("MaPTTT");
            entity.Property(e => e.TenPhuongThuc).HasMaxLength(100);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.MaRole).HasName("PK__Role__0639A0FD05CF83CD");

            entity.ToTable("Role");

            entity.Property(e => e.TenRole).HasMaxLength(50);
        });

        modelBuilder.Entity<SanPham>(entity =>
        {
            entity.HasKey(e => e.MaSp).HasName("PK__SanPham__2725081C48D4E3D5");

            entity.ToTable("SanPham");

            entity.Property(e => e.MaSp).HasColumnName("MaSP");
            entity.Property(e => e.Gia).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.GiaGiam).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MaDm).HasColumnName("MaDM");
            entity.Property(e => e.MaTh).HasColumnName("MaTH");
            entity.Property(e => e.TenSp)
                .HasMaxLength(255)
                .HasColumnName("TenSP");
            entity.Property(e => e.TrangThai).HasDefaultValue(true);

            entity.HasOne(d => d.MaDmNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaDm)
                .HasConstraintName("FK__SanPham__MaDM__6477ECF3");

            entity.HasOne(d => d.MaThNavigation).WithMany(p => p.SanPhams)
                .HasForeignKey(d => d.MaTh)
                .HasConstraintName("FK__SanPham__MaTH__656C112C");
        });

        modelBuilder.Entity<Size>(entity =>
        {
            entity.HasKey(e => e.MaSize).HasName("PK__Size__A787E7ED60C03996");

            entity.ToTable("Size");

            entity.Property(e => e.MaDm).HasColumnName("MaDM");
            entity.Property(e => e.MoTa).HasMaxLength(200);
            entity.Property(e => e.TenSize).HasMaxLength(20);
            entity.Property(e => e.TrangThai).HasDefaultValue(true);

            entity.HasOne(d => d.MaDmNavigation).WithMany(p => p.Sizes)
                .HasForeignKey(d => d.MaDm)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Size__MaDM__4316F928");
        });

        modelBuilder.Entity<TaiKhoan>(entity =>
        {
            entity.HasKey(e => e.MaTk).HasName("PK__TaiKhoan__27250070D055F522");

            entity.ToTable("TaiKhoan");

            entity.HasIndex(e => e.Email, "UQ__TaiKhoan__A9D105345FE2329B").IsUnique();

            entity.Property(e => e.MaTk).HasColumnName("MaTK");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.TenNguoiDung)
                .HasMaxLength(100);
            entity.Property(e => e.EmailVerified).HasDefaultValue(false);
            entity.Property(e => e.MatKhau).HasMaxLength(255);
            entity.Property(e => e.NgayCapNhat)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.OtpCode)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("OTP_Code");
            entity.Property(e => e.OtpExpired)
                .HasColumnType("datetime")
                .HasColumnName("OTP_Expired");
            entity.Property(e => e.TrangThai).HasDefaultValue(true);

            entity.HasOne(d => d.MaRoleNavigation).WithMany(p => p.TaiKhoans)
                .HasForeignKey(d => d.MaRole)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TaiKhoan__NgayCa__4CA06362");
        });

        modelBuilder.Entity<ThuongHieu>(entity =>
        {
            entity.HasKey(e => e.MaTh).HasName("PK__ThuongHi__272500755D1F686C");

            entity.ToTable("ThuongHieu");

            entity.Property(e => e.MaTh).HasColumnName("MaTH");
            entity.Property(e => e.Logo).HasMaxLength(255);
            entity.Property(e => e.MoTa).HasMaxLength(255);
            entity.Property(e => e.TenTh)
                .HasMaxLength(100)
                .HasColumnName("TenTH");
        });

        modelBuilder.Entity<Voucher>(entity =>
        {
            entity.HasKey(e => e.MaVoucher).HasName("PK__Voucher__0AAC5B1147CB7E77");

            entity.ToTable("Voucher");

            entity.HasIndex(e => e.MaGiamGia, "UQ__Voucher__EF9458E5CF1AB631").IsUnique();

            entity.Property(e => e.DaSuDung).HasDefaultValue(0);
            entity.Property(e => e.LoaiGiam)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("Tien");
            entity.Property(e => e.MaGiamGia)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NgayBd)
                .HasColumnType("datetime")
                .HasColumnName("NgayBD");
            entity.Property(e => e.NgayKt)
                .HasColumnType("datetime")
                .HasColumnName("NgayKT");
            entity.Property(e => e.TenVoucher).HasMaxLength(100);
            entity.Property(e => e.TrangThai).HasDefaultValue(true);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
