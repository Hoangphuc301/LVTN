USE MASTER;
GO
IF EXISTS (SELECT * FROM sys.databases WHERE name='SofmDB')
BEGIN
    ALTER DATABASE SofmDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE SofmDB;
END
GO

CREATE DATABASE SofmDB;
GO
USE SofmDB;
GO

CREATE TABLE Role (MaRole INT IDENTITY(1,1) PRIMARY KEY, TenRole NVARCHAR(50) NOT NULL);

CREATE TABLE DanhMuc (
    MaDM INT IDENTITY(1,1) PRIMARY KEY,
    TenDM NVARCHAR(100) NOT NULL,
    MoTa NVARCHAR(255),
    MaDM_Cha INT NULL,
    TrangThai BIT DEFAULT 1,
    FOREIGN KEY (MaDM_Cha) REFERENCES DanhMuc(MaDM)
);
CREATE TABLE ThuongHieu (MaTH INT IDENTITY(1,1) PRIMARY KEY, TenTH NVARCHAR(100) NOT NULL, MoTa NVARCHAR(255), Logo NVARCHAR(255));

CREATE TABLE Mau (
	MaMau INT IDENTITY(1,1) PRIMARY KEY, 
	TenMau NVARCHAR(50) NOT NULL, 
	MaHex VARCHAR(7), 
	TrangThai BIT DEFAULT 1
);

CREATE TABLE Size (
    MaSize INT IDENTITY(1,1) PRIMARY KEY,
    MaDM INT NOT NULL,
    TenSize NVARCHAR(20) NOT NULL,
    MoTa NVARCHAR(200),
    TrangThai BIT DEFAULT 1,
    FOREIGN KEY (MaDM) REFERENCES DanhMuc(MaDM)
);

CREATE TABLE PhuongThucThanhToan (MaPTTT INT IDENTITY(1,1) PRIMARY KEY, TenPhuongThuc NVARCHAR(100) NOT NULL);

CREATE TABLE TaiKhoan (
    MaTK INT IDENTITY(1,1) PRIMARY KEY,
    Email VARCHAR(100) NOT NULL UNIQUE,
    MatKhau NVARCHAR(255) NOT NULL,
    TrangThai BIT DEFAULT 1,
    EmailVerified BIT DEFAULT 0,
    MaRole INT NOT NULL,
    OTP_Code VARCHAR(6) NULL,
    OTP_Expired DATETIME NULL,
    NgayTao DATETIME DEFAULT GETDATE(),
	NgayCapNhat DATETIME DEFAULT GETDATE()
    FOREIGN KEY (MaRole) REFERENCES Role(MaRole)
);

CREATE TABLE NhanVien (
    MaNV INT IDENTITY(1,1) PRIMARY KEY,
    TenNV NVARCHAR(100) NOT NULL,
    GioiTinh BIT DEFAULT 1,
    SDT VARCHAR(15) NOT NULL CHECK (LEN(SDT) BETWEEN 10 AND 15),
    MaTK INT NOT NULL UNIQUE,
    FOREIGN KEY (MaTK) REFERENCES TaiKhoan(MaTK)
);

CREATE TABLE KhachHang (
    MaKH INT IDENTITY(1,1) PRIMARY KEY,
    TenKH NVARCHAR(100) NOT NULL,
    GioiTinh BIT DEFAULT 1,
    SDT VARCHAR(15) NOT NULL CHECK (LEN(SDT) BETWEEN 10 AND 15),
    MaTK INT NOT NULL UNIQUE,
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaTK) REFERENCES TaiKhoan(MaTK)
);

CREATE TABLE DiaChi (
    MaDiaChi INT IDENTITY(1,1) PRIMARY KEY,
    MaKH INT NOT NULL,
    DiaChiChiTiet NVARCHAR(255) NOT NULL,
    LaDiaChiMacDinh BIT DEFAULT 0,
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
);

CREATE TABLE SanPham (
    MaSP INT IDENTITY(1,1) PRIMARY KEY,
    MaDM INT, MaTH INT,
    TenSP NVARCHAR(255) NOT NULL,
    Gia DECIMAL(18,2) NOT NULL CHECK (Gia >= 0),
    GiaGiam DECIMAL(18,2) CHECK (GiaGiam >= 0),
    MoTa NVARCHAR(MAX),
    TrangThai BIT DEFAULT 1,
    CONSTRAINT CK_Gia_HopLe CHECK (GiaGiam <= Gia),
    FOREIGN KEY (MaDM) REFERENCES DanhMuc(MaDM),
    FOREIGN KEY (MaTH) REFERENCES ThuongHieu(MaTH)
);

CREATE TABLE ChiTiet_SanPham (
    MaCTSP INT IDENTITY(1,1) PRIMARY KEY,
    MaSP INT NOT NULL, MaMau INT NOT NULL, MaSize INT NOT NULL, 
    SLTon INT DEFAULT 0 CHECK (SLTon >= 0),
    CONSTRAINT UQ_SanPham_Mau_Size UNIQUE(MaSP, MaMau, MaSize),
    FOREIGN KEY (MaSP) REFERENCES SanPham(MaSP),
    FOREIGN KEY (MaMau) REFERENCES Mau(MaMau),
    FOREIGN KEY (MaSize) REFERENCES Size(MaSize)
);

CREATE TABLE HinhSanPham (
    MaHinh INT IDENTITY(1,1) PRIMARY KEY,
    MaSP INT NOT NULL,
    TenHinh NVARCHAR(255),
    DuongDan NVARCHAR(500) NOT NULL,
    DaiDien BIT DEFAULT 0,
    ThuTu INT DEFAULT 1,
    FOREIGN KEY (MaSP) REFERENCES SanPham(MaSP)
);

-- 6. Giỏ hàng & Voucher
CREATE TABLE GioHang (
    MaGH INT IDENTITY(1,1) PRIMARY KEY,
    MaKH INT NOT NULL UNIQUE,
    NgayTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
);

CREATE TABLE ChiTiet_GioHang (
    MaGH INT NOT NULL, MaCTSP INT NOT NULL, 
    SoLuong INT NOT NULL CHECK (SoLuong > 0),
    PRIMARY KEY (MaGH, MaCTSP),
    FOREIGN KEY (MaGH) REFERENCES GioHang(MaGH),
    FOREIGN KEY (MaCTSP) REFERENCES ChiTiet_SanPham(MaCTSP)
);

CREATE TABLE Voucher (
    MaVoucher INT IDENTITY(1,1) PRIMARY KEY,
    TenVoucher NVARCHAR(100) NOT NULL, 
    MaGiamGia VARCHAR(50) NOT NULL UNIQUE, 
    LoaiGiam VARCHAR(20) DEFAULT 'Tien',
    NgayBD DATETIME NOT NULL, 
    NgayKT DATETIME NOT NULL, 
    TrangThai BIT DEFAULT 1,
    DaSuDung INT DEFAULT 0, 
    GioiHanSuDung INT,
    CONSTRAINT CK_Voucher_Ngay CHECK (NgayBD <= NgayKT)
);

CREATE TABLE DonHang (
    MaDH INT IDENTITY(1,1) PRIMARY KEY,
    MaKH INT NOT NULL, MaPTTT INT, 
    TongTien DECIMAL(18,2) NOT NULL CHECK (TongTien >= 0),
    NgayDat DATETIME DEFAULT GETDATE(),
    SDTGiao VARCHAR(15), TrangThai NVARCHAR(50), 
    DiaChiGiao NVARCHAR(255),
    PhiShip DECIMAL(18,2) CHECK (PhiShip >= 0), 
    TongTienCuoi DECIMAL(18,2) CHECK (TongTienCuoi >= 0), 
    MaVoucher INT, LyDoHuy NVARCHAR(255),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    FOREIGN KEY (MaPTTT) REFERENCES PhuongThucThanhToan(MaPTTT),
    FOREIGN KEY (MaVoucher) REFERENCES Voucher(MaVoucher)
);

CREATE TABLE ChiTiet_DonHang (
    MaDH INT NOT NULL, MaCTSP INT NOT NULL,
    SL INT NOT NULL CHECK (SL > 0), 
    DonGia DECIMAL(18,2) NOT NULL, 
    ThanhTien DECIMAL(18,2) NOT NULL,
    PRIMARY KEY (MaDH, MaCTSP),
    FOREIGN KEY (MaDH) REFERENCES DonHang(MaDH),
    FOREIGN KEY (MaCTSP) REFERENCES ChiTiet_SanPham(MaCTSP)
);

CREATE TABLE LichSuDonHang (
    MaLS INT IDENTITY(1,1) PRIMARY KEY,
    MaDH INT NOT NULL,
    TrangThai NVARCHAR(100) NOT NULL,
    MoTa NVARCHAR(255),
    ThoiGian DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaDH) REFERENCES DonHang(MaDH)
);

CREATE TABLE DanhGia (
    MaDanhGia INT IDENTITY(1,1) PRIMARY KEY,
    MaKH INT NOT NULL, MaSP INT NOT NULL, 
    NoiDung NVARCHAR(1000), 
    Sao INT CHECK (Sao >= 1 AND Sao <= 5),
    NgayDanhGia DATETIME DEFAULT GETDATE(), 
    PhanHoi NVARCHAR(1000), NgayPhanHoi DATETIME,
    CONSTRAINT UQ_Khach_SanPham_DanhGia UNIQUE(MaKH, MaSP),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    FOREIGN KEY (MaSP) REFERENCES SanPham(MaSP)
);
GO
-------------
/* ==========================
   1. ROLE
========================== */
INSERT INTO Role (TenRole)
VALUES
(N'Admin'),
(N'Nhân viên'),
(N'Khách hàng');


/* ==========================
   2. DANH MỤC
========================== */
-- Danh mục cha
INSERT INTO DanhMuc (TenDM, MoTa, MaDM_Cha, TrangThai)
VALUES
(N'Nam', N'Trang phục nam', NULL, 1),
(N'Nữ', N'Trang phục nữ', NULL, 1);

-- Danh mục con
INSERT INTO DanhMuc (TenDM, MoTa, MaDM_Cha, TrangThai)
VALUES
(N'Áo sơ mi', N'Áo sơ mi nam', 1, 1),
(N'Quần tây', N'Quần tây nam', 1, 1),
(N'Giày da', N'Giày nam', 1, 1),
(N'Đầm dạ hội', N'Đầm nữ cao cấp', 2, 1),
(N'Phụ kiện', N'Phụ kiện thời trang', NULL, 1);


/* ==========================
   3. THƯƠNG HIỆU
========================== */
INSERT INTO ThuongHieu (TenTH, MoTa, Logo)
VALUES
(N'Sofm Fashion', N'Thương hiệu nội địa', 'sofm.png'),
(N'Nike', N'Thương hiệu thể thao', 'nike.png'),
(N'Adidas', N'Thương hiệu thể thao', 'adidas.png'),
(N'Levi''s', N'Quần jean cao cấp', 'levis.png');


/* ==========================
   4. MÀU SẮC
========================== */
INSERT INTO Mau (TenMau, MaHex, TrangThai)
VALUES
(N'Đen Ánh Than', '#1A1A1A', 1),
(N'Trắng Tinh Khôi', '#F9F9F7', 1),
(N'Đỏ Rượu Vang', '#5C0A15', 1),
(N'Xanh Navy', '#1E3A5F', 1),
(N'Nâu Cafe', '#6F4E37', 1);


/* ==========================
   5. SIZE
========================== */
INSERT INTO Size (MaDM, TenSize, MoTa, TrangThai)
VALUES
-- Áo sơ mi (MaDM = 3)
(3,'XS',N'Ngực: 82-86cm • Dài: 66cm',1),
(3,'S', N'Ngực: 86-90cm • Dài: 68cm',1),
(3,'M', N'Ngực: 90-94cm • Dài: 70cm',1),
(3,'L', N'Ngực: 94-98cm • Dài: 72cm',1),
(3,'XL',N'Ngực: 98-102cm • Dài: 74cm',1),

-- Quần tây (MaDM = 4)
(4,'28',N'Eo: 72cm • Hông: 90cm',1),
(4,'29',N'Eo: 74cm • Hông: 92cm',1),
(4,'30',N'Eo: 76cm • Hông: 94cm',1),
(4,'31',N'Eo: 78cm • Hông: 96cm',1),
(4,'32',N'Eo: 80cm • Hông: 98cm',1),

-- Giày da (MaDM = 5)
(5,'39',N'Chiều dài: 24.5cm',1),
(5,'40',N'Chiều dài: 25cm',1),
(5,'41',N'Chiều dài: 26cm',1),
(5,'42',N'Chiều dài: 26.5cm',1),
(5,'43',N'Chiều dài: 27.5cm',1);


/* ==========================
   6. PHƯƠNG THỨC THANH TOÁN
========================== */
INSERT INTO PhuongThucThanhToan (TenPhuongThuc)
VALUES
(N'Thanh toán khi nhận hàng'),
(N'VNPay'),
(N'MoMo');


/* ==========================
   7. TÀI KHOẢN
========================== */
INSERT INTO TaiKhoan
(Email, MatKhau, MaRole)
VALUES
('admin@gmail.com','123456',1),
('nhanvien@gmail.com','123456',2),
('khachhang@gmail.com','123456',3);


/* ==========================
   8. NHÂN VIÊN
========================== */
INSERT INTO NhanVien
(TenNV, GioiTinh, SDT, MaTK)
VALUES
(N'Nguyễn Văn Admin',1,'0900000001',1),
(N'Trần Thị Nhân Viên',0,'0900000002',2);


/* ==========================
   9. KHÁCH HÀNG
========================== */
INSERT INTO KhachHang
(TenKH, GioiTinh, SDT, MaTK)
VALUES
(N'Lê Văn Khách',1,'0900000003',3);


/* ==========================
   10. ĐỊA CHỈ
========================== */
INSERT INTO DiaChi
(MaKH, DiaChiChiTiet, LaDiaChiMacDinh)
VALUES
(1,N'123 Nguyễn Văn Linh, Quận 7, TP.HCM',1),
(1,N'456 Lê Lợi, Quận 1, TP.HCM',0);


/* ==========================
   11. SẢN PHẨM
========================== */
INSERT INTO SanPham
(MaDM, MaTH, TenSP, Gia, GiaGiam, MoTa)
VALUES
(3,1,N'Áo sơ mi Oxford trắng',499000,399000,N'Áo sơ mi cao cấp'),
(4,1,N'Quần tây slimfit',699000,599000,N'Quần tây công sở'),
(5,1,N'Giày da Derby',1299000,1099000,N'Giày da nam cao cấp');


/* ==========================
   12. CHI TIẾT SẢN PHẨM
========================== */
INSERT INTO ChiTiet_SanPham
(MaSP, MaMau, MaSize, SLTon)
VALUES
(1,2,1,20),
(1,2,2,15),
(1,2,3,10),

(2,1,6,12),
(2,1,7,15),
(2,1,8,8),

(3,1,11,5),
(3,1,12,10),
(3,1,13,7);


/* ==========================
   13. HÌNH SẢN PHẨM
========================== */
INSERT INTO HinhSanPham
(MaSP, TenHinh, DuongDan, DaiDien, ThuTu)
VALUES
(1,N'Áo sơ mi 1','/uploads/aosomi1.jpg',1,1),
(1,N'Áo sơ mi 2','/uploads/aosomi2.jpg',0,2),

(2,N'Quần tây 1','/uploads/quantay1.jpg',1,1),
(2,N'Quần tây 2','/uploads/quantay2.jpg',0,2),

(3,N'Giày da 1','/uploads/giay1.jpg',1,1),
(3,N'Giày da 2','/uploads/giay2.jpg',0,2);


/* ==========================
   14. GIỎ HÀNG
========================== */
INSERT INTO GioHang (MaKH)
VALUES
(1);


/* ==========================
   15. CHI TIẾT GIỎ HÀNG
========================== */
INSERT INTO ChiTiet_GioHang
(MaGH, MaCTSP, SoLuong)
VALUES
(1,1,2),
(1,4,1);


/* ==========================
   16. VOUCHER
========================== */
INSERT INTO Voucher
(TenVoucher, MaGiamGia, LoaiGiam, NgayBD, NgayKT, GioiHanSuDung)
VALUES
(N'Giảm 50K','SALE50',50000,'2026-01-01','2026-12-31',100),
(N'Giảm 100K','SALE100',100000,'2026-01-01','2026-12-31',50);


/* ==========================
   17. ĐƠN HÀNG
========================== */
INSERT INTO DonHang
(MaKH, MaPTTT, TongTien, SDTGiao, TrangThai,
 DiaChiGiao, PhiShip, TongTienCuoi, MaVoucher)
VALUES
(1,1,1498000,'0900000003',
 N'Đã giao',
 N'123 Nguyễn Văn Linh, Quận 7, TP.HCM',
 30000,
 1478000,
 1);

/* ==========================
   18. CHI TIẾT ĐƠN HÀNG
========================== */
INSERT INTO ChiTiet_DonHang
(MaDH, MaCTSP, SL, DonGia, ThanhTien)
VALUES
(1,1,2,399000,798000),
(1,4,1,599000,599000);


/* ==========================
   19. LỊCH SỬ ĐƠN HÀNG
========================== */
INSERT INTO LichSuDonHang
(MaDH, TrangThai, MoTa)
VALUES
(1,N'Chờ xác nhận',N'Đơn hàng được tạo'),
(1,N'Đang chuẩn bị',N'Đang đóng gói'),
(1,N'Đang giao',N'Đơn vị vận chuyển đã nhận'),
(1,N'Đã giao',N'Khách hàng đã nhận hàng');


/* ==========================
   20. ĐÁNH GIÁ
========================== */
INSERT INTO DanhGia
(MaKH, MaSP, NoiDung, Sao, PhanHoi)
VALUES
(1,1,N'Áo đẹp, chất lượng tốt.',5,N'Cảm ơn bạn đã ủng hộ'),
(1,2,N'Quần mặc rất vừa.',4,NULL);

--------
--Proc
--CREATE PROCEDURE sp_DatHang
--    @MaKH INT,
--    @TongTien DECIMAL(18,2),
--    @DiaChiGiao NVARCHAR(255)
--AS
--BEGIN
--    BEGIN TRANSACTION; -- Bắt đầu giao dịch
--    BEGIN TRY
--        -- 1. Thêm vào bảng DonHang
--        INSERT INTO DonHang (MaKH, TongTien, TrangThai, DiaChiGiao)
--        VALUES (@MaKH, @TongTien, N'Chờ xác nhận', @DiaChiGiao);
        
--        DECLARE @NewMaDH INT = SCOPE_IDENTITY(); -- Lấy ID đơn vừa tạo

--        -- 2. Thêm vào lịch sử đơn hàng
--        INSERT INTO LichSuDonHang (MaDH, TrangThai, MoTa)
--        VALUES (@NewMaDH, N'Chờ xác nhận', N'Khách hàng đã đặt đơn thành công');

--        COMMIT TRANSACTION; -- Lưu lại tất cả nếu thành công
--    END TRY
--    BEGIN CATCH
--        ROLLBACK TRANSACTION; -- Hủy tất cả nếu có lỗi
--        THROW;
--    END CATCH
--END
--GO